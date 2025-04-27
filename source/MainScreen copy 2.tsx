'use client';

import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

import { Character } from '@/assets/Characters';
import { Monsters } from '@/assets/Monsters';

import { useGameStore } from '@/store/gameStore';

import FlowManager, { FlowManager as FlowManagerType } from '@/Flow/FlowManager';
// import BattleManager from '@/Battle/BattleManager';

import { CustomScene } from '@/types/CustomScene';

export default function MainScreen() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const character = useGameStore.getState().character;

  useEffect(() => {
    class MainScene extends Phaser.Scene {
      background!: Phaser.GameObjects.TileSprite;
      characterSprite!: Phaser.GameObjects.Sprite;
      flowManager!: FlowManagerType;
      constructor() {
        super('MainScene');
      }

      preload() {
        this.load.image('BACKGROUND', '/assets/bg/forest.png'); // 배경 이미지 로드
        const scene = this as unknown as CustomScene; // 안전 복사
        Object.values(Character).forEach((character) => character.preload(scene)); // 모든 캐릭터 로드
        Object.values(Monsters).forEach((monster) => monster.preload(scene)); // 모든 몬스터 로드
      }

      create() {
        // 백그라운드 이미지 생성
        this.background = this.add.tileSprite(0, 0, 480, 160, 'BACKGROUND').setOrigin(0, 0);
        console.log('👣 INTRO > 백그라운드 이미지 생성');
        const scene = this as unknown as CustomScene; // 안전 복사
        Object.values(Character).forEach((character) => character.createAnims(scene));
        Object.values(Monsters).forEach((monster) => monster.createAnims(scene));

        // 캐릭터 Sprite 생성
        // ⭐️ 생성을 안하고 스토어에 바로 잡아 넣어서 생성되기 전 명령어만 들어가는 참사가 일어남
        if (character) {
          this.characterSprite = character.createSprite(scene) as Phaser.GameObjects.Sprite;
        }
        // 생성 후 스토어에 저장
        useGameStore.getState().setCharacterSprite(this.characterSprite);
        if (character) {
          this.characterSprite.play(character.idleAnim);
        }
        console.log('👣 INTRO > 캐릭터 IDLE');

        // 👣 INTRO
        this.tweens.add({
          targets: this.characterSprite,
          x: 60,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            console.log('👣 INTRO > 캐릭터 WALK');
            if (character) {
              this.characterSprite.play(character.idleAnim);
              this.characterSprite.play(character.walkAnim);
            }
            this.flowManager.goToTraveling();
          },
        });

        console.log('FlowManager 셋팅');
        this.flowManager = new FlowManager(this as unknown as CustomScene);
        // this.battleManager = new BattleManager(this);
      }

      update(time: number, delta: number) {
        this.flowManager.update(delta);
        // // BATTLE 상태일 경우 BattleManage로 위임
        // if (this.flowManager.getCurrentState() === GameState.BATTLE) {
        //   this.battleManager.update(delta);
        // }
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
