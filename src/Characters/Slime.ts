import { getAsset } from "@/constant/assets";
import { CustomScene } from "@/types/CustomScene";

let status = {
  name: "Slime",
  hp: 30,
  maxHp: 30,
  attack: 1,
  defense: 0,
  weapon: null,
};

let cachedSprite: Phaser.GameObjects.Sprite | null = null;

export const Slime = {
  LoadSpritesheet: (scene: Phaser.Scene) => {
    scene.load.spritesheet(...getAsset("SLIME-IDLE"));
    scene.load.spritesheet(...getAsset("SLIME-WALK"));
    scene.load.spritesheet(...getAsset("SLIME-ATTACK"));
    scene.load.spritesheet(...getAsset("SLIME-HURT"));
  },

  CreateCharacter: (scene: Phaser.Scene) => {
    // 병사 애니메이션 생성
    scene.anims.create({
      key: "SLIME-IDLE",
      frames: scene.anims.generateFrameNumbers("SLIME-IDLE", {
        start: 0,
        end: 5,
      }),
      frameRate: 12, // 초당 12프레임
      repeat: -1, // 무한 반복
    });

    scene.anims.create({
      key: "SLIME-WALK",
      frames: scene.anims.generateFrameNumbers("SLIME-WALK", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });

    scene.anims.create({
      key: "SLIME-ATTACK",
      frames: scene.anims.generateFrameNumbers("SLIME-ATTACK", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0,
    });

    scene.anims.create({
      key: "SLIME-HURT",
      frames: scene.anims.generateFrameNumbers("SLIME-HURT", {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: 0,
    });

    return scene.anims;
  },

  AddSprite: (scene: CustomScene) => {
    console.log("👾 AddSprite", scene.slime);
    if (!cachedSprite) {
      cachedSprite = scene.add.sprite(180, 75, "SLIME-IDLE");
    }
    return cachedSprite;
  },

  Play: () => {
    const sprite = cachedSprite;

    if (!sprite) {
      throw new Error("Sprite is not cached");
    }

    return {
      walk: () => sprite.play("SLIME-WALK"),
      idle: () => sprite.play("SLIME-IDLE"),
      attack: () => sprite.play("SLIME-ATTACK"),
      hurt: () => sprite.play("SLIME-HURT"),
    };
  },

  GetStatus: () => status,
  SetHP: (hp: number) => {
    status.hp = hp;
  },
  GetHP: () => status.hp,
};
