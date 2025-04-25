export const CharacterAssets = [
  {
    key: "SOLDIER-IDLE",
    path: "/assets/sprites/Soldier-Idle.png",
    gridSize: { width: 100, height: 100 },
  },
  {
    key: "SOLDIER-WALK",
    path: "/assets/sprites/Soldier-Walk.png",
    gridSize: { width: 100, height: 100 },
  },
  {
    key: "SOLDIER-ATTACK",
    path: "/assets/sprites/Soldier-Attack01.png",
    gridSize: { width: 100, height: 100 },
  },
  {
    key: "SOLDIER-HURT",
    path: "/assets/sprites/Soldier-Hurt.png",
    gridSize: { width: 100, height: 100 },
  },
  {
    key: "SLIME-IDLE",
    path: "/assets/sprites/Slime-Idle.png",
    gridSize: { width: 100, height: 100 },
  },
  {
    key: "SLIME-WALK",
    path: "/assets/sprites/Slime-Walk.png",
    gridSize: { width: 100, height: 100 },
  },
  {
    key: "SLIME-ATTACK",
    path: "/assets/sprites/Slime-Attack01.png",
    gridSize: { width: 100, height: 100 },
  },
  {
    key: "SLIME-HURT",
    path: "/assets/sprites/Slime-Hurt.png",
    gridSize: { width: 100, height: 100 },
  },
];
export const getAsset = (
  key: string
): [string, string, { frameWidth: number; frameHeight: number }] => {
  const asset = CharacterAssets.find((a) => a.key === key);
  if (!asset) throw new Error(`Asset not found: ${key}`);
  return [
    asset.key,
    asset.path,
    { frameWidth: asset.gridSize.width, frameHeight: asset.gridSize.height },
  ];
};
