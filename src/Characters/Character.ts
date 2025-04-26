import { Weapon } from "@/Items/Weapon";

export const Character = {
  SOLDIER: {
    key: "SOLDIER",
    status: {
      hp: 100,
      maxHp: 100,
      attack: 10,
      defense: 5,
      exp: 0,
      gold: 0,
      weapon: Weapon.rustySword,
    },
    preload: (scene: Phaser.Scene) => {
      scene.load.spritesheet(
        "SOLDIER-IDLE",
        "/assets/character/Soldier-Idle.png",
        {
          frameWidth: 100,
          frameHeight: 100,
        }
      );
      scene.load.spritesheet(
        "SOLDIER-WALK",
        "/assets/character/Soldier-Walk.png",
        {
          frameWidth: 100,
          frameHeight: 100,
        }
      );
      scene.load.spritesheet(
        "SOLDIER-ATTACK",
        "/assets/character/Soldier-Attack01.png",
        {
          frameWidth: 100,
          frameHeight: 100,
        }
      );
      scene.load.spritesheet(
        "SOLDIER-HURT",
        "/assets/character/Soldier-Hurt.png",
        {
          frameWidth: 100,
          frameHeight: 100,
        }
      );
      scene.load.spritesheet(
        "SOLDIER-DEAD",
        "/assets/character/Soldier-Death.png",
        {
          frameWidth: 100,
          frameHeight: 100,
        }
      );
    },
    createAnims: (scene: Phaser.Scene) => {
      scene.anims.create({
        key: "SOLDIER-IDLE",
        frames: scene.anims.generateFrameNumbers("SOLDIER-IDLE", {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: "SOLDIER-WALK",
        frames: scene.anims.generateFrameNumbers("SOLDIER-WALK", {
          start: 0,
          end: 5,
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
      scene.anims.create({
        key: "SOLDIER-DEAD",
        frames: scene.anims.generateFrameNumbers("SOLDIER-DEAD", {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
    },
    createSprite: (scene: Phaser.Scene) => {
      const sprite = scene.add.sprite(-10, 75, "SOLDIER-IDLE");
      sprite.play("SOLDIER-IDLE");
      return sprite;
    },
    idleAnim: "SOLDIER-IDLE",
    walkAnim: "SOLDIER-WALK",
    attackAnim: "SOLDIER-ATTACK",
    hurtAnim: "SOLDIER-HURT",
    deadAnim: "SOLDIER-DEAD",
  },
};
