import Phaser from "phaser";

export const createFireballAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: "fireball-shoot",
    frames: anims.generateFrameNames("fireball", { prefix: "fire", start: 1, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "fireball-contact",
    frames: anims.generateFrameNames("fireball", { prefix: "end", start: 1, end: 3 }),
    frameRate: 10,
  });
};
