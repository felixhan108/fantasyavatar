'use client';

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

import { Characters, CharacterStatus } from '@/assets/Characters';
import { Monsters } from '@/assets/Monsters';

import { useGameStore, GameState } from '@/store/gameStore';

// Utils
import { rollDice } from '@/utils/rollDice';

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const [CharacterInfo, setCharacterInfo] = useState<CharacterStatus | null>(null);
  const [DiceResult, setDiceResult] = useState<number>(0);

  useEffect(() => {
    setCharacterInfo(useGameStore.getState().characterStatus);
  }, []);

  useEffect(() => {
    class MainScene extends Phaser.Scene {
      background!: Phaser.GameObjects.TileSprite;
      character!: (typeof Characters)[keyof typeof Characters];
      Monsters!: (typeof Monsters)[keyof typeof Monsters];
      characterSprite!: Phaser.GameObjects.Sprite;

      constructor() {
        super('MainScene');
      }

      preload() {
        this.load.image('BACKGROUND', '/assets/bg/forest.png'); // 배경 이미지 로드
        Object.values(Characters).forEach((character) => character.preload(this)); // 모든 캐릭터 로드
        Object.values(Monsters).forEach((monster) => monster.preload(this)); // 모든 몬스터 로드
      }

      create() {
        // 백그라운드 이미지 생성
        this.background = this.add.tileSprite(0, 0, 480, 160, 'BACKGROUND').setOrigin(0, 0);
        Object.values(Characters).forEach((character) => character.createAnims(this));
        Object.values(Monsters).forEach((monster) => monster.createAnims(this));

        this.character = useGameStore.getState()
          .character as (typeof Characters)[keyof typeof Characters];

        // 캐릭터 Sprite 생성
        // ⭐️ 생성을 안하고 스토어에 바로 잡아 넣어서 생성되기 전 명령어만 들어가는 참사가 일어남

        if (this.character) {
          console.log('👣 캐릭터 스프라이트 생성');
          this.characterSprite = this.character.createSprite(this) as Phaser.GameObjects.Sprite;
          useGameStore.getState().setCharacterSprite(this.characterSprite);
          this.characterSprite.play(this.character.idleAnim);
        }

        // 👣 Roop START
        this.goToState('INTRO');
      }

      update() {
        if (useGameStore.getState().isBackgroundMoving) {
          this.background.tilePositionX += 0.5;
        }
      }

      public goToState(STATE: string) {
        console.log('👣 상태변경', STATE);
        useGameStore.getState().setGameState(STATE as GameState);
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
        }
      }

      public startIntro() {
        this.tweens.add({
          targets: this.characterSprite,
          x: 60,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            this.goToState('TRAVELING');
          },
        });
      }

      public startTraveling() {
        useGameStore.getState().setIsBackgroundMoving(true);
        this.time.delayedCall(rollDice(2000, 5000), () => {
          console.log('🎲 만난시간', rollDice(2000, 5000));
          this.goToState('ENCOUNTER');
        });
      }

      public startEncounter() {
        useGameStore.getState().setIsBackgroundMoving(true);
        const monsterType = rollDice(1, 10) <= 7 ? 'SLIME' : 'SKELETON';
        console.log('🎲 주사위 결과', rollDice(1, 10));
        console.log('👹 몬스터 타입', monsterType);
        useGameStore.getState().setMonsterType(monsterType);
        this.goToState('BATTLE');
      }

      public startBattle() {
        const Monster = Monsters[useGameStore.getState().monsterType as keyof typeof Monsters];
        const MonsterSprite = Monster.createSprite(this);
        MonsterSprite.play(Monster.walkAnim);
        this.tweens.add({
          targets: MonsterSprite,
          x: 100,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            useGameStore.getState().setIsBackgroundMoving(false);
            console.log('👹 몬스터 등장!');

            // 치고받기
            this.time.addEvent({
              delay: 1000,
              loop: true,
              callback: () => {
                const diceResult = rollDice(1, 10);
                setDiceResult(diceResult);

                console.log('🎲 주사위 결과 :', diceResult);
                if (diceResult <= 7) {
                  this.characterSprite.play(this.character.attackAnim);
                  this.characterSprite.once('animationcomplete', () => {
                    this.characterSprite.play(this.character.idleAnim);
                  });
                  this.time.delayedCall(300, () => {
                    MonsterSprite.play(Monster.hurtAnim);
                    MonsterSprite.once('animationcomplete', () => {
                      MonsterSprite.play(Monster.idleAnim);
                    });
                  });
                } else {
                  MonsterSprite.play(Monster.attackAnim);
                  MonsterSprite.once('animationcomplete', () => {
                    MonsterSprite.play(Monster.idleAnim);
                  });
                  this.time.delayedCall(300, () => {
                    this.characterSprite.play(this.character.hurtAnim);
                    this.characterSprite.once('animationcomplete', () => {
                      this.characterSprite.play(this.character.idleAnim);
                    });
                  });
                }
              },
            });
          },
        });
      }

      public startResult() {
        useGameStore.getState().setIsBackgroundMoving(false);
        this.goToState('TRAVELING');
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
      <div ref={phaserRef} />
      <div>
        <p>Level : {CharacterInfo?.level}</p>
        <p>HP : {CharacterInfo?.hp}</p>
        <p>Attack : {CharacterInfo?.attack}</p>
        <p>Defense : {CharacterInfo?.defense}</p>
        <p>Exp : {CharacterInfo?.exp}</p>
        <p>Gold : {CharacterInfo?.gold}</p>
        <p>Weapon : {CharacterInfo?.weapon.name}</p>
        <p>- Attack : {CharacterInfo?.weapon.bonusAttack}</p>
        <p>- Description : {CharacterInfo?.weapon.description}</p>
        <p>- Type : {CharacterInfo?.weapon.type}</p>
      </div>
    </>
  );
}
