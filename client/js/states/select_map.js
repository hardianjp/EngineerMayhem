import { AVAILABLE_MAPS } from '../utils/constants.js';
import { Text, Button } from '../helpers/elements.js';

  class SelectMap extends Phaser.State {

    init() {
      this.slider = new phaseSlider(this);
    }

    create() {
      let background = this.add.image(this.game.world.centerX, this.game.world.centerY, 'main_menu_2');
      background.anchor.setTo(0.5);

      new Text({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY - 205,
        text: 'Select Map',
        style: {
          font: '35px pixel',
          fill: '#eae4e6',
          stroke: '#000000',
          strokeThickness: 5
        }
      })

      let firstMapImage = new Phaser.Image(this.game, 0, 0, 'map_1_preview');
      let secondMapImage = new Phaser.Image(this.game, 0, 0, 'map_2_preview');

      this.slider.createSlider({
        x: this.game.world.centerX - firstMapImage.width / 2,
        y: this.game.world.centerY - secondMapImage.height / 2,
        width: firstMapImage.width,
        height: firstMapImage.height,
        customHandlePrev: 'prev',
        customHandleNext: 'next',
        objects: [firstMapImage, secondMapImage]
      });

      new Button({
        game: this.game,
        x: this.game.world.centerX - 5,
        y: this.game.world.centerY + 195,
        asset: 'buttons',
        callback: this.confirmStageSelection,
        callbackContext: this,
        overFrame: 1,
        outFrame: 0,
        downFrame: 2,
        upFrame: 0,
      })

      new Text({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY + 200,
        text: 'Next',
        style: {
          font: '20px pixel',
          fill: '#000000',
        }
      })
    }

  confirmStageSelection() {
    let map_name = AVAILABLE_MAPS[this.slider.getCurrentIndex()]

    clientSocket.emit('create game', map_name, this.joinToNewGame.bind(this));
  }

  joinToNewGame(game_id) {
    this.state.start('PendingGame', true, false, game_id);
  }
}

  export default SelectMap;