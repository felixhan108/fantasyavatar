import { getAsset } from "@/constant/assets";
import { Weapon } from "@/Items/Weapon";
let status = {
  name: "Felix",
  hp: 100,
  maxHp: 100,
  attack: 10,
  defense: 5,
  weapon: Weapon.rustySword,
};

let cachedSprite: Phaser.GameObjects.Sprite | null = null;

export const Soldier = {
  LoadSpritesheet: (scene: Phaser.Scene) => {
    scene.load.spritesheet(...getAsset("SOLDIER-IDLE"));
    scene.load.spritesheet(...getAsset("SOLDIER-WALK"));
    scene.load.spritesheet(...getAsset("SOLDIER-ATTACK"));
    scene.load.spritesheet(...getAsset("SOLDIER-HURT"));
  },
};
