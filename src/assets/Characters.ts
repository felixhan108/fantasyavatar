import { CharacterAssetType } from '@/types/AssetsType';
import { Weapons } from './Weapons';

export const Characters: { [key: string]: CharacterAssetType } = {
  SWORD: {
    key: 'SWORD',
    status: {
      level: 1,
      hp: 100,
      mp: 50,
      maxHp: 100,
      maxMp: 50,
      attack: 10,
      defense: 5,
      exp: 0,
      gold: 0,
      weapon: Weapons.rustySword,
    },
    preload: (scene: Phaser.Scene) => {
      scene.load.spritesheet('SWORD-IDLE', '/assets/character/Swordsman-Idle.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SWORD-WALK', '/assets/character/Swordsman-Walk.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SWORD-ATTACK', '/assets/character/Swordsman-Attack01.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SWORD-HURT', '/assets/character/Swordsman-Hurt.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SWORD-DEAD', '/assets/character/Swordsman-Death.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
    },
    createAnims: (scene: Phaser.Scene) => {
      scene.anims.create({
        key: 'SWORD-IDLE',
        frames: scene.anims.generateFrameNumbers('SWORD-IDLE', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'SWORD-WALK',
        frames: scene.anims.generateFrameNumbers('SWORD-WALK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'SWORD-ATTACK',
        frames: scene.anims.generateFrameNumbers('SWORD-ATTACK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'SWORD-HURT',
        frames: scene.anims.generateFrameNumbers('SWORD-HURT', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'SWORD-DEAD',
        frames: scene.anims.generateFrameNumbers('SWORD-DEAD', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
    },
    createSprite: (scene: Phaser.Scene) => {
      const sprite = scene.add.sprite(-10, 75, 'SWORD-IDLE');
      sprite.play('SWORD-IDLE');
      return sprite;
    },
    idleAnim: 'SWORD-IDLE',
    walkAnim: 'SWORD-WALK',
    attackAnim: 'SWORD-ATTACK',
    hurtAnim: 'SWORD-HURT',
    deadAnim: 'SWORD-DEAD',
  },
  MAGIC: {
    key: 'MAGIC',
    status: {
      level: 1,
      hp: 80,
      mp: 100,
      maxHp: 80,
      maxMp: 100,
      attack: 15,
      defense: 2,
      exp: 0,
      gold: 0,
      weapon: Weapons.rustySword,
    },
    preload: (scene: Phaser.Scene) => {
      scene.load.spritesheet('MAGIC-IDLE', '/assets/character/Wizard-Idle.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('MAGIC-WALK', '/assets/character/Wizard-Walk.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('MAGIC-ATTACK', '/assets/character/Wizard-Attack01.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('MAGIC-HURT', '/assets/character/Wizard-Hurt.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('MAGIC-DEAD', '/assets/character/Wizard-Death.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
    },
    createAnims: (scene: Phaser.Scene) => {
      scene.anims.create({
        key: 'MAGIC-IDLE',
        frames: scene.anims.generateFrameNumbers('MAGIC-IDLE', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'MAGIC-WALK',
        frames: scene.anims.generateFrameNumbers('MAGIC-WALK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'MAGIC-ATTACK',
        frames: scene.anims.generateFrameNumbers('MAGIC-ATTACK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'MAGIC-HURT',
        frames: scene.anims.generateFrameNumbers('MAGIC-HURT', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'MAGIC-DEAD',
        frames: scene.anims.generateFrameNumbers('MAGIC-DEAD', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
    },
    createSprite: (scene: Phaser.Scene) => {
      const sprite = scene.add.sprite(-10, 75, 'MAGIC-IDLE');
      sprite.play('MAGIC-IDLE');
      return sprite;
    },
    idleAnim: 'MAGIC-IDLE',
    walkAnim: 'MAGIC-WALK',
    attackAnim: 'MAGIC-ATTACK',
    hurtAnim: 'MAGIC-HURT',
    deadAnim: 'MAGIC-DEAD',
  },
  ARCHER: {
    key: 'ARCHER',
    status: {
      level: 1,
      hp: 90,
      mp: 90,
      maxHp: 90,
      maxMp: 90,
      attack: 15,
      defense: 2,
      exp: 0,
      gold: 0,
      weapon: Weapons.rustySword,
    },
    preload: (scene: Phaser.Scene) => {
      scene.load.spritesheet('ARCHER-IDLE', '/assets/character/Archer-Idle.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('ARCHER-WALK', '/assets/character/Archer-Walk.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('ARCHER-ATTACK', '/assets/character/Archer-Attack01.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('ARCHER-HURT', '/assets/character/Archer-Hurt.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('ARCHER-DEAD', '/assets/character/Archer-Death.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
    },
    createAnims: (scene: Phaser.Scene) => {
      scene.anims.create({
        key: 'ARCHER-IDLE',
        frames: scene.anims.generateFrameNumbers('ARCHER-IDLE', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'ARCHER-WALK',
        frames: scene.anims.generateFrameNumbers('ARCHER-WALK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'ARCHER-ATTACK',
        frames: scene.anims.generateFrameNumbers('ARCHER-ATTACK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'ARCHER-HURT',
        frames: scene.anims.generateFrameNumbers('ARCHER-HURT', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'ARCHER-DEAD',
        frames: scene.anims.generateFrameNumbers('ARCHER-DEAD', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
    },
    createSprite: (scene: Phaser.Scene) => {
      const sprite = scene.add.sprite(-10, 75, 'ARCHER-IDLE');
      sprite.play('ARCHER-IDLE');
      return sprite;
    },
    idleAnim: 'ARCHER-IDLE',
    walkAnim: 'ARCHER-WALK',
    attackAnim: 'ARCHER-ATTACK',
    hurtAnim: 'ARCHER-HURT',
    deadAnim: 'ARCHER-DEAD',
  },
};
