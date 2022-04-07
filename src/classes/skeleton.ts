import Phaser, { Physics } from "phaser";
import { createSkeletonAnims } from "../anims/skeletonAnims";

enum Direction {
  LEFT,
  RIGHT,
  UP,
}

const randomDirection = () => {
  const newDirection = Phaser.Math.Between(0, 3);
  return newDirection;
};

export class Skeleton extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.LEFT;
  private speed = 100;
  private moveEvent: Phaser.Time.TimerEvent;
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
    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection();
      },
      loop: true,
    });
    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    );
  }

  destroy(): void {
    this.moveEvent.destroy();
    super.destroy();
  }

  private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {
    if (go !== this) return;
    this.direction = randomDirection();
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.getBody().velocity.x > 0) {
      this.flipX = false;
    } else if (this.getBody().velocity.x < 0) {
      this.flipX = true;
    }

    switch (this.direction) {
      case Direction.LEFT:
        this.getBody().setVelocityX(-this.speed);
        break;
      case Direction.RIGHT:
        this.getBody().setVelocityX(this.speed);
        break;
      case Direction.UP:
        this.getBody().setVelocityY(-this.speed);
        break;
    }
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
