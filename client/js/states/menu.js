import { Text, TextButton, GameSlots } from '../helpers/elements.js';

class Menu extends Phaser.State {

  init() {
    this.slotsWithGame = null;

    clientSocket.on('display pending games', this.displayPendingGames.bind(this));
  }

  create() {
    let background = this.add.image(this.game.world.centerX, this.game.world.centerY, 'main_menu_2');
    background.anchor.setTo(0.5);

    new Text({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY - 205,
      text: 'ENGINEER MAYHEM',
      style: {
        font: '40px pixel',
        fill: '#eae4e6',
        stroke: '#000000',
        strokeThickness: 5,
      }
    })

    new TextButton({
      game: this.game,
      x: this.game.world.centerX - 5,
      y: this.game.world.centerY + 195,
      asset: 'buttons',
      callback: this.hostGameAction,
      callbackContext: this,
      overFrame: 1,
      outFrame: 0,
      downFrame: 2,
      upFrame: 0,
    });

    new Text({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY + 200,
      text: 'New Game',
      style: {
        font: '20px pixel',
        fill: '#000000',
      }
    });

    clientSocket.emit('enter lobby', this.displayPendingGames.bind(this));
  }


  displayPendingGames(availableGames) {
    if (this.slotsWithGame) {
      this.slotsWithGame.destroy()
    }

    this.slotsWithGame = new GameSlots({
      game: this.game,
      availableGames: availableGames,
      callback: this.joinGameAction,
      callbackContext: this,
      x: this.game.world.centerX - 220,
      y: 320,
      style: {
        font: '35px pixel',
        fill: '#eae4e6',
        stroke: '#000000',
        strokeThickness: 5
      }
    })
  }

  joinGameAction(game_id) {
    clientSocket.emit('leave lobby');
    this.state.start('PendingGame', true, false, game_id);
  }

  hostGameAction() {
    clientSocket.emit('leave lobby');
    this.state.start('SelectMap');
  }
}

export default Menu;