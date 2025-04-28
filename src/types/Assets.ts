import { Characters } from "@/assets/Characters";


export type CharacterType {
  key: string;
  status: CharacterStatusType,
  preload: (typeof Characters)[keyof typeof Characters]; //

}

export interface CharacterStatusType {
  key: string;
  level: number;
  name: string;
  hp: number;
  maxHP: number;
  attack: number;
  defense: number;
  exp: number;
  gold: number;
  weapon: WeaponType;
}

export interface ConsterStatusType {
  name: string;
  level: number;
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
