import { LoadBackground } from "@/Background/LoadBackground";
import { create } from "zustand";

type BackgroundStatus = {
  background: Phaser.GameObjects.TileSprite | null;
  setBackground: (background: Phaser.GameObjects.TileSprite) => void;
  LoadBackground: void;
};

export const useBackgroundState = create<BackgroundStatus>((set) => ({}));
