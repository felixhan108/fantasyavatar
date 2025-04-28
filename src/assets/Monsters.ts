import { MonsterAssetType } from "@/types/AssetsType";

export const Monsters:{ [key: string]: MonsterAssetType} = {
  SLIME: {
    key: 'SLIME',
    status: {
      hp: 30,
      maxHP: 30,
      attack: 1,
      defense: 0,
      exp: 30,
      gold: 30,
    },
    preload: (scene: Phaser.Scene) => {
      scene.load.spritesheet('SLIME-IDLE', '/assets/monster/Slime-Idle.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SLIME-WALK', '/assets/monster/Slime-Walk.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SLIME-ATTACK', '/assets/monster/Slime-Attack01.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SLIME-HURT', '/assets/monster/Slime-Hurt.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SLIME-DEAD', '/assets/monster/Slime-Death.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
    },
    createAnims: (scene: Phaser.Scene) => {
      scene.anims.create({
        key: 'SLIME-IDLE',
        frames: scene.anims.generateFrameNumbers('SLIME-IDLE', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'SLIME-WALK',
        frames: scene.anims.generateFrameNumbers('SLIME-WALK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'SLIME-ATTACK',
        frames: scene.anims.generateFrameNumbers('SLIME-ATTACK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'SLIME-HURT',
        frames: scene.anims.generateFrameNumbers('SLIME-HURT', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'SLIME-DEAD',
        frames: scene.anims.generateFrameNumbers('SLIME-DEAD', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
    },
    createSprite: (scene: Phaser.Scene) => {
      const sprite = scene.add.sprite(200, 75, 'SLIME-IDLE');
      sprite.play('SLIME-IDLE');
      sprite.flipX = true;
      return sprite;
    },
    idleAnim: 'SLIME-IDLE',
    walkAnim: 'SLIME-WALK',
    attackAnim: 'SLIME-ATTACK',
    hurtAnim: 'SLIME-HURT',
    deadAnim: 'SLIME-DEAD',
  },

  SKELETON: {
    key: 'SKELETON',
    status: {
      hp: 50,
      maxHP: 50,
      attack: 3,
      defense: 0,
      exp: 50,
      gold: 50,
    },
    preload: (scene: Phaser.Scene) => {
      scene.load.spritesheet('SKELETON-IDLE', '/assets/monster/Skeleton-Idle.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SKELETON-WALK', '/assets/monster/Skeleton-Walk.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SKELETON-ATTACK', '/assets/monster/Skeleton-Attack01.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SKELETON-HURT', '/assets/monster/Skeleton-Hurt.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
      scene.load.spritesheet('SKELETON-DEAD', '/assets/monster/Skeleton-Death.png', {
        frameWidth: 100,
        frameHeight: 100,
      });
    },
    createAnims: (scene: Phaser.Scene) => {
      scene.anims.create({
        key: 'SKELETON-IDLE',
        frames: scene.anims.generateFrameNumbers('SKELETON-IDLE', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'SKELETON-WALK',
        frames: scene.anims.generateFrameNumbers('SKELETON-WALK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: -1,
      });
      scene.anims.create({
        key: 'SKELETON-ATTACK',
        frames: scene.anims.generateFrameNumbers('SKELETON-ATTACK', {
          start: 0,
          end: 5,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'SKELETON-HURT',
        frames: scene.anims.generateFrameNumbers('SKELETON-HURT', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
      scene.anims.create({
        key: 'SKELETON-DEAD',
        frames: scene.anims.generateFrameNumbers('SKELETON-DEAD', {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: 0,
      });
    },
    createSprite: (scene: Phaser.Scene) => {
      const sprite = scene.add.sprite(200, 75, 'SKELETON-IDLE');
      sprite.play('SKELETON-IDLE');
      sprite.flipX = true;
      return sprite;
    },
    idleAnim: 'SKELETON-IDLE',
    walkAnim: 'SKELETON-WALK',
    attackAnim: 'SKELETON-ATTACK',
    hurtAnim: 'SKELETON-HURT',
    deadAnim: 'SKELETON-DEAD',
  },
};
