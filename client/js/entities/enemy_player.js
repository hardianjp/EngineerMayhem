  import { TILE_SIZE, PING } from '../utils/constants.js';
  import { Text } from '../helpers/elements.js';

  export default class EnemyPlayer extends Phaser.Sprite {

    constructor({ game, id, spawn, skin }) {
      super(game, spawn.x, spawn.y, 'engineer_' + skin);

      this.currentPosition = spawn;
      this.lastMoveAt = 0;

      this.game = game
      this.id = id;

      this.currentPosition = spawn;
      this.lastMoveAt = 0;

      this.game.physics.arcade.enable(this);
      this.body.setSize(30, 35, 17, 17);
      this.body.immovable = true;

      this.defineSelf(skin)

      this.animations.add('up', [4, 5, 6, 7], 10, true);
      this.animations.add('down', [0, 1, 2, 3], 10, true);
      this.animations.add('right', [8, 9, 10, 11], 10, true);
      this.animations.add('left', [12, 13, 14, 15], 10, true);
    }

    update () {
      this.game.debug.body(this);
    }

    defineSelf(name) {
      let playerText = new Text({
        game: this.game,
        x: TILE_SIZE / 2,
        y: -10,
        text: `      ${name}`,
        style: {
          font: '14px pixel',
          fill: '#FFFFFF',
          stroke: '#000000',
          strokeThickness: 3
        }
      })

      this.addChild(playerText);
    }

    goTo(newPosition) {
      this.lastMoveAt = this.game.time.now;
      this.animateFace(newPosition);
      this.game.add.tween(this).to(newPosition, PING, Phaser.Easing.Linear.None, true);
    }

    animateFace(newPosition) {
      let face = 'down';
      let diffX = newPosition.x - this.currentPosition.x;
      let diffY = newPosition.y - this.currentPosition.y;

      if (diffX < 0) {
        face = 'left'
      } else if (diffX > 0) {
        face = 'right'
      } else if (diffY < 0) {
        face = 'up'
      } else if (diffY > 0) {
        face = 'down'
      }

      this.animations.play(face)
      this.currentPosition = newPosition;
    }
  }