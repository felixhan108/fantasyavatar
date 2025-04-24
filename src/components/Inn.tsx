class InnScene extends Phaser.Scene {
  constructor() {
    // 여관
    super("Inn");
  }

  create() {
    this.add
      .text(400, 300, "여관에서 회복 중...", {
        fontSize: "24px",
        color: "#fff",
      })
      .setOrigin(0.5);

    // 회복 후 다시 메인으로 돌아가는 로직도 가능
    this.time.delayedCall(3000, () => {
      this.scene.start("Outdoor");
    });
  }
}
