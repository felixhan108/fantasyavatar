'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';

export default function Inventory() {
  const isInventoryOpen = useUIStore((state) => state.isInventoryOpen);
  const closeInventory = useUIStore((state) => state.closeInventory);

  return (
    <AnimatePresence>
      {isInventoryOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-80 bg-zinc-900 shadow-xl z-50 p-4"
        >
          <button onClick={closeInventory} className="mb-4 text-right w-full">
            ❌ 닫기
          </button>
          <div>
            {/* 인벤토리 내용 */}
            <h2 className="text-lg font-bold mb-2">🎒 인벤토리</h2>
            <ul>
              <li>검 x1</li>
              <li>포션 x3</li>
              <li>방패 x1</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
