import Phaser from "phaser";
import { Player } from "../classes/player";

export class GameScene extends Phaser.Scene {
  private player!: Player;
  constructor() {
    super("GameScene");
  }

  create() {
    this.player = new Player(this, 100, 450);
    let platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(400, 450, "ground").setScale(0.5).refreshBody();
    platforms.create(100, 380, "ground").setScale(0.5).refreshBody();
    platforms.create(700, 400, "ground").setScale(0.5).refreshBody();
    platforms.create(400, 310, "ground").setScale(0.5).refreshBody();
    platforms.create(600, 250, "ground").setScale(0.5).refreshBody();
    platforms.create(300, 200, "ground").setScale(0.5).refreshBody();
    platforms.create(50, 100, "ground").setScale(0.5).refreshBody();

    this.physics.add.collider(this.player, platforms);
  }

  update() {
    this.player.update();
  }
}
