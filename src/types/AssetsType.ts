export interface CommonUnitType {
  key: string;
  preload: (scene: Phaser.Scene) => void;
  createAnims: (scene: Phaser.Scene) => void;
  createSprite: (scene: Phaser.Scene) => Phaser.GameObjects.Sprite;
  idleAnim: string;
  walkAnim: string;
  attackAnim: string;
  hurtAnim: string;
  deadAnim: string;
}
export interface CharacterAssetType extends CommonUnitType {
  status: CharacterStatusType;
}
export interface MonsterAssetType extends CommonUnitType {
  status: MonsterStatusType;
}

export interface CharacterStatusType {
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  exp: number;
  gold: number;
  weapon: WeaponType;
}

export interface MonsterStatusType {
  hp: number;
  maxHP: number;
  attack: number;
  defense: number;
  exp: number;
  gold: number;
}

export type WeaponType = {
  name: string;
  bonusAttack: number;
  description: string;
  type: string;
};
