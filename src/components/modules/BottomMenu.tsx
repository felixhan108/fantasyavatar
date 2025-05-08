'use client';

import BottomMenuItem from './BottomMenuItem';
import { useUIStore } from '@/store/uiStore';

export default function BottomMenu() {
  const toggleInventory = useUIStore((state) => state.toggleInventory);
  const toggleChat = useUIStore((state) => state.toggleChat);

  return (
    <>
      <ul className="w-full flex">
        <BottomMenuItem onClick={toggleChat}>💬</BottomMenuItem>
        <BottomMenuItem>🎖️</BottomMenuItem>
        <BottomMenuItem onClick={toggleInventory}>🎒</BottomMenuItem>
      </ul>
    </>
  );
}
