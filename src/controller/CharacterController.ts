import { CharacterAssetType } from '@/types/AssetsType';

export class CharacterController {
  constructor(
    public scene: Phaser.Scene,
    public sprite: Phaser.GameObjects.Sprite,
    public asset: CharacterAssetType
  ) {}

  async walk(targetX: number, duration: number) {
    this.sprite.play(this.asset.walkAnim);
    return new Promise<void>((resolve) => {
      this.scene.tweens.add({
        targets: this.sprite,
        x: targetX,
        duration,
        ease: 'Linear',
        onComplete: () => {
          this.sprite.play(this.asset.idleAnim);
          resolve();
        },
      });
    });
  }

  async attack() {
    this.sprite.play(this.asset.attackAnim);
    return new Promise<void>((resolve) => {
      this.sprite.once('animationcomplete', () => {
        this.sprite.play(this.asset.idleAnim);
        resolve();
      });
    });
  }

  async hurt() {
    this.sprite.play(this.asset.hurtAnim);
    return new Promise<void>((resolve) => {
      this.sprite.once('animationcomplete', () => {
        this.sprite.play(this.asset.idleAnim);
        resolve();
      });
    });
  }

  async dead() {
    this.sprite.play(this.asset.deadAnim);
    return new Promise<void>((resolve) => {
      this.sprite.once('animationcomplete', () => {
        resolve();
      });
    });
  }
}
