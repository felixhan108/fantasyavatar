import { getAsset } from "./assets";

describe("getAsset()", () => {
  test("SOLDIER-IDLE을 입력하면 정확한 배열을 반환한다", () => {
    expect(getAsset("SOLDIER-IDLE")).toEqual([
      "SOLDIER-IDLE",
      "/assets/Soldier-Idle.png",
      { frameWidth: 100, frameHeight: 100 },
    ]);
  });

  test("SLIME-WALK를 입력하면 정확한 배열을 반환한다", () => {
    expect(getAsset("SLIME-WALK")).toEqual([
      "SLIME-WALK",
      "/assets/Slime-Walk.png",
      { frameWidth: 100, frameHeight: 100 },
    ]);
  });

  test("존재하지 않는 key를 입력하면 에러를 던진다", () => {
    expect(() => getAsset("DOES-NOT-EXIST")).toThrow(
      "Asset not found: DOES-NOT-EXIST"
    );
  });

  test("SOLDIER-IDLE을 입력하면 정확한 배열을 반환한다", () => {
    const [key, path, frameConfig] = getAsset("SOLDIER-IDLE");
    expect(key).toBe("SOLDIER-IDLE");
    expect(path).toBe("/assets/Soldier-Idle.png");
    expect(frameConfig).toEqual({ frameWidth: 100, frameHeight: 100 });
  });
});
