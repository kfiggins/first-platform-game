import Phaser, { Physics } from "phaser";
import { createSkeletonAnims } from "../anims/skeletonAnims";

export class Skeleton extends Phaser.Physics.Arcade.Sprite {
  private speed = 100;
  private target?: Phaser.GameObjects.Components.Transform;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    createSkeletonAnims(scene.anims);
    this.getBody().setGravityY(300);
    this.getBody().setSize(32, 32);
    this.getBody().setOffset(5, -1.5);
    this.anims.play("skeleton-idle", true);
    this.getBody().onCollide = true;
  }

  setTarget(target: Phaser.GameObjects.Components.Transform): void {
    this.target = target;
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.getBody().velocity.x > 0) {
      this.flipX = false;
    } else if (this.getBody().velocity.x < 0) {
      this.flipX = true;
    }

    if (!this.target) return;
    const distance = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y);
    if (distance > 550) return;
    const rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
    const vec = this.scene.physics.velocityFromRotation(rotation, this.speed);
    this.setRotation(rotation);
    this.setVelocity(vec.x, vec.y);
    if (distance < 125) {
      this.anims.play("skeleton-attack", true);
    } else {
      this.anims.play("skeleton-idle", true);
    }
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
