export type WeaponType = {
  name: string;
  bonusAttack: number;
  description: string;
  type: string;
};

export const Weapons: { [key: string]: WeaponType } = {
  rustySword: {
    name: 'Rusty Sword',
    bonusAttack: 1,
    description: '녹슨 검. 공격력은 낮지만 싸다.',
    type: 'sword',
  },

  trainingSword: {
    name: 'Training Sword',
    bonusAttack: 2,
    description: '훈련용 목검. 실전에는 부적합.',
    type: 'sword',
  },

  bronzeSword: {
    name: 'Bronze Sword',
    bonusAttack: 3,
    description: '청동으로 만든 검. 약하지만 가볍다.',
    type: 'sword',
  },

  ironSword: {
    name: 'Iron Sword',
    bonusAttack: 5,
    description: '기본 철검. 공격력이 +5 증가합니다.',
    type: 'sword',
  },

  steelSword: {
    name: 'Steel Sword',
    bonusAttack: 7,
    description: '단단한 강철로 제작된 검.',
    type: 'sword',
  },

  knightBlade: {
    name: "Knight's Blade",
    bonusAttack: 10,
    description: '기사단이 사용하는 전투용 검.',
    type: 'sword',
  },

  flameBlade: {
    name: 'Flame Blade',
    bonusAttack: 12,
    description: '불꽃의 힘이 깃든 검. 타는 듯한 상처를 입힌다.',
    type: 'sword',
  },

  cursedSword: {
    name: 'Cursed Sword',
    bonusAttack: 15,
    description: '어둠의 힘을 담고 있으나, 사용자를 서서히 해친다.',
    type: 'sword',
  },

  dragonSlayer: {
    name: 'Dragon Slayer',
    bonusAttack: 18,
    description: '용을 벤 전설의 검. 무겁지만 강력하다.',
    type: 'sword',
  },

  holyExcalibur: {
    name: 'Holy Excalibur',
    bonusAttack: 25,
    description: '빛의 힘이 깃든 전설의 검. 진정한 용사만이 다룰 수 있다.',
    type: 'sword',
  },
};
