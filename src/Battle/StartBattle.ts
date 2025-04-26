import { GameState } from "@/store/gameStore";
import { useGameStore } from "@/store/gameStore";
import { CustomScene } from "@/types/CustomScene";
import { Monsters } from "@/Monsters/Monster";
import { Character } from "@/Characters/Character";

export default function StartBattle(scene: CustomScene, delta: number) {
  const Character = useGameStore.getState().character;
  const CharacterSprite = useGameStore.getState().characterSprite;

  console.log("⚔️ StartBattle");

  // 1. 몬스터 등장
  console.log("👾 몬스터 등장");
  // 1-1. 몬스터 값을 가져와 해당 몬스터 스프라이트 생성
  const Monster = Monsters[useGameStore.getState().monsterType];
  // 1-2. 몬스터 스프라이트 생성 후 화면에 추가
  const MonsterSprite = Monster.createSprite(scene);
  MonsterSprite.play(Monster.walkAnim);
  // 1-3. 몬스터 스프라이트 플레이 애니메이션 설정 -> 1초 tween 으로 걸어서 x:130 좌표까지 이동
  scene.tweens.add({
    targets: MonsterSprite,
    x: 100,
    duration: 2000,
    ease: "Linear",
    onComplete: () => {
      CharacterSprite.play(Character.idleAnim);
      MonsterSprite.play(Monster.idleAnim);
      // 2. 캐릭터와 턴제 전투 시작
      console.log("⚔️ 캐릭터와 턴제 전투 시작");
      // 3. 배틀 완료 후 결과 페이지로 이동
      console.log("👑 배틀 완료 후 결과 페이지로 이동");
      useGameStore.getState().setStopBattle(false);
      useGameStore.getState().setGameState(GameState.RESULT);
    },
  });

  // //1. 캐릭터 IDLE 상태로 변경
  // scene.soldier.play("SOLDIER-IDLE");

  // //2. 슬라임 등장 -> 새로운 몬스터 생성
  // const monsterData = Monsters[monsterKey];
  // const sprite = monsterData.createSprite(scene);

  // useGameStore.getState().setCurrentMonster({
  //   name: monsterData.key,
  //   HP: monsterData.status.HP,
  //   maxHP: monsterData.status.maxHP,
  //   attack: monsterData.status.attack,
  //   defense: monsterData.status.defense,
  //   exp: monsterData.status.exp,
  //   gold: monsterData.status.gold,
  //   sprite: sprite,
  // });

  // //3. 슬라임 이동 ->  대결
  // scene.tweens.add({
  //   targets: sprite,
  //   x: 100,
  //   duration: 2000,
  //   ease: "Linear",
  //   onComplete: () => {
  //     sprite.play(monsterData.idleAnim);

  //     console.log("슬라임의 등장을 기다렸다가 전투 시작");
  //     //3. 전투 타이머 시작
  //     let currentAttacker: "soldier" | "monster" = "soldier";

  //     const event = scene.time.addEvent({
  //       delay: 1000,
  //       callback: () => {
  //         const monster = useGameStore.getState().currentMonster;

  //         if (!monster || !monster.sprite) {
  //           console.log("몬스터가 없습니다.");
  //           return;
  //         }

  //         if (currentAttacker === "soldier") {
  //           scene.soldier.play("SOLDIER-ATTACK");
  //           scene.soldier.once("animationcomplete", () => {
  //             scene.soldier.play("SOLDIER-IDLE");
  //           });
  //           scene.time.delayedCall(300, () => {
  //             // 200ms = 2프레임 (60fps 기준)
  //             sprite.play(monsterData.hurtAnim);
  //             sprite.once("animationcomplete", () => {
  //               sprite.play(monsterData.idleAnim);
  //             });
  //           });

  //           useGameStore.getState().updateMonsterHP(monster, monster.HP - 10);
  //           console.log("몬스터(슬라임) 체력: ", monster.HP);

  //           currentAttacker = "monster";
  //         } else {
  //           if (monster.HP <= 0) {
  //             monster.sprite?.destroy();
  //             useGameStore.getState().clearMonster();

  //             scene.encounterStarted = false;
  //             useGameStore.getState().setGameState(GameState.RESULT);
  //             scene.time.removeEvent(event);
  //             // RESULT -> TRAVELING
  //             // 결과 값이 RESULT 이면 상태값을 다시 TREVELING 으로 변경
  //             useGameStore.getState().setGameState(GameState.TRAVELING);
  //             scene.soldier.play("SOLDIER-WALK");

  //             console.log("몬스터가 죽었습니다.");

  //             return;
  //           }

  //           monster.sprite?.play(monsterData.attackAnim);
  //           monster.sprite?.once("animationcomplete", () => {
  //             monster.sprite?.play(monsterData.idleAnim);
  //           });

  //           scene.time.delayedCall(300, () => {
  //             // 200ms = 2프레임 (60fps 기준)
  //             scene.soldier.play("SOLDIER-HURT");
  //             scene.soldier.once("animationcomplete", () => {
  //               if (scene.soldier) {
  //                 scene.soldier.play("SOLDIER-IDLE");
  //               }
  //             });
  //             useGameStore
  //               .getState()
  //               .setSoldierHP(
  //                 useGameStore.getState().getSoldierHP() - monster.attack
  //               );
  //             console.log(
  //               "솔저의 체력: ",
  //               useGameStore.getState().getSoldierHP()
  //             );
  //           });
  //           currentAttacker = "soldier";
  //         }
  //       },
  //       loop: true,
  //     });
  //   },
  // });
}
