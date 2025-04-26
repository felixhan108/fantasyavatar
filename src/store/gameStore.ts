// stores/gameState.ts
import { Character } from "@/Characters/Character";
import { create } from "zustand";

export enum GameState {
  INTRO = "INTRO",
  TRAVELING = "TRAVELING",
  STANDING = "STANDING",
  BATTLE = "BATTLE",
  RESULT = "RESULT",
}

export const useGameStore = create((set, get) => ({
  gameState: GameState.INTRO,
  setGameState: (state: GameState) => set({ gameState: state }),
  characterJob: null,
  setCharacterJob: (job: string) => set({ characterJob: job }),
  character: null, // 처음은 null
  setCharacter: () => {
    const job = get().characterJob; // ✅ get으로 읽어옴
    if (job) {
      set({ character: Character[job] });
    }
  },
  characterSprite: null,
  setCharacterSprite: (sprite: any) => set({ characterSprite: sprite }),
  monsterType: null,
  setMonsterType: (type: string) => set({ monsterType: type }),
  stopBattle: false,
  setStopBattle: (stop: boolean) => set({ stopBattle: stop }),

  currentMonster: null,
  setCurrentMonster: (monster: any, sprite: any) =>
    set({
      currentMonster: {
        name: monster.key,
        HP: monster.status.HP,
        maxHP: monster.status.maxHP,
        attack: monster.status.attack,
        defense: monster.status.defense,
        exp: monster.status.exp,
      },
    }),
  updateMonsterHP: (monster: any, hp: number) => {
    set({ currentMonster: { ...monster, HP: hp } });
  },
  clearMonster: () => set({ currentMonster: null }),
}));
