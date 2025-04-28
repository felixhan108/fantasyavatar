import { create } from 'zustand';
import { devtools } from "zustand/middleware";

// assets import
import { Characters } from '@/assets/Characters';

// 타입 정의
import { GameStoreType } from '@/types/GameStoreType';
import { GameState } from '@/constant/GameState';
import { Monsters } from '@/assets/Monsters';
import { MonsterStatusType } from '@/types/AssetsType';



export const useGameStore = create(devtools<GameStoreType>((set, get) => ({
  gameState: GameState.INTRO,
  setGameState: (state: GameState) => set({ gameState: state }),
  characterJob: null,
  setCharacterJob: (job: string) => set({ characterJob: job }),
  characterAssets: null,
  setCharacterAssets: (assets) => {
    set({ characterAssets: assets });
  },
  characterStatus: null,
  setCharacterStatus: () =>{
    const job = get().characterJob; // 현재 설정된 characterJob 가져오기
    if (job && Characters[job]) {
      set({ characterStatus: { ...Characters[job].status } }); // Characters[job]의 데이터를 character에 설정
    }
  },
  characterSprite: null,
  setCharacterSprite: (sprite: Phaser.GameObjects.Sprite) => set({ characterSprite: sprite }),
  monsterType: null,
  setMonsterType: (type: string) => set({ monsterType: type }),

  monsterStatus: null,
  setMonsterStatus: (status: MonsterStatusType) => {
    set({ monsterStatus: status });
  },

  stopBattle: false,
  setStopBattle: (stop: boolean) => set({ stopBattle: stop }),

  isBackgroundMoving: false,
  setIsBackgroundMoving: (moving: boolean) => set({ isBackgroundMoving: moving }),

  
  
})));
