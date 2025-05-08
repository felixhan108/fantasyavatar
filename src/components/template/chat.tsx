'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';

export default function Chat() {
  const isChatOpen = useUIStore((state) => state.isChatOpen);
  const closeChat = useUIStore((state) => state.closeChat);

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-80 bg-zinc-900 shadow-xl z-50 p-4"
        >
          <button onClick={closeChat} className="mb-4 text-right w-full">
            ❌ 닫기
          </button>
          <div>
            <h2 className="text-lg font-bold mb-2">💬 Chat</h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
