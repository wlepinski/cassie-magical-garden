import Phaser from 'phaser';
import { createGameConfig } from './config';

let game: Phaser.Game | undefined;

export const startGame = (parent: string): Phaser.Game => {
  if (game !== undefined) {
    return game;
  }

  game = new Phaser.Game(createGameConfig(parent));
  return game;
};
