import Phaser from "phaser";
import { Player } from "../classes/player";

export class GameScene extends Phaser.Scene {
  private player!: Player;
  constructor() {
    super("GameScene");
  }

  create() {
    // this.player = new Player(this, 200, 600);
    // let platforms = this.physics.add.staticGroup();
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("magic-cliffs", "tiles");
    console.log(map);
    const ground = map.createLayer("ground", tileset, 0, 0);
    ground.setCollisionByExclusion(-1, true);

    const objectsLayer = map.getObjectLayer("objects");

    objectsLayer.objects.forEach((object) => {
      const { x = 0, y = 0, width, height, name } = object;
      switch (name) {
        case "player1-spawn":
          this.player = new Player(this, x, y);
          this.physics.add.collider(this.player, ground);
          break;
      }
    });

    this.physics.add.collider(this.player, ground);
    this.cameras.main.startFollow(this.player);
  }

  update() {
    this.player.update();
  }
}
