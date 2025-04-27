import { Weapons } from '@/assets/Weapons';
import { Character } from '@/Characters/Character';
import { Characters } from '@/assets/Characters';
import { create } from 'zustand';

export enum GameState {
  INTRO = 'INTRO',
  TRAVELING = 'TRAVELING',
  ENCOUNTER = 'ENCOUNTER',
  STANDING = 'STANDING',
  BATTLE = 'BATTLE',
  RESULT = 'RESULT',
}

export interface GameStore {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  characterJob: string | null;
  setCharacterJob: (job: string) => void;
  character: (typeof Characters)[keyof typeof Characters] | null;
  setCharacter: () => void;
  characterSprite: any;
  setCharacterSprite: (sprite: any) => void;
  monsterType: string | null;
  setMonsterType: (type: string) => void;
  stopBattle: boolean;
  setStopBattle: (stop: boolean) => void;
  isBackgroundMoving: boolean;
  setIsBackgroundMoving: (moving: boolean) => void;
  characterStatus: any;
  setCharacterStatus: (character: any) => void;
  currentMonsterStatus: any;
  setCurrentMonsterStatus: (status: any) => void;
  setMonsterStatus: (monsterStatus: any, hp: number) => void;
  clearMonster: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: GameState.INTRO,
  setGameState: (state: GameState) => set({ gameState: state }),
  characterJob: null,
  setCharacterJob: (job: string) => set({ characterJob: job }),
  character: null,
  setCharacter: () => {
    const job = get().characterJob; // ✅ get으로 읽어옴
    if (job) {
      set({ character: Characters[job as keyof typeof Characters] });
    }
  },
  characterSprite: null,
  setCharacterSprite: (sprite: any) => set({ characterSprite: sprite }),
  monsterType: null,
  setMonsterType: (type: string) => set({ monsterType: type }),
  stopBattle: false,
  setStopBattle: (stop: boolean) => set({ stopBattle: stop }),

  isBackgroundMoving: false,
  setIsBackgroundMoving: (moving: boolean) => set({ isBackgroundMoving: moving }),

  characterStatus: null,
  setCharacterStatus: (character: any) =>
    set({
      characterStatus: {
        name: character.key,
        level: character.status.level,
        hp: character.status.hp,
        maxHP: character.status.maxHP,
        attack: character.status.attack,
        defense: character.status.defense,
        exp: character.status.exp,
        gold: character.status.gold,
        weapon: character.status.weapon,
      },
    }),
  currentMonsterStatus: null,
  setCurrentMonsterStatus: (status: {
    name: string;
    hp: number;
    maxHP: number;
    attack: number;
    defense: number;
    exp: number;
    gold: number;
  }) =>
    set({
      currentMonsterStatus: {
        name: status.name ?? 'nobody',
        hp: status.hp ?? 0,
        maxHP: status.maxHP ?? 0,
        attack: status.attack ?? 0,
        defense: status.defense ?? 0,
        exp: status.exp ?? 0,
        gold: status.gold ?? 0,
      },
    }),
  setMonsterStatus: (monsterStatus: any, hp: number) => {
    set({ currentMonsterStatus: { ...monsterStatus, hp: hp } });
  },

  clearMonster: () => set({ currentMonsterStatus: null }),
}));
