import { Soldier } from "@/Characters/Soldiser";
import { Slime } from "@/Characters/Slime";
import { GameState } from "@/store/gameStore";
import { useGameStore } from "@/store/gameStore";
import { CustomScene } from "@/types/CustomScene";
import RandomEncounter from "./RandomEncounter";
import { Monsters } from "@/Monsters/Monster";

export const StartBattle = (scene: CustomScene, monsterKey: string) => {
  console.log("⚔️ StartBattle");
  //1. 캐릭터 IDLE 상태로 변경
  scene.soldier.play("SOLDIER-IDLE");

  //2. 슬라임 등장 -> 새로운 몬스터 생성
  const monsterData = Monsters[monsterKey];
  const sprite = monsterData.createSprite(scene);

  useGameStore.getState().setCurrentMonster({
    name: "슬라임",
    HP: 30,
    maxHP: 30,
    attack: 10,
    defense: 0,
    exp: 10,
    gold: 10,
    sprite: sprite,
  });

  // scene.slime = useGameStore.getState().addSlimeSprite(scene);
  // scene.slime.setFlipX(true);
  // scene.slime?.play('SLIME-WALK');

  //3. 슬라임 이동 ->  대결
  scene.tweens.add({
    targets: sprite,
    x: 100,
    duration: 2000,
    ease: "Linear",
    onComplete: () => {
      sprite.play(monsterData.idleAnim);

      console.log("슬라임의 등장을 기다렸다가 전투 시작");
      //3. 전투 타이머 시작
      let currentAttacker: "soldier" | "monster" = "soldier";

      const event = scene.time.addEvent({
        delay: 1000,
        callback: () => {
          const monster = useGameStore.getState().currentMonster;

          if (!monster || !monster.sprite) {
            console.log("몬스터가 없습니다.");
            return;
          }

          if (currentAttacker === "soldier") {
            scene.soldier.play("SOLDIER-ATTACK");
            scene.soldier.once("animationcomplete", () => {
              scene.soldier.play("SOLDIER-IDLE");
            });
            scene.time.delayedCall(300, () => {
              // 200ms = 2프레임 (60fps 기준)
              sprite.play(monsterData.hurtAnim);
              sprite.once("animationcomplete", () => {
                sprite.play(monsterData.idleAnim);
              });
            });

            // useGameStore.getState().setSlimeHP(useGameStore.getState().getSlimeHP() - 10);
            useGameStore.getState().updateMonsterHP(monster, monster.HP - 10);
            console.log("몬스터(슬라임) 체력: ", monster.HP);

            currentAttacker = "monster";
          } else {
            if (monster.HP <= 0) {
              monster.sprite?.destroy();
              useGameStore.getState().clearMonster();

              scene.encounterStarted = false;
              useGameStore.getState().setGameState(GameState.RESULT);
              scene.time.removeEvent(event);
              // RESULT -> TRAVELING
              // 결과 값이 RESULT 이면 상태값을 다시 TREVELING 으로 변경
              useGameStore.getState().setGameState(GameState.TRAVELING);
              scene.soldier.play("SOLDIER-WALK");

              console.log("몬스터가 죽었습니다.");

              return;
            }

            monster.sprite?.play(monsterData.attackAnim);
            monster.sprite?.once("animationcomplete", () => {
              monster.sprite?.play(monsterData.idleAnim);
            });

            scene.time.delayedCall(300, () => {
              // 200ms = 2프레임 (60fps 기준)
              scene.soldier.play("SOLDIER-HURT");
              scene.soldier.once("animationcomplete", () => {
                if (scene.soldier) {
                  scene.soldier.play("SOLDIER-IDLE");
                }
              });
              useGameStore
                .getState()
                .setSoldierHP(
                  useGameStore.getState().getSoldierHP() - monster.attack
                );
              console.log(
                "솔저의 체력: ",
                useGameStore.getState().getSoldierHP()
              );
            });
            currentAttacker = "soldier";
          }
        },
        loop: true,
      });
    },
  });
};
