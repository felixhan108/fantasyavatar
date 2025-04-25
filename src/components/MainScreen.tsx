'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GameState, useGameStore } from '@/store/gameStore';
import { Soldier } from '@/Characters/Soldiser';
import RandomEncounter from '@/Battle/RandomEncounter';
import { Slime } from '@/Characters/Slime';
export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const gameStore = useGameStore();

  useEffect(() => {
    class MainScene extends Phaser.Scene {
      public background!: Phaser.GameObjects.TileSprite;
      public soldier!: Phaser.GameObjects.Sprite;
      public slime!: Phaser.GameObjects.Sprite;
      public encounterStarted = false;

      constructor() {
        super('MainScene');
      }

      preload() {
        this.load.image('BACKGROUND', '/assets/bg/forest.png');
        Soldier.LoadSpritesheet(this);
        Slime.LoadSpritesheet(this);
      }

      create() {
        this.background = this.add.tileSprite(0, 0, 480, 160, 'BACKGROUND').setOrigin(0, 0);

        this.soldier = useGameStore.getState().addSprite(this);
        useGameStore.getState().playSoldierIdle(this);
        useGameStore.getState().playSoldierWalk(this);
        useGameStore.getState().playSoldierAttack(this);
        useGameStore.getState().playSoldierHurt(this);
        this.soldier.play('SOLDIER-WALK');

        useGameStore.getState().playSlimeIdle(this);
        useGameStore.getState().playSlimeWalk(this);
        useGameStore.getState().playSlimeAttack(this);
        useGameStore.getState().playSlimeHurt(this);

        // 👣 INTRO -> TRAVELING -> INCOUNTER
        this.tweens.add({
          targets: this.soldier,
          x: 60,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            this.soldier.play('SOLDIER-IDLE');

            this.time.delayedCall(1000, () => {
              useGameStore.getState().setGameState(GameState.TRAVELING);
              this.soldier.play('SOLDIER-WALK');
            });
          },
        });
      }

      update(time: number, delta: number) {
        const state = useGameStore.getState().gameState;

        if (state === GameState.TRAVELING && !this.encounterStarted) {
          console.log('👣 인커배트 시작', this.encounterStarted);
          this.encounterStarted = true;

          // INCOUNTER -> BATTLE -> RESULT -> TRAVELING
          RandomEncounter(this);
        }

        if (state === GameState.TRAVELING) {
          this.background.tilePositionX += 0.5;
        }
        if (state === GameState.RESULT) {
          this.encounterStarted = false;
        }
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 16 * 10,
      height: 16 * 10,
      parent: phaserRef.current,
      scene: MainScene,
      pixelArt: true,
      zoom: 2,
    };

    // 게임 인스턴스 생성
    const game = new Phaser.Game(config);

    return () => {
      // 컴포넌트가 언마운트될 때 게임 인스턴스 제거
      game.destroy(true);
    };
  }, []);

  return (
    <>
      <div>{gameStore.gameState}</div>
      <div className="w-full flex items-center justify-between">
        <div>HP : {gameStore.soldierHP}</div>
        <div>{gameStore.currentMonster ? `HP : ${gameStore.currentMonster.HP}` : ''}</div>
      </div>
      <div ref={phaserRef} />
    </>
  );
}
