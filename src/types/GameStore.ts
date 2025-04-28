import { GameState } from './GameState';

export interface GameStore {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  characterJob: string | null;
  setCharacterJob: (job: string) => void;
  character: (typeof Characters)[keyof typeof Characters] | null;
  setCharacter: () => void;
  characterSprite: Phaser.GameObjects.TileSprite | null;
  setCharacterSprite: (sprite: Phaser.GameObjects.TileSprite) => void;
  monsterType: string | null;
  setMonsterType: (type: string) => void;
  stopBattle: boolean;
  setStopBattle: (stop: boolean) => void;
  isBackgroundMoving: boolean;
  setIsBackgroundMoving: (moving: boolean) => void;
  characterStatus: characterStatusType | null;
  setCharacterStatus: (character: characterStatusType) => void;
  currentMonsterStatus: monsterStatusType;
  setCurrentMonsterStatus: (status: monsterStatusType) => void;
  setMonsterStatus: (monsterStatus: monsterStatusType, hp: number) => void;
  clearMonster: () => void;
}
