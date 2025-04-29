import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Constants import
import { GameState } from '@/constant/GameState';

// assets import
import { Characters } from '@/assets/Characters';
import { Monsters } from '@/assets/Monsters';
// 타입 정의
import { GameStoreType } from '@/types/GameStoreType';
import { MonsterStatusType } from '@/types/AssetsType';

export const useGameStore = create(
  devtools<GameStoreType>((set, get) => ({
    gameState: GameState.INTRO,
    setGameState: (state: GameState) => set({ gameState: state }),

    characterJob: 'SOLDIER',
    setCharacterJob: (job: keyof typeof Characters) => set({ characterJob: job }),

    characterAssets: null,
    setCharacterAssets: (assets) => {
      set({ characterAssets: assets });
    },

    characterStatus: null,
    setCharacterStatus: () => {
      const job = get().characterJob; // 현재 설정된 characterJob 가져오기
      if (job && Characters[job]) {
        set({ characterStatus: { ...Characters[job].status } }); // Characters[job]의 데이터를 character에 설정
      }
    },

    characterSprite: null,
    setCharacterSprite: (sprite: Phaser.GameObjects.Sprite) => set({ characterSprite: sprite }),

    monsterType: 'SKELETON',
    setMonsterType: (type: keyof typeof Monsters) => set({ monsterType: type }),

    monsterStatus: null,
    setMonsterStatus: (status: MonsterStatusType) => {
      set({ monsterStatus: status });
    },

    stopBattle: false,
    setStopBattle: (stop: boolean) => set({ stopBattle: stop }),

    isBackgroundMoving: false,
    setIsBackgroundMoving: (moving: boolean) => set({ isBackgroundMoving: moving }),
  }))
);
