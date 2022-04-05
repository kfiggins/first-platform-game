import { Actor } from "./actor";
export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private space: Phaser.Input.Keyboard.Key;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "knight");
    // KEYS
    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.space = this.scene.input.keyboard.addKey("space");
    // PHYSICS
    this.getBody().setGravityY(300);
    this.initAnimations();
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: "left2",
      frames: this.scene.anims.generateFrameNames("knight", { prefix: "run", start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "turn2",
      frames: this.scene.anims.generateFrameNames("knight", { prefix: "turn", start: 0, end: 8 }),
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "right2",
      frames: this.scene.anims.generateFrameNames("knight", { prefix: "run", start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "idle2",
      frames: this.scene.anims.generateFrameNames("knight", { prefix: "idle", start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "jump2",
      frames: this.scene.anims.generateFrameNames("knight", { prefix: "jump", start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "attack2",
      frames: this.scene.anims.generateFrameNames("knight", { prefix: "attack", start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(): void {
    if (this.space.isDown) {
      this.anims.play("attack2", true);
    } else if (this.keyA.isDown) {
      this.setVelocityX(-160);
      this.flipX = true;
      this.anims.play("left2", true);
    } else if (this.keyD.isDown) {
      this.flipX = false;
      this.setVelocityX(160);

      this.anims.play("right2", true);
    } else {
      this.setVelocityX(0);
      if (!this.body.touching.down) {
        this.anims.play("jump2", true);
      } else {
        this.anims.play("idle2", true);
      }
    }
    if (this.keyW.isDown && this.body.touching.down) {
      this.setVelocityY(-250);
    }
  }
}
