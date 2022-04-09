import Phaser from "phaser";
import { Player } from "../classes/player";
import { Skeleton } from "../classes/skeleton";

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private skeletons!: Phaser.Physics.Arcade.Group;
  constructor() {
    super("GameScene");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("magic-cliffs", "tiles");
    console.log(map);
    const ground = map.createLayer("ground", tileset, 0, 0);
    map.createLayer("beauty", tileset, 0, 0);
    ground.setCollisionByExclusion(-1, true);

    const objectsLayer = map.getObjectLayer("objects");

    this.skeletons = this.physics.add.group({
      classType: Skeleton,
      // collideWorldBounds: true,
      createCallback: (go) => {
        const skeletonGo = go as Skeleton;
        skeletonGo.setScale(1.3);
      },
    });
    objectsLayer.objects.forEach((object) => {
      const { x = 0, y = 0, width, height, name } = object;
      switch (name) {
        case "player1-spawn":
          this.player = new Player(this, x, y);
          this.physics.add.collider(this.player, ground);
          break;
        case "skeleton-spawn":
          // this.skeleton = new Skeleton(this, x, y, "skeleton");
          // this.skeleton.setScale(1.3);
          this.skeletons.get(x, y, "skeleton");

          // skeletons.get(x, y, "skeleton");
          break;
        case "skeleton-spawn2":
          // this.skeleton = new Skeleton(this, x, y, "skeleton");
          // this.skeleton.setScale(1.3);
          this.skeletons.get(x, y, "skeleton");

          break;
        case "skeleton-spawn3":
          // this.skeleton = new Skeleton(this, x, y, "skeleton");
          // this.skeleton.setScale(1.3);
          this.skeletons.get(x, y, "skeleton");

          break;
        case "skeleton-spawn4":
          // this.skeleton = new Skeleton(this, x, y, "skeleton");
          // this.skeleton.setScale(1.3);
          this.skeletons.get(x, y, "skeleton");

          break;
      }
    });

    // this.physics.add.collider(this.skeletons, this.player);
    this.physics.add.collider(
      this.player,
      this.skeletons,
      this.handlePlayerSkeletonCollision,
      undefined,
      this
    );
    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.skeletons, ground);

    this.cameras.main.startFollow(this.player);
  }

  private handlePlayerSkeletonCollision(
    player: Phaser.GameObjects.GameObject,
    skeleton: Phaser.GameObjects.GameObject
  ) {
    console.log("collision");
    console.log(skeleton);
    const dx = this.player.x - skeleton.x;
    const dy = this.player.y - skeleton.y;
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(500);
    this.player.handleDamage(dir);
  }

  update() {
    this.player.update();
  }
}
