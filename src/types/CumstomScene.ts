import { GameState } from '@/store/gameStore';
import Phaser from 'phaser';

export interface CustomScene extends Phaser.Scene {
  // 캐릭터
  soldier: Phaser.GameObjects.Sprite;
  slime?: Phaser.GameObjects.Sprite | undefined;
  encounterStarted: boolean;
  // 전투 상태
  battleTimer?: Phaser.Time.TimerEvent;
  executeAttack?: () => void;

  // 배경 등 필요 시 추가 가능
  background: Phaser.GameObjects.TileSprite;

  setGameState: (state: GameState) => void;
}
