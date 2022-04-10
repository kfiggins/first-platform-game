import Phaser from "phaser";
import { Fireball } from "../classes/fireball";
import { Player } from "../classes/player";
import { Skeleton } from "../classes/skeleton";
import { getGameHeight, getGameWidth } from "../helpers";

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private skeletons!: Phaser.Physics.Arcade.Group;
  private fireballs!: Phaser.Physics.Arcade.Group;
  constructor() {
    super("GameScene");
  }

  create() {
    // Create Map
    this.cameras.main.setBounds(0, 0, 800, getGameHeight(this));
    this.physics.world.setBounds(0, 0, getGameWidth(this), getGameHeight(this));

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("magic-cliffs", "tiles");
    const ground = map.createLayer("ground", tileset, 0, 0);
    ground.setCollisionByExclusion(-1, true);
    map.createLayer("beauty", tileset, 0, 0);

    this.fireballs! = this.physics.add.group({
      classType: Fireball,
      createCallback: (go) => {
        const fireballGo = go as Skeleton;
        fireballGo.setScale(0.05);
      },
    });

    this.skeletons = this.physics.add.group({
      classType: Skeleton,
      createCallback: (go) => {
        const skeletonGo = go as Skeleton;
        skeletonGo.setScale(1.3);
        skeletonGo.setTarget(this.player);
      },
    });

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

    const skeletonsObjects = map.getObjectLayer("skeletons");
    skeletonsObjects.objects.forEach((object) => {
      const { x = 0, y = 0, width, height, name } = object;
      this.skeletons.get(x, y, "skeleton");
    });

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
    this.cameras.main.setZoom(3);
  }

  private handlePlayerSkeletonCollision(player: Phaser.GameObjects.GameObject, skeleton: any) {
    const dx = this.player.x - skeleton.x;
    const dy = this.player.y - skeleton.y;
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(500);
    this.player.handleDamage(dir);
  }

  update() {
    this.player.update();
    // this.input.on(
    //   "pointerdown",
    //   (pointer: any) => this.player.handleShot(pointer, this.fireballs),
    //   this
    // );
    if (this.input.activePointer.leftButtonDown()) {
      this.player.handleShot(this.fireballs);
    }
  }
}
