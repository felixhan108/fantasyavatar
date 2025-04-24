"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";

enum GameState {
  TRAVELING,
  ENCOUNTER,
}

const AssetsKeys = {
  BACKGROUND: "background",
  SOLDIER_IDLE: "soldier-idle",
  SOLDIER_WALK: "soldier-walk",
};

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 메인 씬 클래스 정의
    class MainScene extends Phaser.Scene {
      private soldier!: Phaser.GameObjects.Sprite;
      private background!: Phaser.GameObjects.TileSprite;
      private gameState!: GameState;

      constructor() {
        // 생성자에서 씬 이름 설정
        super("MainScene");
      }

      // ============================
      // 🧩 preload()
      // ============================
      preload() {
        this.load.image(AssetsKeys.BACKGROUND, "/assets/bg/forest.png");

        // 캐릭터 - Idle
        this.load.spritesheet(
          AssetsKeys.SOLDIER_IDLE,
          "/assets/sprites/Soldier-Idle.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );

        // 캐릭터 - Walk
        this.load.spritesheet(
          AssetsKeys.SOLDIER_WALK,
          "/assets/sprites/Soldier-Walk.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );
      }

      // ============================
      // 🧩 create()
      // ============================
      create() {
        this.gameState = GameState.TRAVELING;

        this.background = this.add
          .tileSprite(0, 0, 480, 160, AssetsKeys.BACKGROUND)
          .setOrigin(0, 0);

        this.anims.create({
          key: "idle",
          frames: this.anims.generateFrameNumbers(AssetsKeys.SOLDIER_IDLE, {
            start: 0,
            end: 5,
          }),
          frameRate: 12, // 초당 12프레임
          repeat: -1, // 무한 반복
        });

        this.anims.create({
          key: "walk",
          frames: this.anims.generateFrameNumbers(AssetsKeys.SOLDIER_WALK, {
            start: 0,
            end: 7,
          }),
          frameRate: 12, // 초당 12프레임
          repeat: -1, // 무한 반복
        });

        this.soldier = this.add.sprite(50, 75, AssetsKeys.SOLDIER_IDLE);
        this.soldier.play("idle");

        // 1초 뒤에 walk 애니메이션으로 변경 + 속도 증가
        this.time.delayedCall(1000, () => {
          this.soldier.play("walk");
        });
      }

      // ============================
      // 🧩 update()
      // ============================
      update() {
        if (this.gameState === GameState.TRAVELING) {
          this.background.tilePositionX += 1;

          if (Phaser.Math.Between(0, 1000) < 500) {
            this.gameState = GameState.ENCOUNTER;
            this.soldier.play("idle"); // 여기서 한 번만 실행
            console.log("ENCOUNTER");
          }
        }
      }
    }

    // ============================
    // 🧩 config
    // ============================
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
      <div ref={phaserRef} />
    </>
  );
}
