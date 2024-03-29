import { Physics } from "phaser";

export class Actor extends Physics.Arcade.Sprite {
  protected hp = 100;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
  public getDamage(value: number): void {
    // Update HP value immediately
    this.hp -= value;

    // Start tween animation
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }
  public getHPValue(): number {
    return this.hp;
  }
  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
  }
  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
