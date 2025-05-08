import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStoreType = {
  userId: string | null;
  setUserId: (id: string) => void;
  userName: string | null;
  setUserName: (name: string) => void;
  storyData: string;
  setStoryData: (story: string) => void;
  roleData: string;
  setRoleData: (role: string) => void;
  isUserStoryLoading: boolean;
  setIsUserStoryLoading: (is: boolean) => void;
};

export const useUserStore = create(
  devtools<UserStoreType>((set) => ({
    userId: null,
    setUserId: (id: string) => set({ userId: id }),
    userName: null,
    setUserName: (name: string) => set({ userName: name }),
    storyData: '',
    setStoryData: (story: string) => set({ storyData: story }),
    roleData: '',
    setRoleData: (role: string) => set({ roleData: role }),
    isUserStoryLoading: false,
    setIsUserStoryLoading: (is: boolean) => set({ isUserStoryLoading: is }),
  }))
);
