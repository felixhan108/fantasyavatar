'use client';

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { CustomScene } from '@/types/CustomScene';
import { GameState, useGameStore } from '@/store/gameStore';

import { Character } from '@/assets/Characters';
import { Monsters } from '@/assets/Monsters';
import RandomEncounter from '@/Battle/RandomMonsterEncounter';
import StartBattle from '@/Battle/StartBattle';

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const gameStore = useGameStore();
  const character = gameStore.character;

  useEffect(() => {
    class MainScene extends Phaser.Scene {
      public background!: Phaser.GameObjects.TileSprite;
      public soldier!: Phaser.GameObjects.Sprite;
      public encounterStarted = false;

      constructor() {
        super('MainScene');
      }

      preload() {
        this.load.image('BACKGROUND', '/assets/bg/forest.png');
        const scene = this as unknown as CustomScene; // 안전 복사
        Object.values(Character).forEach((character) => character.preload(scene));
        Object.values(Monsters).forEach((monster) => monster.preload(scene));
      }

      create() {
        this.background = this.add.tileSprite(0, 0, 480, 160, 'BACKGROUND').setOrigin(0, 0);

        const scene = this as unknown as CustomScene; // 안전 복사
        Object.values(Character).forEach((character) => character.createAnims(scene));
        Object.values(Monsters).forEach((monster) => monster.createAnims(scene));

        // 캐릭터 Sprite 생성
        // ⭐️ 생성을 안하고 스토어에 바로 잡아 넣어서 생성되기 전 명령어만 들어가는 참사가 일어남
        const characterSprite = character.createSprite(scene);
        // 생성 후 스토어에 저장
        gameStore.setCharacterSprite(characterSprite);

        console.log('👣 캐릭터 스프라이트', characterSprite);

        characterSprite.play(character.idleAnim);

        // 👣 INTRO -> TRAVELING -> INCOUNTER
        this.tweens.add({
          targets: characterSprite,
          x: 60,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            characterSprite.play(character.idleAnim);

            this.time.delayedCall(1000, () => {
              console.log('👣 GameState', useGameStore.getState().gameState);
              useGameStore.getState().setGameState(GameState.TRAVELING);
              console.log('👣 GameState', useGameStore.getState().gameState);
              characterSprite.play(character.walkAnim);
            });
          },
        });
      }

      update(time: number, delta: number) {
        switch (useGameStore.getState().gameState) {
          case GameState.TRAVELING:
            this.Treveling(delta);
            break;
          case GameState.INCOUNTER:
            this.Incounter(delta);
            break;
          case GameState.BATTLE:
            this.Battle(delta);
            break;
          case GameState.STANDING:
            this.Standing(delta);
            break;
          case GameState.RESULT:
            this.Result(delta);
            break;
        }
      }

      private encounterStarted = false;
      private stopTraveling = false;

      private Treveling(delta: number) {
        console.log('👣 트레블링');
        // 1. 배경 이동
        this.background.tilePositionX += 0.5 * (delta / 16.67); // (delta/16.67로 보정하면 60FPS 기준 0.5씩 이동)
        // 만약 stopTraveling이 true이면 트렐빙 중지
        // 중지되고 다음 함수 실행!
        if (this.stopTraveling) return;
        this.stopTraveling = true;
        console.log('👣 트레블링 중지');
        RandomEncounter(this, delta);
      }

      private Incounter(delta: number) {
        console.log('👣 인카운트');
      }

      private Battle(delta: number) {
        // 몬스터가 등장해서 delay 2000 동안은 배경을 움직이기
        if (useGameStore.getState().isBackgroundMoving) {
          this.background.tilePositionX += 0.5 * (delta / 16.67);
        }

        console.log('⚔️ BATTLE');
        if (useGameStore.getState().stopBattle) return;
        useGameStore.getState().setStopBattle(true);
        console.log('⚔️ BATTLE 중지');
        StartBattle(this, delta);

        // if (Phaser.Math.Between(0, 1000) < 100) {
        //   useGameStore.getState().setGameState(GameState.RESULT);
        //   console.log("배틀 종료 → 결과화면 이동");
        // }
      }

      private resultHandled = false; // 결과 처리 여부 플래그

      private Result(delta: number) {
        if (this.resultHandled) return; // 이미 처리했으면 더 이상 실행 안 함

        console.log('RESULT');
        this.resultHandled = true; // 결과 처리 플래그 설정
        // 결과 출력 후 다시 걷기
        // this.time.delayedCall(2000, () => {
        //   console.log("결과 출력 완료 → 다시 걷기 시작");

        //   useGameStore.getState().setGameState(GameState.TRAVELING);
        //   this.resultHandled = false; // 결과 처리 플래그 초기화
        // });
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
    </>
  );
}
