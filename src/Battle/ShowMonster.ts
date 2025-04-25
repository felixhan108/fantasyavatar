import { Slime } from "@/Characters/Slime";

export const ShowMonster = (scene: Phaser.Scene) => {
  console.log("ShowMonster");

  // 몬스터 소환
  const Monster = scene.add.sprite(170, 75, "SLIME-IDLE");
  Monster.setFlipX(true);
  scene.anims.create({
    key: "SLIME-WALK",
    frames: scene.anims.generateFrameNumbers("SLIME-WALK", {
      start: 0,
      end: 7,
    }),
    frameRate: 12,
    repeat: -1,
  });
  Monster.play("SLIME-WALK");
  scene.anims.create({
    key: "SLIME-IDLE",
    frames: scene.anims.generateFrameNumbers("SLIME-IDLE", {
      start: 0,
      end: 5,
    }),
    frameRate: 12,
    repeat: -1,
  });
  scene.tweens.add({
    targets: Monster,
    x: 100, // 도착 지점
    duration: 1500, // 1초에 도착
    ease: "Linear", // 가속 곡선
    onComplete: () => {
      Monster.play("SLIME-IDLE");
    },
  });

  //   scene.gameState = GameState.ENCOUNTER;
  //   Soldier.Play().idle();

  // // 슬라임 생성 (HP 텍스트 없이)
  // this.slime = Slime.AddSprite(this);
  // this.slime.setFlipX(true);
  // Slime.Play().idle();
  // console.log("slime added");

  // // 전투 타이머 시작
  // this.battleTimer = this.time.addEvent({
  //   delay: 1000,
  //   callback: this.executeAttack,
  //   callbackScope: this,
  //   loop: true,
  // });
  // console.log("battleTimer added");
};
