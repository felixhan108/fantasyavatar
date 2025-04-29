import { CharacterAssetType, CharacterStatusType, MonsterStatusType } from './AssetsType';
import { GameState } from '../constant/GameState';
import { Characters } from '@/assets/Characters';
import { Monsters } from '@/assets/Monsters';

export interface GameStoreType {
  gameState: GameState;
  setGameState: (state: GameState) => void;

  characterJob: keyof typeof Characters | 'SOLDIER';
  setCharacterJob: (job: keyof typeof Characters) => void;
  characterAssets: CharacterAssetType | null;
  setCharacterAssets: (assets: CharacterAssetType) => void;
  characterSprite: Phaser.GameObjects.Sprite | null;
  setCharacterSprite: (sprite: Phaser.GameObjects.Sprite) => void;
  monsterType: keyof typeof Monsters | null;
  setMonsterType: (type: keyof typeof Monsters) => void;
  stopBattle: boolean;
  setStopBattle: (stop: boolean) => void;
  isBackgroundMoving: boolean;
  setIsBackgroundMoving: (moving: boolean) => void;
  characterStatus: CharacterStatusType | null;
  setCharacterStatus: () => void;
  monsterStatus: MonsterStatusType | null;
  setMonsterStatus: (status: MonsterStatusType) => void;
}
