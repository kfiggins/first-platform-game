import Phaser from "phaser";

export const createSkeletonAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: "skeleton-idle",
    frames: anims.generateFrameNames("skeleton", { prefix: "idle", start: 1, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "skeleton-walk",
    frames: anims.generateFrameNames("skeleton", { prefix: "walk", start: 1, end: 12 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "skeleton-attack",
    frames: anims.generateFrameNames("skeleton", { prefix: "attack", start: 1, end: 13 }),
    frameRate: 10,
  });
  anims.create({
    key: "skeleton-death",
    frames: anims.generateFrameNames("skeleton", { prefix: "death", start: 1, end: 13 }),
    frameRate: 10,
  });
  anims.create({
    key: "skeleton-hit",
    frames: anims.generateFrameNames("skeleton", { prefix: "hit", start: 1, end: 3 }),
    frameRate: 10,
  });
};
