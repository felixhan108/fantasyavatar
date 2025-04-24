"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";

enum GameState {
  TRAVELING,
  ENCOUNTER,
  WAREND,
}

const AssetsKeys = {
  BACKGROUND: "background",
  SOLDIER_IDLE: "soldier-idle",
  SOLDIER_WALK: "soldier-walk",
  SLIME_IDLE: "slime-idle",
  SLIME_WALK: "slime-walk",
  SOLDIER_ATTACK: "soldier-attack",
  SLIME_ATTACK: "slime-attack",
  SOLDIER_HURT: "soldier-hurt",
  SLIME_HURT: "slime-hurt",
};

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 메인 씬 클래스 정의
    class MainScene extends Phaser.Scene {
      private soldier!: Phaser.GameObjects.Sprite;
      private slime!: Phaser.GameObjects.Sprite;
      private background!: Phaser.GameObjects.TileSprite;
      private gameState!: GameState;
      private soldierHP: number = 100;
      private slimeHP: number = 100;
      private soldierHPText!: Phaser.GameObjects.Text;
      private battleTimer!: Phaser.Time.TimerEvent;
      private currentAttacker: "soldier" | "slime" = "soldier";

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

        // 캐릭터 - Attack
        this.load.spritesheet(
          AssetsKeys.SOLDIER_ATTACK,
          "/assets/sprites/Soldier-Attack01.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );

        // 캐릭터 - Hurt
        this.load.spritesheet(
          AssetsKeys.SOLDIER_HURT,
          "/assets/sprites/Soldier-Hurt.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );
        // 슬라임 - Idle
        this.load.spritesheet(
          AssetsKeys.SLIME_IDLE,
          "/assets/sprites/Slime-Idle.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );

        // 슬라임 - Walk
        this.load.spritesheet(
          AssetsKeys.SLIME_WALK,
          "/assets/sprites/Slime-Walk.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );

        // 슬라임 - Attack
        this.load.spritesheet(
          AssetsKeys.SLIME_ATTACK,
          "/assets/sprites/Slime-Attack01.png",
          {
            frameWidth: 100, // 디자인에 정해놓은 그리드 사이즈
            frameHeight: 100,
          }
        );

        // 슬라임 - Hurt
        this.load.spritesheet(
          AssetsKeys.SLIME_HURT,
          "/assets/sprites/Slime-Hurt.png",
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
        this.gameState = GameState.ENCOUNTER;

        this.background = this.add
          .tileSprite(0, 0, 480, 160, AssetsKeys.BACKGROUND)
          .setOrigin(0, 0);

        // 병사 HP 텍스트만 생성
        this.soldierHPText = this.add.text(5, 5, `HP: ${this.soldierHP}`, {
          fontSize: "10px",
          color: "#ffffff",
        });

        // 병사 애니메이션 생성
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
          frameRate: 12,
          repeat: -1,
        });

        this.anims.create({
          key: "attack",
          frames: this.anims.generateFrameNumbers(AssetsKeys.SOLDIER_ATTACK, {
            start: 0,
            end: 6,
          }),
          frameRate: 12,
          repeat: 0,
        });

        this.anims.create({
          key: "hurt",
          frames: this.anims.generateFrameNumbers(AssetsKeys.SOLDIER_HURT, {
            start: 0,
            end: 3,
          }),
          frameRate: 12,
          repeat: 0,
        });

        // 슬라임 애니메이션 생성
        this.anims.create({
          key: "slime-idle",
          frames: this.anims.generateFrameNumbers(AssetsKeys.SLIME_IDLE, {
            start: 0,
            end: 5,
          }),
          frameRate: 12,
          repeat: -1,
        });

        this.anims.create({
          key: "slime-attack",
          frames: this.anims.generateFrameNumbers(AssetsKeys.SLIME_ATTACK, {
            start: 0,
            end: 6,
          }),
          frameRate: 12,
          repeat: 0,
        });

        this.anims.create({
          key: "slime-hurt",
          frames: this.anims.generateFrameNumbers(AssetsKeys.SLIME_HURT, {
            start: 0,
            end: 3,
          }),
          frameRate: 12,
          repeat: 0,
        });

        this.soldier = this.add.sprite(50, 75, AssetsKeys.SOLDIER_IDLE);
        this.soldier.play("idle");

        // 1초 뒤에 walk 애니메이션으로 변경
        this.time.delayedCall(1000, () => {
          this.gameState = GameState.TRAVELING;
          this.soldier.play("walk");
          this.startRandomEncounter();
        });
      }

      // HP 업데이트 함수 수정
      private updateHP() {
        this.soldierHPText.setText(`HP: ${this.soldierHP}`);
      }

      startRandomEncounter() {
        const randomTime = Phaser.Math.Between(5000, 10000);
        this.time.delayedCall(randomTime, () => {
          if (this.gameState === GameState.TRAVELING) {
            this.startBattle();
          }
        });
      }

      startBattle() {
        this.gameState = GameState.ENCOUNTER;
        this.soldier.play("idle");

        // 슬라임 생성 (HP 텍스트 없이)
        this.slime = this.add.sprite(100, 75, AssetsKeys.SLIME_IDLE);
        this.slime.setFlipX(true);
        this.slime.play("slime-idle");

        // 전투 타이머 시작
        this.battleTimer = this.time.addEvent({
          delay: 1000,
          callback: this.executeAttack,
          callbackScope: this,
          loop: true,
        });
      }

      executeAttack() {
        if (this.gameState !== GameState.ENCOUNTER) {
          this.battleTimer.destroy();
          return;
        }

        // 객체가 존재하는지 확인
        if (!this.soldier || !this.slime) {
          this.battleTimer.destroy();
          return;
        }

        if (this.currentAttacker === "soldier") {
          // 병사 공격
          this.soldier.play("attack");
          this.soldier.once("animationcomplete", () => {
            if (this.soldier) {
              this.soldier.play("idle");
            }
          });

          this.time.delayedCall(500, () => {
            if (!this.slime) return;

            this.slime.play("slime-hurt");
            this.slime.once("animationcomplete", () => {
              if (this.slime) {
                this.slime.play("slime-idle");
              }
            });
            const damage = Phaser.Math.Between(30, 50);
            this.slimeHP -= damage;
            this.updateHP();
            this.checkBattleEnd();
          });
        } else {
          // 슬라임 공격
          this.slime.play("slime-attack");
          this.slime.once("animationcomplete", () => {
            if (this.slime) {
              this.slime.play("slime-idle");
            }
          });

          this.time.delayedCall(500, () => {
            if (!this.soldier) return;

            this.soldier.play("hurt");
            this.soldier.once("animationcomplete", () => {
              if (this.soldier) {
                this.soldier.play("idle");
              }
            });
            const damage = Phaser.Math.Between(10, 20);
            this.soldierHP -= damage;
            this.updateHP();
            this.checkBattleEnd();
          });
        }

        // 다음 공격자 변경
        this.currentAttacker =
          this.currentAttacker === "soldier" ? "slime" : "soldier";
      }

      checkBattleEnd() {
        if (this.soldierHP <= 0 || this.slimeHP <= 0) {
          // 먼저 타이머와 상태 변경
          this.battleTimer.destroy();
          this.gameState = GameState.WAREND;

          // 병사 상태 변경
          if (this.soldier) {
            this.soldier.play("walk");
          }
          this.gameState = GameState.TRAVELING;

          // 슬라임과 관련된 모든 애니메이션 중지
          if (this.slime) {
            this.slime.stop();
            this.slime.setVisible(false);
            this.slime.setActive(false);
          }

          // 다음 프레임에서 슬라임 제거
          this.time.delayedCall(0, () => {
            if (this.slime) {
              this.slime.destroy();
            }

            // HP 초기화
            this.soldierHP = 100;
            this.slimeHP = 100;
            this.updateHP();

            // 새로운 인카운터 시작
            this.startRandomEncounter();
          });
        }
      }

      // ============================
      // 🧩 update()
      // ============================
      update() {
        if (this.gameState === GameState.TRAVELING) {
          this.background.tilePositionX += 1;
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
