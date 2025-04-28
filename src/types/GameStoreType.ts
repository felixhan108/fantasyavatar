import { CharacterAssetType, CharacterStatusType, MonsterStatusType } from './AssetsType';
import { GameState } from '../constant/GameState';

export interface GameStoreType {
  gameState: GameState;
  setGameState: (state: GameState) => void;

  characterJob: string | null;
  setCharacterJob: (job: string) => void;
  characterAssets: CharacterAssetType | null;
  setCharacterAssets: (assets: CharacterAssetType) => void;
  characterSprite: Phaser.GameObjects.Sprite | null;
  setCharacterSprite: (sprite: Phaser.GameObjects.Sprite) => void;
  monsterType: string | null;
  setMonsterType: (type: string) => void;
  stopBattle: boolean;
  setStopBattle: (stop: boolean) => void;
  isBackgroundMoving: boolean;
  setIsBackgroundMoving: (moving: boolean) => void;
  characterStatus: CharacterStatusType | null;
  setCharacterStatus: () => void;
  monsterStatus: MonsterStatusType | null;
  setMonsterStatus: (status:MonsterStatusType) => void;
}
