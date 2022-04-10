import Phaser, { Physics } from "phaser";
import { createFireballAnims } from "../anims/fireballAnims";

export class Fireball extends Phaser.Physics.Arcade.Sprite {
  private speed = 300;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    createFireballAnims(scene.anims);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.play("fireball-shoot", true);

    // this.getBody().setGravityY(300);
    // this.getBody().setSize(32, 32);
    // this.getBody().setOffset(5, -1.5);
    // this.anims.play("fireball-contact", true);
    // this.getBody().onCollide = true;
  }

  protected preUpdate(time: number, delta: number): void {}

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
