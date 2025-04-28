import { WeaponType } from '@/Items/Weapon';
import { Characters } from '@/assets/Characters';
import { create } from 'zustand';
import { GameState } from '@/types/GameState';

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
  setCharacterSprite: (sprite: Phaser.GameObjects.TileSprite) => set({ characterSprite: sprite }),
  monsterType: null,
  setMonsterType: (type: string) => set({ monsterType: type }),
  stopBattle: false,
  setStopBattle: (stop: boolean) => set({ stopBattle: stop }),

  isBackgroundMoving: false,
  setIsBackgroundMoving: (moving: boolean) => set({ isBackgroundMoving: moving }),

  characterStatus: null,
  setCharacterStatus: (character: characterStatusType) =>
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
  setMonsterStatus: (monsterStatus: monsterStatusType, hp: number) => {
    set({ currentMonsterStatus: { ...monsterStatus, hp: hp } });
  },

  clearMonster: () => set({ currentMonsterStatus: null }),
}));
