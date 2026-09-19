import Phaser from 'phaser';
import { progressionSystem } from '../services';

interface FlowerTarget {
  x: number;
  y: number;
}

const FLOWER_POSITIONS: readonly FlowerTarget[] = [
  { x: 300, y: 400 },
  { x: 500, y: 360 },
  { x: 700, y: 420 },
  { x: 900, y: 350 },
  { x: 1040, y: 470 },
];

export class CountingScene extends Phaser.Scene {
  private targetCount = 1;
  private selectedCount = 0;
  private completed = false;

  public constructor() {
    super('counting');
  }

  public create(): void {
    this.targetCount = Phaser.Math.Between(1, 3);
    this.selectedCount = 0;
    this.completed = false;

    this.cameras.main.setBackgroundColor('#ccecff');
    this.drawLandscape();
    this.drawPrompt();
    this.drawFlowers();
    this.drawBackButton();
  }

  private drawLandscape(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xccecff).fillRect(0, 0, 1280, 360);
    graphics.fillStyle(0x87cc72).fillRect(0, 360, 1280, 360);
    graphics.fillStyle(0x75bb65).fillEllipse(170, 380, 500, 240);
    graphics.fillStyle(0x75bb65).fillEllipse(1110, 390, 560, 250);
  }

  private drawPrompt(): void {
    this.add
      .text(640, 86, `${this.targetCount}`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '96px',
        fontStyle: 'bold',
        color: '#244631',
        stroke: '#ffffff',
        strokeThickness: 10,
      })
      .setOrigin(0.5);

    this.add
      .text(640, 168, 'Tap this many flowers', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '32px',
        fontStyle: 'bold',
        color: '#244631',
      })
      .setOrigin(0.5);
  }

  private drawFlowers(): void {
    FLOWER_POSITIONS.forEach((position, index) => {
      this.createFlower(position.x, position.y, index);
    });
  }

  private createFlower(x: number, y: number, index: number): void {
    const container = this.add.container(x, y);
    const hitArea = this.add.circle(0, 0, 76, 0xffffff, 0.001);
    const stem = this.add.rectangle(0, 62, 14, 105, 0x4a9d4f);
    const center = this.add.circle(0, 0, 24, 0xffca44);
    const petalColor = index % 2 === 0 ? 0xf59bc0 : 0xa993eb;

    const petals = [
      this.add.circle(-35, 0, 31, petalColor),
      this.add.circle(35, 0, 31, petalColor),
      this.add.circle(0, -35, 31, petalColor),
      this.add.circle(0, 35, 31, petalColor),
    ];

    container.add([stem, ...petals, center, hitArea]);
    container.setSize(152, 190);
    container.setInteractive({ useHandCursor: true });

    let selected = false;
    container.on('pointerdown', () => {
      if (this.completed) {
        return;
      }

      selected = !selected;
      this.selectedCount += selected ? 1 : -1;
      container.setScale(selected ? 1.13 : 1);
      center.setStrokeStyle(selected ? 7 : 0, 0xffffff);

      if (this.selectedCount === this.targetCount) {
        this.completeRound();
      }
    });
  }

  private completeRound(): void {
    this.completed = true;
    const result = progressionSystem.activityCompleted({
      activityId: 'counting',
      independent: true,
      retries: 0,
    });

    const message =
      result.newlyUnlockedRewardIds.length > 0
        ? 'Wonderful! New garden magic!'
        : 'Wonderful!';

    const banner = this.add
      .rectangle(640, 610, 620, 120, 0xffffff, 0.96)
      .setStrokeStyle(7, 0xffc64a);
    const text = this.add
      .text(640, 610, message, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '38px',
        fontStyle: 'bold',
        color: '#244631',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: [banner, text],
      scaleX: { from: 0.92, to: 1 },
      scaleY: { from: 0.92, to: 1 },
      duration: 220,
      ease: 'Back.Out',
    });

    this.time.delayedCall(900, () => {
      this.scene.start('garden');
    });
  }

  private drawBackButton(): void {
    const button = this.add
      .circle(68, 65, 44, 0xffffff, 0.92)
      .setStrokeStyle(5, 0x5f8a65)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(68, 62, '‹', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '68px',
        fontStyle: 'bold',
        color: '#315739',
      })
      .setOrigin(0.5);

    button.on('pointerdown', () => {
      this.scene.start('garden');
    });
  }
}
