import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  isInventoryOpen: boolean;
  toggleInventory: () => void;
  closeInventory: () => void;
  isChatOpen: boolean;
  closeChat: () => void;
  toggleChat: () => void;
}

export const useUIStore = create(
  devtools<UIState>((set) => ({
    isInventoryOpen: false,
    toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),
    closeInventory: () => set({ isInventoryOpen: false }),
    isChatOpen: false,
    closeChat: () => set({ isChatOpen: false }),
    toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  }))
);
