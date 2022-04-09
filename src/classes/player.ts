import { Actor } from "./actor";

enum HealthState {
  Healthy,
  Hurt,
  Dead,
}
export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private space: Phaser.Input.Keyboard.Key;
  private hit = 0;
  private healthState: HealthState = HealthState.Healthy;
  private damageTime = 0;

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

  handleDamage(dir: Phaser.Math.Vector2) {
    if (this.healthState === HealthState.Hurt) return;
    this.setVelocity(dir.x, dir.y);
    this.setTint(0xff0000);
    this.healthState = HealthState.Hurt;
    this.damageTime = 0;
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    switch (this.healthState) {
      case HealthState.Healthy:
        break;
      case HealthState.Hurt:
        this.damageTime += delta;
        if (this.damageTime >= 250) {
          this.healthState = HealthState.Healthy;
          this.setTint(0xffffff);
          this.damageTime = 0;
        }
        break;
      case HealthState.Dead:
        this.setTint(0x000000);
        break;
    }
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
    if (this.healthState === HealthState.Dead) return;
    if (this.healthState === HealthState.Hurt) return;
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
      if (!this.body.touching.down && !this.body.blocked.down) {
        this.anims.play("jump2", true);
      } else {
        this.anims.play("idle2", true);
      }
    }
    if (this.keyW.isDown && (this.body.touching.down || this.body.blocked.down)) {
      this.setVelocityY(-320);
    }
  }
}
