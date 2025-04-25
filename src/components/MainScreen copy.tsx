"use client";

import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Soldier } from "@/Characters/Soldiser";
import { Slime } from "@/Characters/Slime";
import RandomEncounter from "@/Battle/RandomEncounter";
import { useGameStore, GameState } from "@/store/gameStore";
import { useCharacterStatus } from "@/store/CharacterState";
import { useBackgroundState } from "@/store/backgroundState";

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const [soldiserinfo, setSoldiserinfo] = useState<Object>({});
  useEffect(() => {
    class MainScene extends Phaser.Scene {
      constructor() {
        super("MainScene");
      }

      preload() {
        this.load.image("BACKGROUND", "/assets/bg/forest.png");
        Soldier.LoadSpritesheet(this);
        Slime.LoadSpritesheet(this);
      }

      create() {
        useGameStore.setState({ gameState: GameState.INTRO });

        useBackgroundState.setState({
          background: this.add
            .tileSprite(0, 0, 480, 160, "BACKGROUND")
            .setOrigin(0, 0),
        });

        Soldier.CreateAnimsCharacter(this);

        this.soldier = Soldier.AddSprite(this);
        setSoldiserinfo(this.soldier);
        Soldier.Play().walk();
        this.tweens.add({
          targets: this.soldier,
          x: 50, // 도착 지점
          duration: 1500, // 1초에 도착
          ease: "Linear", // 가속 곡선
          onComplete: () => {
            useGameStore.setState({ gameState: GameState.TRAVELING });
            Soldier.Play().walk();

            RandomEncounter(this);
          },
        });
      }

      executeAttack() {
        console.log("executeAttack");
        if (useGameStore.getState().gameState !== GameState.ENCOUNTER) {
          console.log("gameState not encounter");
          this.battleTimer.destroy();
          return;
        }

        if (!this.soldier || !this.slime) {
          console.log("soldier or slime not found");
          this.battleTimer.destroy();
          useGameStore.setState({ gameState: GameState.TRAVELING });
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

      update() {
        if (useGameStore.getState().gameState === GameState.TRAVELING) {
          this.background.tilePositionX += 1;
        }

        if (useGameStore.getState().gameState === GameState.ENCOUNTER) {
          this.background.tilePositionX = 0;
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
      <div ref={phaserRef} />

      <div>{useCharacterStatus.getState().character}</div>
      <div>
        {JSON.stringify(useBackgroundState.getState().background?.name)}
      </div>
    </>
  );
}
