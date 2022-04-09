import Phaser from "phaser";
import { Player } from "../classes/player";
import { Skeleton } from "../classes/skeleton";

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private skeleton!: Skeleton;
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
      // const skeletons = this.physics.add.group({ classType: Skeleton });
      switch (name) {
        case "player1-spawn":
          this.player = new Player(this, x, y);
          this.physics.add.collider(this.player, ground);
          break;

        case "skeleton-spawn":
          this.skeleton = new Skeleton(this, x, y, "skeleton");
          this.skeleton.setScale(1.3);
          break;
      }
    });

    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.skeleton, ground);
    this.physics.add.collider(
      this.player,
      this.skeleton,
      this.handlePlayerSkeletonCollision,
      undefined,
      this
    );

    this.cameras.main.startFollow(this.player);
  }

  private handlePlayerSkeletonCollision(
    player: Phaser.GameObjects.GameObject,
    skeleton: Phaser.GameObjects.GameObject
  ) {
    const dx = this.player.x - skeleton.x;
    const dy = this.player.y - skeleton.y;
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(500);
    this.player.handleDamage(dir);
  }

  update() {
    this.player.update();
  }
}
