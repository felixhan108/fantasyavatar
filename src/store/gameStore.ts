// stores/gameState.ts
import { create } from "zustand";

export enum GameState {
  INTRO = "INTRO",
  TRAVELING = "TRAVELING",
  STANDING = "STANDING",
  BATTLE = "BATTLE",
  RESULT = "RESULT",
}

export interface Monster {
  name: string;
  HP: number;
  maxHP: number;
  attack: number;
  defense: number;
  exp: number;
  gold: number;
  sprite: Phaser.GameObjects.Sprite | null;
}

type GameStore = {
  gameState: GameState;
  soldierHP: number;
  setGameState: (state: GameState) => void;
  addSprite: (scene: Phaser.Scene) => Phaser.GameObjects.Sprite;
  playSoldierIdle: (scene: Phaser.Scene) => void;
  playSoldierWalk: (scene: Phaser.Scene) => void;
  playSoldierAttack: (scene: Phaser.Scene) => void;
  playSoldierHurt: (scene: Phaser.Scene) => void;
  setSoldierHP: (hp: number) => void;
  getSoldierHP: () => number;
  addSlimeSprite: (scene: Phaser.Scene) => Phaser.GameObjects.Sprite;
  playSlimeIdle: (scene: Phaser.Scene) => void;
  playSlimeWalk: (scene: Phaser.Scene) => void;
  playSlimeAttack: (scene: Phaser.Scene) => void;
  playSlimeHurt: (scene: Phaser.Scene) => void;
  slimeHP: number;
  setSlimeHP: (hp: number) => void;
  getSlimeHP: () => number;

  currentMonster: Monster | null;
  setCurrentMonster: (monster: Monster) => void;
  updateMonsterHP: (monster: Monster, hp: number) => void;
  clearMonster: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: GameState.INTRO,
  setGameState: (state) => set({ gameState: state }),

  soldierHP: 100,
  setSoldierHP: (hp) => set({ soldierHP: hp }),
  getSoldierHP: () => get().soldierHP,

  addSprite: (scene: Phaser.Scene) => {
    const sprite = scene.add.sprite(-10, 75, "SOLDIER-IDLE");
    return sprite;
  },
  playSoldierIdle: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SOLDIER-IDLE",
      frames: scene.anims.generateFrameNumbers("SOLDIER-IDLE", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: -1,
    });
  },
  playSoldierWalk: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SOLDIER-WALK",
      frames: scene.anims.generateFrameNumbers("SOLDIER-WALK", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
  },
  playSoldierAttack: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SOLDIER-ATTACK",
      frames: scene.anims.generateFrameNumbers("SOLDIER-ATTACK", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0,
    });
  },
  playSoldierHurt: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SOLDIER-HURT",
      frames: scene.anims.generateFrameNumbers("SOLDIER-HURT", {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: 0,
    });
  },
  addSlimeSprite: (scene: Phaser.Scene) => {
    const sprite = scene.add.sprite(180, 75, "SLIME-IDLE");
    sprite.setFlipX(true);
    return sprite;
  },
  playSlimeIdle: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SLIME-IDLE",
      frames: scene.anims.generateFrameNumbers("SLIME-IDLE", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: -1,
    });
  },
  playSlimeWalk: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SLIME-WALK",
      frames: scene.anims.generateFrameNumbers("SLIME-WALK", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
  },
  playSlimeAttack: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SLIME-ATTACK",
      frames: scene.anims.generateFrameNumbers("SLIME-ATTACK", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0,
    });
  },
  playSlimeHurt: (scene: Phaser.Scene) => {
    scene.anims.create({
      key: "SLIME-HURT",
      frames: scene.anims.generateFrameNumbers("SLIME-HURT", {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: 0,
    });
  },
  slimeHP: 30,
  setSlimeHP: (hp) => set({ slimeHP: hp }),
  getSlimeHP: () => get().slimeHP,
  currentMonster: null,
  setCurrentMonster: (monster) => set({ currentMonster: monster }),
  updateMonsterHP: (monster: Monster, hp: number) => {
    set({ currentMonster: { ...monster, HP: hp } });
  },
  clearMonster: () => set({ currentMonster: null }),
}));
