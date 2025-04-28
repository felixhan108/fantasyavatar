import { useGameStore } from '@/store/gameStore';
import { CharacterController } from './CharacterController';
import { MonsterController } from './MonsterController';

export class BattleFlowManager {
  turn: 'PLAYER' | 'MONSTER' = 'PLAYER';
  isBattleOver = false;

  constructor(
    private scene: Phaser.Scene,
    private character: CharacterController,
    private monster: MonsterController
  ) {}

  async startBattleLoop() {
    while (!this.isBattleOver) {
      if (this.turn === 'PLAYER') {
        await this.playerTurn();
      } else {
        await this.monsterTurn();
      }
      await this.delay(500);
    }
  }

  private async playerTurn() {
    console.log('👊 플레이어 공격');
    await this.character.attack();
    await this.monster.hurt();

    const monsterStatus = useGameStore.getState().monsterStatus;
    const characterStatus = useGameStore.getState().characterStatus;
    if (monsterStatus && characterStatus) {
      monsterStatus.hp -= characterStatus.attack;
      if (monsterStatus.hp <= 0) {
        console.log('👹 몬스터 사망');
        await this.monster.dead();
        this.isBattleOver = true;
        this.scene.scene.start('ResultScene'); // 결과 씬 이동
        return;
      }
    }

    this.turn = 'MONSTER';
  }

  private async monsterTurn() {
    console.log('👹 몬스터 공격');
    await this.monster.attack();
    await this.character.hurt();

    const monsterStatus = useGameStore.getState().monsterStatus;
    const characterStatus = useGameStore.getState().characterStatus;
    if (monsterStatus && characterStatus) {
      characterStatus.hp -= monsterStatus.attack;
      if (characterStatus.hp <= 0) {
        console.log('💀 플레이어 사망');
        await this.character.dead();
        this.isBattleOver = true;
        this.scene.scene.start('GameOverScene'); // 게임오버 씬 이동
        return;
      }
    }

    this.turn = 'PLAYER';
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
