import Phaser from 'phaser';
import { progressionSystem } from '../services';

const COLOR = {
  sky: 0xbfe7ff,
  grass: 0x8fcf7a,
  hill: 0x78bd68,
  path: 0xf1d09b,
  white: '#ffffff',
  dark: '#23422f',
  counting: 0xffd75c,
  countingBorder: 0xd99b2b,
  locked: 0xc9d4c3,
};

export class GardenScene extends Phaser.Scene {
  public constructor() {
    super('garden');
  }

  public create(): void {
    this.drawWorld();
    this.drawTitle();
    this.drawCountingEntrance();
    this.drawFutureAreas();
    this.drawRewards();
  }

  private drawWorld(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(COLOR.sky).fillRect(0, 0, 1280, 400);
    graphics.fillStyle(COLOR.hill).fillEllipse(220, 410, 620, 300);
    graphics.fillStyle(COLOR.hill).fillEllipse(1060, 420, 680, 320);
    graphics.fillStyle(COLOR.grass).fillRect(0, 360, 1280, 360);
    graphics.fillStyle(COLOR.path).fillEllipse(640, 690, 520, 410);

    for (let i = 0; i < 9; i += 1) {
      this.drawSmallFlower(80 + i * 145, 470 + (i % 2) * 70, i % 2 === 0);
    }
  }

  private drawTitle(): void {
    this.add
      .text(640, 70, "Cassie's Magical Garden", {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '52px',
        fontStyle: 'bold',
        color: COLOR.dark,
        stroke: COLOR.white,
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.add
      .text(640, 125, 'Tap a place to play', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '28px',
        color: COLOR.dark,
      })
      .setOrigin(0.5);
  }

  private drawCountingEntrance(): void {
    const x = 330;
    const y = 300;
    const width = 360;
    const height = 190;

    const card = this.add
      .rectangle(x, y, width, height, COLOR.counting)
      .setStrokeStyle(8, COLOR.countingBorder)
      .setInteractive({ useHandCursor: true });

    this.add.circle(x - 95, y - 15, 38, 0xffffff).setStrokeStyle(6, 0x5f9f49);
    this.add.circle(x - 95, y - 15, 13, 0xffbd3f);
    this.add.circle(x - 135, y - 15, 20, 0xf6f3e8);
    this.add.circle(x - 55, y - 15, 20, 0xf6f3e8);
    this.add.circle(x - 95, y - 55, 20, 0xf6f3e8);
    this.add.circle(x - 95, y + 25, 20, 0xf6f3e8);

    this.add
      .text(x + 45, y - 28, '1 2 3', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '48px',
        fontStyle: 'bold',
        color: COLOR.dark,
      })
      .setOrigin(0.5);

    this.add
      .text(x, y + 62, 'Counting Garden', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '30px',
        fontStyle: 'bold',
        color: COLOR.dark,
      })
      .setOrigin(0.5);

    card.on('pointerdown', () => {
      this.scene.start('counting');
    });
  }

  private drawFutureAreas(): void {
    this.drawLockedArea(850, 270, 'A B C');
    this.drawLockedArea(970, 470, '◆ ◆');
    this.drawLockedArea(710, 500, '○ △ ○');
  }

  private drawLockedArea(x: number, y: number, symbol: string): void {
    this.add
      .circle(x, y, 85, COLOR.locked)
      .setStrokeStyle(5, 0x9aaa91)
      .setAlpha(0.75);
    this.add
      .text(x, y - 5, symbol, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '32px',
        fontStyle: 'bold',
        color: '#61715d',
      })
      .setOrigin(0.5);
    this.add
      .text(x, y + 55, 'Coming soon', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        color: '#61715d',
      })
      .setOrigin(0.5);
  }

  private drawRewards(): void {
    const progress = progressionSystem.getProgress();
    const unlocked = new Set(progress.unlockedRewardIds);

    this.add
      .text(110, 645, `Garden magic: ${progress.totalCompletions}`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '24px',
        fontStyle: 'bold',
        color: COLOR.dark,
      })
      .setOrigin(0, 0.5);

    if (unlocked.has('flower-patch')) {
      for (let i = 0; i < 5; i += 1) {
        this.drawSmallFlower(470 + i * 42, 575 + (i % 2) * 24, i % 2 === 0);
      }
    }

    if (unlocked.has('butterfly-friend')) {
      this.drawButterfly(760, 225);
    }

    if (unlocked.has('rainbow-arch')) {
      this.drawRainbow(1080, 160);
    }
  }

  private drawSmallFlower(x: number, y: number, alternate: boolean): void {
    const petal = alternate ? 0xf7a8c4 : 0xc7a4ff;
    const graphics = this.add.graphics();
    graphics.lineStyle(5, 0x4d963f).lineBetween(x, y + 12, x, y + 48);
    graphics.fillStyle(petal);
    graphics.fillCircle(x - 12, y, 13);
    graphics.fillCircle(x + 12, y, 13);
    graphics.fillCircle(x, y - 12, 13);
    graphics.fillCircle(x, y + 12, 13);
    graphics.fillStyle(0xffcf4d).fillCircle(x, y, 9);
  }

  private drawButterfly(x: number, y: number): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff8dad).fillEllipse(x - 20, y, 35, 48);
    graphics.fillStyle(0x8a77e8).fillEllipse(x + 20, y, 35, 48);
    graphics.fillStyle(0x51423b).fillEllipse(x, y, 10, 42);
  }

  private drawRainbow(x: number, y: number): void {
    const graphics = this.add.graphics();
    this.strokeRainbowArc(graphics, x, y, 70, 0xf16e79);
    this.strokeRainbowArc(graphics, x, y, 54, 0xffd45c);
    this.strokeRainbowArc(graphics, x, y, 38, 0x74c880);
    this.strokeRainbowArc(graphics, x, y, 22, 0x7aa7ef);
  }

  private strokeRainbowArc(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    radius: number,
    color: number,
  ): void {
    graphics.lineStyle(14, color);
    graphics.beginPath();
    graphics.arc(x, y, radius, Math.PI, 0, false);
    graphics.strokePath();
  }
}
