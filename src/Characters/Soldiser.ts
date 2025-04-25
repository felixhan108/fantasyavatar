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

  CreateCharacter: (scene: Phaser.Scene) => {
    // 병사 애니메이션 생성
    scene.anims.create({
      key: "SOLDIER-IDLE",
      frames: scene.anims.generateFrameNumbers("SOLDIER-IDLE", {
        start: 0,
        end: 5,
      }),
      frameRate: 12, // 초당 12프레임
      repeat: -1, // 무한 반복
    });

    scene.anims.create({
      key: "SOLDIER-WALK",
      frames: scene.anims.generateFrameNumbers("SOLDIER-WALK", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });

    scene.anims.create({
      key: "SOLDIER-ATTACK",
      frames: scene.anims.generateFrameNumbers("SOLDIER-ATTACK", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0,
    });

    scene.anims.create({
      key: "SOLDIER-HURT",
      frames: scene.anims.generateFrameNumbers("SOLDIER-HURT", {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: 0,
    });

    return scene.anims;
  },

  AddSprite: (scene: Phaser.Scene) => {
    if (!cachedSprite) {
      cachedSprite = scene.add.sprite(50, 75, "SOLDIER-IDLE");
    }
    return cachedSprite;
  },

  Play: () => {
    const sprite = cachedSprite;

    if (!sprite) {
      throw new Error("Sprite is not cached");
    }

    return {
      walk: () => sprite.anims.play("SOLDIER-WALK"),
      idle: () => sprite.anims.play("SOLDIER-IDLE"),
      attack: () => sprite.anims.play("SOLDIER-ATTACK"),
      hurt: () => sprite.anims.play("SOLDIER-HURT"),
    };
  },

  GetStatus: () => status,

  EquipWeapon: (weapon: string) => {
    status.weapon = Weapon[weapon];
  },

  GetAttackPower: () => {
    return status.attack + (status.weapon?.bonusAttack ?? 0);
  },
};
