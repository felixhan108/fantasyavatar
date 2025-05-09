import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Weapons } from '@/assets/Weapons';

type StatusType = {
  level: number;
  hp: number;
  mp: number;
  maxHp: number;
  maxMp: number;
  attack: number;
  defense: number;
  exp: number;
  gold: number;
  weapon: (typeof Weapons)[keyof typeof Weapons] | null;
};

type UserStoreType = {
  userId: string | null;
  setUserId: (id: string) => void;
  userName: string | null;
  setUserName: (name: string) => void;
  storyData: string;
  userStatus: StatusType | null;
  setUserStatus: (status: StatusType) => void;
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
    userStatus: null,
    setUserStatus: (status: StatusType) => set({ userStatus: status }),
    storyData: '',
    setStoryData: (story: string) => set({ storyData: story }),
    roleData: '',
    setRoleData: (role: string) => set({ roleData: role }),
    isUserStoryLoading: false,
    setIsUserStoryLoading: (is: boolean) => set({ isUserStoryLoading: is }),
  }))
);
