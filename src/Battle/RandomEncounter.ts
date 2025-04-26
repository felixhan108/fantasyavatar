import { CustomScene } from "@/types/CustomScene";
import { useGameStore, GameState } from "@/store/gameStore";

export default function RandomEncounter(scene: Phaser.Scene, delta: number) {
  console.log("👣 랜덤 인카운터");

  //2~5의 값 구하기
  const randomTime = Phaser.Math.Between(2000, 5000);
  console.log("🎲 ", randomTime);

  //구한 값 만큼 대기 후 인카운터 발생
  scene.time.delayedCall(randomTime, () => {
    console.log("🎲 인카운터 발생");
    // 어떤 몬스터랑 싸울지 결정
    const monsterRoll = Phaser.Math.Between(1, 10);
    const monsterType = monsterRoll <= 7 ? "SLIME" : "SKELETON";

    useGameStore.getState().setMonsterType(monsterType);
    console.log("👣 몬스터 타입: ", useGameStore.getState().monsterType);

    useGameStore.getState().setGameState(GameState.BATTLE);
    scene.stopTraveling = false;
  });

  // 인카운터 관련 상태
  // 인카운터 관련 상태
  // let elapsed = 0; // 경과 시간
  // let targetTime = 0; // 목표 시간
  // let encounterTrigger = false; // 인카운터 발생 여부

  // // 1. 2~5초 지연
  // // 1-1. 2~5초 중 1개를 구한다.
  // targetTime = Phaser.Math.Between(2000, 5000);
  // // 1-2. 구한시간 만큼 대기한다.
  // elapsed += delta;
  // // 1-3. 대기 후 인카운터 발생
  // if (elapsed >= targetTime) {
  //   encounterTrigger = true;
  //   console.log("🎲 ", encounterTrigger);
  // }
  // // 1-4. BATTLE 상태로 전환
  // useGameStore.getState().setGameState(GameState.BATTLE);
  // // 1-5. 인카운터 발생 플래그 초기화
  // encounterTrigger = false;

  // const randomTime = Phaser.Math.Between(0, 2000);
  // console.log("🎲 ", randomTime);
  // if (randomTime < 5) {
  //   scene.encounterStarted = true;

  //   useGameStore.getState().setGameState(GameState.BATTLE);
  //   scene.encounterStarted = false;
  //   const monsterRoll = Phaser.Math.Between(5, 10);
  //   const monsterType = monsterRoll <= 7 ? "SLIME" : "SKELETON";
  //   // StartBattle(scene as CustomScene, monsterType);
  // }

  // scene.time.delayedCall(
  //   1000,
  //   () => {
  //     const encounterTimer = scene.time.addEvent({
  //       delay: 1000,
  //       loop: true,
  //       callback: () => {

  //         const randomTime = Phaser.Math.Between(0, 10);
  //         console.log("🎲 ", randomTime);
  //         if (randomTime >= 5) {
  //           scene.encounterStarted = true;

  //           useGameStore.getState().setGameState(GameState.BATTLE);
  //           scene.encounterStarted = false;
  //           encounterTimer.remove();
  //           const monsterRoll = Phaser.Math.Between(5, 10);
  //           const monsterType = monsterRoll <= 7 ? "SLIME" : "SKELETON";
  //           // StartBattle(scene as CustomScene, monsterType);
  //         }
  //       },
  //       callbackScope: scene,
  //     });
  //   },
  //   [],
  //   scene
  // );
}
