 import {PING, TILE_SIZE, INITIAL_SPEED} from '../utils/constants.js';

  import { Text } from '../helpers/elements.js';

  export default class Player extends Phaser.Sprite {

    constructor({ game, id, spawn, skin }) {
      super(game, spawn.x, spawn.y, 'engineer_' + skin);

      this.game = game;
      this.id = id;
      this.skin = skin;

      this.prevPosition = { x: spawn.x, y: spawn.y };

      game.time.events.loop(PING , this.positionUpdaterLoop.bind(this));

      this.game.add.existing(this);
      this.game.physics.arcade.enable(this);
      this.body.setSize(30, 35, 17, 17);

      this.defineSelf(skin)

      this.speed = INITIAL_SPEED;

      this.animations.add('up', [4, 5, 6, 7], 10, true);
      this.animations.add('down', [0, 1, 2, 3], 10, true);
      this.animations.add('right', [8, 9, 10, 11], 10, true);
      this.animations.add('left', [12, 13, 14, 15], 10, true);

      this.defineKeyboard()
    }

    positionUpdaterLoop() {
      let newPosition = { x: this.position.x, y: this.position.y }

      if (this.prevPosition.x !== newPosition.x || this.prevPosition.y !== newPosition.y) {
        clientSocket.emit('update player position', newPosition);
        this.prevPosition = newPosition;
      }
    }
    
    update() {
      if (this.alive) {
        this.handleMoves()
      }
      this.game.debug.body(this);
      this.game.debug.spriteInfo(this, 32, 32);
    }

    defineKeyboard() {
      this.upKey    = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
      this.downKey  = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
      this.leftKey  = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
      this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }

    handleMoves() {
      this.body.velocity.set(0);
      let animationsArray = []

      if (this.leftKey.isDown){
        this.body.velocity.x = -this.speed;
        animationsArray.push('left')
      } else if (this.rightKey.isDown) {
        this.body.velocity.x = this.speed;
        animationsArray.push('right')
      }

      if (this.upKey.isDown) {
        this.body.velocity.y = -this.speed;
        animationsArray.push('up')
      } else if (this.downKey.isDown) {
        this.body.velocity.y = this.speed;
        animationsArray.push('down')
      }

      let currentAnimation = animationsArray[0]
      if (currentAnimation){
        this.animations.play(currentAnimation)
        return
      }

      this.animations.stop();
    }

    defineSelf(name) {
      let playerText = new Text({
        game: this.game,
        x: TILE_SIZE / 2,
        y: -10,
        text: `     ${name}`,
        style: {
          font: '15px pixel',
          fill: '#FFFFFF',
          stroke: '#000000',
          strokeThickness: 3
        }
      })

      this.addChild(playerText);
    }
  }