import { GameState } from "@/store/gameStore";
import Phaser from "phaser";

export interface CustomScene extends Phaser.Scene {
  // 캐릭터
  soldier: Phaser.GameObjects.Sprite;

  encounterStarted: boolean;
  // 전투 상태
  battleTimer?: Phaser.Time.TimerEvent;
  executeAttack?: () => void;

  // 배경 등 필요 시 추가 가능
  background: Phaser.GameObjects.TileSprite;

  setGameState: (state: GameState) => void;

  // ----------------------------
  // 애니메이션 모듈화
  // scene 내에서 생성해야하는 애니매이션 들의 type을 정의 해둠.
  // ----------------------------

  preload: (scene: Phaser.Scene) => void;
  createAnims: (scene: Phaser.Scene) => void;
  createSprite: (scene: Phaser.Scene) => Phaser.GameObjects.Sprite;
  idleAnim: string;
  walkAnim: string;
  attackAnim: string;
  hurtAnim: string;
  deadAnim: string;
}
