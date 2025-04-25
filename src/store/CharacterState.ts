import { create } from "zustand";

type CharacterStatus = {
  character: Phaser.GameObjects.Sprite | null;
  setCharacter: (character: Phaser.GameObjects.Sprite) => void;
};

export const useCharacterStatus = create<CharacterStatus>((set) => ({
  character: null,
  setCharacter: (character) => set({ character: character }),
}));
