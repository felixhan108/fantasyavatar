'use client';

import * as Phaser from 'phaser';
import { useRef, useEffect } from 'react';
import _ from 'lodash';

// Assets
import { Characters } from '@/assets/Characters';
import { Monsters } from '@/assets/Monsters';

// Zustand
import { useGameStore } from '@/store/gameStore';

// Types
import { CharacterAssetType, MonsterAssetType } from '@/types/AssetsType';
import { GameState } from '@/constant/GameState';
import { useUserStore } from '@/store/userStore';

export default function Game() {
  const phaserRef = useRef<HTMLDivElement>(null);
  const jobData = useUserStore((state) => state.jobData);
  // const fullStory = useUserStore((state) => state.storyData);

  useEffect(() => {
    class TownScene extends Phaser.Scene {
      background!: Phaser.GameObjects.TileSprite;
      character!: CharacterAssetType;
      characterSprite!: Phaser.GameObjects.Sprite;
      monster!: MonsterAssetType;
      monsterSprite!: Phaser.GameObjects.Sprite;

      constructor() {
        super('TownScene');
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

        this.character = Characters[jobData as keyof typeof Characters];
        this.characterSprite = this.character.createSprite(this);
        this.characterSprite.play(this.character.idleAnim);

        // 👣 Roop START
        this.goToState(GameState.INTRO);
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
          // case GameState.TRAVELING:
          //   console.log('👉 TRAVELING');
          //   this.startTraveling();
          //   break;
          // case GameState.ENCOUNTER:
          //   console.log('👉 ENCOUNTER');
          //   this.startEncounter();
          //   break;
          // case GameState.BATTLE:
          //   console.log('👉 BATTLE');
          //   this.startBattle();
          //   break;
          // case GameState.RESULT:
          //   console.log('👉 RESULT');
          //   this.startResult();
          //   break;
          // case GameState.GAMEOVER:
          //   console.log('👉 GAMEOVER');
          //   this.startGameOver();
          //   break;
        }
      }

      public startIntro() {
        this.characterSprite.play(this.character.walkAnim);

        this.tweens.add({
          targets: this.characterSprite,
          x: 60,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            this.goToState(GameState.TRAVELING);
          },
        });
      }
    }

    const config = {
      type: Phaser.WEBGL,
      width: 16 * 10,
      height: 16 * 10,
      parent: phaserRef.current,
      scene: TownScene,
      pixelArt: true,
      zoom: 2,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [jobData]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <div className="w-full flex justify-center items-center">
            <div ref={phaserRef} />
          </div>
        </div>
      </div>
    </>
  );
}
