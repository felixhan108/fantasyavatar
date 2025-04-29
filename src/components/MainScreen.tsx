'use client';

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

// Assets
import { Characters } from '@/assets/Characters';
import { Monsters } from '@/assets/Monsters';

// Zustand
import { useGameStore } from '@/store/gameStore';

// Utils
import _ from 'lodash';
import { rollDice } from '@/utils/rollDice';

// Types
import {
  CharacterStatusType,
  CharacterAssetType,
  MonsterAssetType,
  MonsterStatusType,
} from '@/types/AssetsType';
import { GameState } from '@/constant/GameState';
import { CharacterController } from '@/controller/CharacterController';
import { MonsterController } from '@/controller/MonsterController';
import { BattleFlowManager } from '@/controller/BattleFlowManager';

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const [CharacterInfo, setCharacterInfo] = useState<CharacterStatusType | null>(null);
  const [MonsterInfo, setMonsterInfo] = useState<MonsterStatusType | null>(null);
  const [DiceResult, setDiceResult] = useState<number>(0);

  useEffect(() => {
    setCharacterInfo(useGameStore.getState().characterStatus);
  }, []);

  useEffect(() => {
    class MainScene extends Phaser.Scene {
      background!: Phaser.GameObjects.TileSprite;
      character!: CharacterAssetType;
      characterSprite!: Phaser.GameObjects.Sprite;
      monster!: MonsterAssetType;
      monsterSprite!: Phaser.GameObjects.Sprite;
      characterController!: CharacterController;
      monsterController!: MonsterController;
      battleFlowManager!: BattleFlowManager;

      constructor() {
        super('MainScene');
      }

      preload() {
        this.load.image('BACKGROUND', '/assets/bg/forest.png'); // 배경 이미지 로드
        _.forEach(Characters, (character) => {
          character.preload(this);
        });
        _.forEach(Monsters, (monster) => {
          monster.preload(this);
        });
      }

      create() {
        // 백그라운드 이미지 생성
        this.background = this.add.tileSprite(0, 0, 480, 160, 'BACKGROUND').setOrigin(0, 0);
        _.forEach(Characters, (character) => {
          character.createAnims(this);
        });
        _.forEach(Monsters, (monster) => {
          monster.createAnims(this);
        });

        // 캐릭터 Sprite 생성
        this.character = Characters[useGameStore.getState().characterJob];
        this.characterSprite = this.character.createSprite(this);
        this.characterSprite.play(this.character.idleAnim);

        this.characterController = new CharacterController(
          this,
          this.characterSprite,
          this.character
        );

        this.startIntro();
      }

      async startIntro() {
        console.log('🎬 Intro 시작');
        await this.characterController.walk(60, 2000);
        await this.delay(300);
        this.startTraveling();
      }

      async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      startTraveling() {
        console.log('🌍 Traveling 시작');
        useGameStore.getState().setIsBackgroundMoving(true);
        this.characterController.walk(60, 2000);
        this.time.delayedCall(Phaser.Math.Between(2000, 5000), async () => {
          console.log('🎯 Encounter 발생');
          await this.startEncounter();
        });
      }

      async startEncounter() {
        useGameStore.getState().setIsBackgroundMoving(true);
        this.characterController.walk(60, 2000);

        const monsterType = rollDice(1, 10) <= 7 ? 'SLIME' : 'SKELETON';
        console.log('🎲 주사위 결과', rollDice(1, 10), monsterType);
        useGameStore.getState().setMonsterType(monsterType);

        const monster = Monsters[monsterType as keyof typeof Monsters];
        const monsterSprite = monster.createSprite(this);
        // monsterSprite.x = 480; // 화면 밖에서 등장

        this.monsterController = new MonsterController(this, monsterSprite, monster);

        await this.monsterController.walk(100, 2000); // 몬스터 등장 걷기
        useGameStore.getState().setIsBackgroundMoving(false);
        await this.delay(300);

        this.startBattle();
      }

      startBattle() {
        console.log('⚔️ Battle 시작');

        this.battleFlowManager = new BattleFlowManager(
          this,
          this.characterController,
          this.monsterController
        );
        this.battleFlowManager.startBattleLoop();
      }

      update() {
        if (useGameStore.getState().isBackgroundMoving) {
          this.background.tilePositionX += 0.5;
        }
      }

      public goToState(STATE: GameState) {
        console.log('👣 상태변경', STATE);
        useGameStore.getState().setGameState(STATE);
        this.handleState();
      }

      public handleState() {
        switch (useGameStore.getState().gameState) {
          case GameState.INTRO:
            console.log('👉 INTRO');
            this.startIntro();
            break;
          case GameState.TRAVELING:
            console.log('👉 TRAVELING');
            this.startTraveling();
            break;
          case GameState.ENCOUNTER:
            console.log('👉 ENCOUNTER');
            this.startEncounter();
            break;
          case GameState.BATTLE:
            console.log('👉 BATTLE');
            this.startBattle();
            break;
          case GameState.RESULT:
            console.log('👉 RESULT');
            this.startResult();
            break;
          case GameState.GAMEOVER:
            console.log('👉 GAMEOVER');
            this.startGameOver();
            break;
        }
      }

      // public startBattle() {
      //   this.monster = Monsters[useGameStore.getState().monsterType as keyof typeof Monsters];
      //   this.monsterSprite = this.monster.createSprite(this);
      //   this.monsterSprite.play(this.monster.walkAnim);
      //   this.tweens.add({
      //     targets: this.monsterSprite,
      //     x: 100,
      //     duration: 2000,
      //     ease: 'Linear',
      //     onComplete: () => {
      //       useGameStore.getState().setIsBackgroundMoving(false);
      //       useGameStore.getState().setMonsterStatus({ ...this.monster.status });
      //       setMonsterInfo(useGameStore.getState().monsterStatus);

      //       console.log('👹 몬스터 등장!');

      //       // 치고받기
      //       this.time.addEvent({
      //         delay: 1000,
      //         loop: true,
      //         callback: () => {
      //           const diceResult = rollDice(1, 10);
      //           setDiceResult(diceResult);

      //           if (diceResult <= 7) {
      //             // Motion
      //             this.characterSprite.play(this.character.attackAnim);
      //             this.characterSprite.once('animationcomplete', () => {
      //               this.characterSprite.play(this.character.idleAnim);
      //             });
      //             this.time.delayedCall(300, () => {
      //               this.monsterSprite.play(this.monster.hurtAnim);
      //               this.monsterSprite.once('animationcomplete', () => {
      //                 this.monsterSprite.play(this.monster.idleAnim);
      //               });
      //             });
      //             // HP 감소
      //             const MonsterStatus = useGameStore.getState().monsterStatus;
      //             const characterStatus = useGameStore.getState().characterStatus;
      //             if (MonsterStatus) {
      //               if (characterStatus) {
      //                 MonsterStatus.hp -= characterStatus.attack;
      //               }
      //               if (MonsterStatus.hp <= 0) {
      //                 console.log('👹 몬스터 사망!');
      //                 this.time.delayedCall(1000, () => {
      //                   this.characterSprite.play(this.character.idleAnim);
      //                   this.monsterSprite.play(this.monster.deadAnim);
      //                   this.time.delayedCall(700, () => {
      //                     this.monsterSprite.destroy();
      //                     this.goToState(GameState.RESULT);
      //                     this.time.removeAllEvents();
      //                   });
      //                 });
      //               }
      //             }
      //           } else {
      //             this.monsterSprite.play(this.monster.attackAnim);
      //             this.monsterSprite.once('animationcomplete', () => {
      //               this.monsterSprite.play(this.monster.idleAnim);
      //             });
      //             this.time.delayedCall(300, () => {
      //               this.characterSprite.play(this.character.hurtAnim);

      //               this.characterSprite.once('animationcomplete', () => {
      //                 // HP 감소
      //                 const MonsterStatus = useGameStore.getState().monsterStatus;
      //                 const characterStatus = useGameStore.getState().characterStatus;
      //                 if (characterStatus && MonsterStatus) {
      //                   characterStatus.hp -= MonsterStatus.attack;
      //                   if (characterStatus.hp <= 0) {
      //                     this.characterSprite.play(this.character.deadAnim);

      //                     this.characterSprite.once('animationcomplete', () => {
      //                       this.goToState(GameState.GAMEOVER);
      //                       this.time.removeAllEvents();
      //                     });
      //                   } else {
      //                     this.characterSprite.play(this.character.idleAnim);
      //                   }
      //                 }
      //               });
      //             });
      //           }
      //         },
      //       });
      //     },
      //   });
      // }

      public startResult() {
        useGameStore.getState().setIsBackgroundMoving(false);
        this.goToState(GameState.TRAVELING);
      }

      public startGameOver() {
        // this.add.tween({
        //   targets: this.monsterSprite,
        //   x: 180,
        //   duration: 2000,
        //   ease: 'Linear',
        //   onComplete: () => {
        //     this.characterSprite.destroy();
        //     this.goToState(GameState.GAMEOVER);
        //   },
        // })
        // 몬스터 삭제
        // this.characterSprite.destroy();
        // this.monsterSprite.destroy();
        // this.time.delayedCall(1000, () => {
        //   this.time.removeAllEvents();
        //   this.goToState(GameState.INTRO);
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
      <div>🎲 {DiceResult}</div>
      <div ref={phaserRef}></div>
      <div className="w-full flex justify-between">
        <div>
          <p>Level : {CharacterInfo?.level}</p>
          <p>HP : {CharacterInfo?.hp}</p>
          <p>Attack : {CharacterInfo?.attack}</p>
          <p>Defense : {CharacterInfo?.defense}</p>
          <p>Exp : {CharacterInfo?.exp}</p>
          <p>Gold : {CharacterInfo?.gold}</p>
        </div>
        <div className="text-right">
          <p>HP : {MonsterInfo?.hp}</p>
          <p>Attack : {MonsterInfo?.attack}</p>
          <p>Defense : {MonsterInfo?.defense}</p>
        </div>
      </div>
    </>
  );
}
