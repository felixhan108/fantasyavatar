"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 메인 씬 클래스 정의
    class MainScene extends Phaser.Scene {
      private soldier!: Phaser.GameObjects.Sprite;
      private background!: Phaser.GameObjects.TileSprite;
      constructor() {
        // 생성자에서 씬 이름 설정
        super("MainScene");
      }

      // 로드 씬 정의
      preload() {
        this.load.image("background", "/assets/bg/road.png");

        // 캐릭터 - Idle
        this.load.spritesheet(
          "soldier-idle",
          "/assets/sprites/Soldier-Idle.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );

        // 캐릭터 - Walk
        this.load.spritesheet(
          "soldier-walk",
          "/assets/sprites/Soldier-Walk.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );
      }

      // 생성 씬 정의
      create() {
        this.background = this.add
          .tileSprite(0, 0, 150, 112.5, "background")
          .setOrigin(0, 0)
          .setScale(150 / 1024);

        console.log(
          "이미지 크기:",
          this.textures.get("background").getSourceImage().width,
          this.textures.get("background").getSourceImage().height
        );

        this.anims.create({
          key: "idle",
          frames: this.anims.generateFrameNumbers("soldier-idle", {
            start: 0,
            end: 5,
          }),
          frameRate: 12, // 초당 12프레임
          repeat: -1, // 무한 반복
        });

        this.anims.create({
          key: "walk",
          frames: this.anims.generateFrameNumbers("soldier-walk", {
            start: 0,
            end: 7,
          }),
          frameRate: 12, // 초당 12프레임
          repeat: -1, // 무한 반복
        });

        this.soldier = this.add.sprite(50, 110, "soldier-idle");
        this.soldier.play("idle");

        // 1초 뒤에 walk 애니메이션으로 변경 + 속도 증가
        this.time.delayedCall(1000, () => {
          this.soldier.play("walk");
        });
      }

      update() {
        this.background.tilePositionX += 1;
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 150,
      height: 150,
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
