"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Soldier } from "@/Characters/Soldiser";
import { Slime } from "@/Characters/Slime";
enum GameState {
  TRAVELING,
  ENCOUNTER,
  WAREND,
}

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
        this.load.image("BACKGROUND", "/assets/bg/forest.png");

        // 병사 스프라이트 로드
        Soldier.LoadSpritesheet(this);

        // 슬라임 스프라이트 로드
        Slime.LoadSpritesheet(this);
      }

      // ============================
      // 🧩 create()
      // startRandomEncounter()
      // ============================
      create() {
        this.gameState = GameState.ENCOUNTER;

        this.background = this.add
          .tileSprite(0, 0, 480, 160, "BACKGROUND")
          .setOrigin(0, 0);

        // 병사 HP 텍스트만 생성
        this.soldierHPText = this.add.text(5, 5, `HP: ${this.soldierHP}`, {
          fontSize: "10px",
          color: "#ffffff",
        });

        // 병사 애니메이션 생성
        Soldier.CreateCharacter(this);

        // 슬라임 애니메이션 생성
        Slime.CreateCharacter(this);

        // 병사 좌표 설정
        this.soldier = Soldier.AddSprite(this);

        // 1초 뒤에 walk 애니메이션으로 변경
        this.time.delayedCall(1000, () => {
          this.gameState = GameState.TRAVELING;
          Soldier.Play().walk();
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
        Soldier.Play().idle();
        console.log("startBattle");

        // 슬라임 생성 (HP 텍스트 없이)
        this.slime = Slime.AddSprite(this);
        this.slime.setFlipX(true);
        Slime.Play().idle();
        console.log("slime added");

        // 전투 타이머 시작
        this.battleTimer = this.time.addEvent({
          delay: 1000,
          callback: this.executeAttack,
          callbackScope: this,
          loop: true,
        });
        console.log("battleTimer added");
      }

      executeAttack() {
        console.log("executeAttack");
        if (this.gameState !== GameState.ENCOUNTER) {
          console.log("gameState not encounter");
          this.battleTimer.destroy();
          return;
        }

        if (!this.soldier || !this.slime) {
          console.log("soldier or slime not found");
          this.battleTimer.destroy();
          this.gameState = GameState.TRAVELING;
          Soldier.Play().walk();
          return;
        }

        if (this.currentAttacker === "soldier") {
          console.log("soldier attack start");
          // 병사 공격
          Soldier.Play().attack();
          this.soldier.once("animationcomplete", () => {
            if (this.soldier) {
              Soldier.Play().idle();
            }
          });

          this.time.delayedCall(500, () => {
            if (!this.slime) return;

            Slime.Play().hurt();
            this.slime.once("animationcomplete", () => {
              if (this.slime) {
                Slime.Play().idle();
              }
            });
            const damage = Phaser.Math.Between(30, 50);
            this.slimeHP -= damage;
            this.updateHP();
            this.checkBattleEnd();
          });
        } else {
          console.log("slime attack start");
          // 슬라임 공격
          Slime.Play().attack();
          this.slime.once("animationcomplete", () => {
            if (this.slime) {
              Slime.Play().idle();
            }
          });

          this.time.delayedCall(500, () => {
            if (!this.soldier) return;

            Soldier.Play().hurt();
            this.soldier.once("animationcomplete", () => {
              if (this.soldier) {
                Soldier.Play().idle();
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
        console.log("checkBattleEnd");
        if (this.soldierHP <= 0 || this.slimeHP <= 0) {
          // 먼저 타이머와 상태 변경
          this.battleTimer.destroy();
          this.gameState = GameState.WAREND;

          // 병사 상태 변경
          if (this.soldier) {
            Soldier.Play().walk();
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
