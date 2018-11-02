import { Text } from '../helpers/elements.js';

  class Boot extends Phaser.State {

    create() {
  		
      this.game.stage.disableVisibilityChange = true;

      new Text({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY,
        text: '',
        style: {
          font: '30px pixel',
          fill: '#FFFFFF'
        }
      })

    this.state.start('Preload');

    }
  }

  export default Boot
