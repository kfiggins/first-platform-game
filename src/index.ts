import Phaser from "phaser";
import config from "./config";
import Scenes from "./scenes/";

new Phaser.Game(
  Object.assign(config, {
    scene: Scenes,
  })
);
