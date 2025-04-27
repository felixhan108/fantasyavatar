import { Weapon } from '@/assets/Weapons';
import { GameState } from '@/store/gameStore';
import { useGameStore } from '@/store/gameStore';
import { CustomScene } from '@/types/CustomScene';
import { Monsters } from '@/assets/Monsters';
import { Character } from '@/assets/Characters';

export default function StartBattle(scene: CustomScene, delta: number) {
  const Character = useGameStore.getState().character;
  const CharacterSprite = useGameStore.getState().characterSprite;

  console.log('⚔️ StartBattle');

  // 1. 몬스터 등장
  console.log('👾 몬스터 등장');
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
    ease: 'Linear',
    onComplete: () => {
      // 배경 이동 멈춤
      useGameStore.getState().setIsBackgroundMoving(false);

      // 캐릭터 애니메이션 idle
      CharacterSprite.play(Character.idleAnim);
      // 몬스터 애니메이션 idle
      MonsterSprite.play(Monster.idleAnim);

      // 2. 캐릭터와 턴제 전투 시작
      console.log('⚔️ 캐릭터와 턴제 전투 시작');
      // 기본 캐릭터의 스펙 저장
      useGameStore.getState().setCharacterStatus(Character);
      // 캐릭터 스펙 출력
      const characterStatus = useGameStore.getState().characterStatus;
      console.log('👣 캐릭터 스펙 상태', characterStatus);
      // 몬스터의 기본 스펙 상태 저장
      const currentMonsterStatus = useGameStore.getState().setCurrentMonsterStatus({
        name: Monster.key,
        hp: Monster.status.hp,
        maxHP: Monster.status.maxHP,
        attack: Monster.status.attack,
        defense: Monster.status.defense,
        exp: Monster.status.exp,
        gold: Monster.status.gold,
      });
      // 몬스터 스펙 출력
      console.log('👾 몬스터 스펙 상태', currentMonsterStatus);

      // 3. 캐릭터 체력 감소
      // 케릭터 1대 스켈레톤 1대 번갈아 가면서 칩니다.
      let currentAttacker: 'character' | 'monster' = 'character';
      // const freshCharacterStatus = useGameStore.getState().characterStatus;
      const freshMonsterStatus = useGameStore.getState().currentMonsterStatus;
      // 비동기 이벤트 loop 추가
      const event = scene.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          if (characterStatus.hp <= 0) {
            console.log('❗ 캐릭터가 죽었습니다. 패배!');
            // 전투 종료 처리
            event.remove();
            useGameStore.getState().setGameState(GameState.RESULT);
            scene.soldier.play('SOLDIER-DEAD'); // 죽는 애니메이션 (있다면)
            return;
          }

          if (freshMonsterStatus.hp <= 0) {
            console.log('🎉 몬스터가 죽었습니다. 승리!');
            // 전투 종료 처리
            event.remove();
            MonsterSprite.destroy();
            useGameStore.getState().setGameState(GameState.RESULT);
            scene.soldier.play('SOLDIER-WALK'); // 다시 여행 모드로 걷기
            return;
          }

          if (currentAttacker === 'character') {
            // 캐릭터 공격 애니메이션 출력
            CharacterSprite.play(Character.attackAnim);

            // 캐릭터 공격력 계산
            const characterAttack = characterStatus.attack + characterStatus.weapon.bonusAttack;
            console.log('캐릭터 공격력', characterAttack);
            // 캐릭터 공격 애니메이션 종료 후 idle 애니메이션 재생
            CharacterSprite.once('animationcomplete', () => {
              CharacterSprite.play(Character.idleAnim);
            });

            // 몬스터 다침
            scene.time.delayedCall(300, () => {
              MonsterSprite.play(Monster.hurtAnim);

              // 몬스터 체력 감소
              const newHp = freshMonsterStatus.hp - characterAttack;

              // 체력을 갱신해서 useStore에 반영
              useGameStore.getState().setCurrentMonsterStatus({
                ...freshMonsterStatus,
                hp: newHp, // 음수 체력 허용
              });
              console.log('몬스터 체력', newHp);

              MonsterSprite.once('animationcomplete', () => {
                MonsterSprite.play(Monster.idleAnim);
              });
            });

            // 몬스터 공격으로 턴을 넘김
            currentAttacker = 'monster';
            console.log('currentAttacker', currentAttacker);
          } else if (currentAttacker === 'monster') {
            console.log('몬스터 공격');

            //   MonsterSprite.destroy();
            //   Monster.clearMonster();

            //   scene.encounterStarted = false;
            //   useGameStore.getState().setGameState(GameState.RESULT);
            //   scene.time.removeEvent(event);
            //   // RESULT -> TRAVELING
            //   // 결과 값이 RESULT 이면 상태값을 다시 TREVELING 으로 변경
            //   useGameStore.getState().setGameState(GameState.TRAVELING);
            //   scene.soldier.play("SOLDIER-WALK");

            //   console.log("몬스터가 죽었습니다.");

            //   return;
            // }

            MonsterSprite.play(Monster.attackAnim);
            MonsterSprite.once('animationcomplete', () => {
              MonsterSprite.play(Monster.idleAnim);
            });

            scene.time.delayedCall(300, () => {
              // 200ms = 2프레임 (60fps 기준)
              CharacterSprite.play(Character.hurtAnim);
              CharacterSprite.once('animationcomplete', () => {
                if (CharacterSprite) {
                  CharacterSprite.play(Character.idleAnim);
                }
              });
            });
            currentAttacker = 'character';
          }

          // 3. 배틀 완료 후 결과 페이지로 이동
          // console.log("👑 배틀 완료 후 결과 페이지로 이동");
          // useGameStore.getState().setStopBattle(false);
          // useGameStore.getState().setGameState(GameState.RESULT);
        },
      });
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
