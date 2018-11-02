import { Text, TextButton, PlayerSlots } from '../helpers/elements.js';

class PendingGame extends Phaser.State {

init({ game_id }) {
  this.game_id = game_id;
  this.slotsWithPlayer = null;

  clientSocket.on('update game', this.displayGameInfo.bind(this));
  clientSocket.emit('enter pending game', { game_id: this.game_id });
  clientSocket.on('launch game', this.launchGame.bind(this));

}

create() {
  let background = this.add.image(this.game.world.centerX, this.game.world.centerY, 'main_menu_2');
  background.anchor.setTo(0.5);

  this.gameTitle = new Text({
    game: this.game,
    x: this.game.world.centerX,
    y: this.game.world.centerY - 205,
    text: 'GAME LOBBY',
    style: {
      font: '40px pixel',
      fill: '#eae4e6',
      stroke: '#000000',
      strokeThickness: 5,
    }
  })

  this.startGameButton = new TextButton({
    game: this.game,
    x: this.game.world.centerX + 100,
    y: this.game.world.centerY + 195,
    asset: 'buttons',
    callback: this.startGameAction,
    callbackContext: this,
    overFrame: 1,
    outFrame: 0,
    downFrame: 2,
    upFrame: 0,
    label: '',
    style: {
      font: '20px pixel',
      fill: '#000000'
    }
  });

  new Text({
    game: this.game,
    x: this.game.world.centerX + 105,
    y: this.game.world.centerY + 200,
    text: 'Start Game',
    style: {
      font: '19px pixel',
      fill: '#000000',
    }
  })

  this.startGameButton.disable()

  new TextButton({
    game: this.game,
    x: this.game.world.centerX - 110,
    y: this.game.world.centerY + 195,
    asset: 'buttons',
    callback: this.leaveGameAction,
    callbackContext: this,
    overFrame: 1,
    outFrame: 0,
    downFrame: 2,
    upFrame: 0,
    label: '',
    style: {
      font: '20px pixel',
      fill: '#000000'
    }
  });

  new Text({
    game: this.game,
    x: this.game.world.centerX - 105,
    y: this.game.world.centerY + 200,
    text: 'Leave Game',
    style: {
      font: '19px pixel',
      fill: '#000000',
    }
  })

}

displayGameInfo({ current_game }){
  let players = Object.values(current_game.players);

  this.gameTitle.text = current_game.name

  if (this.slotsWithPlayer) {
    this.slotsWithPlayer.destroy()
  }
  
  this.slotsWithPlayer = new PlayerSlots({
    game: this.game,
    max_players: current_game.max_players,
    players: players,
    x: this.game.world.centerX - 236,
    y: this.game.world.centerY - 60,
    asset_empty: 'engineer_head_blank',
    asset_player: 'engineer_head_',
    style: {
      font: '20px pixel',
      fill: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 3
    }
  })

  if(players.length > 1) {
    this.startGameButton.enable();
  } else {
    this.startGameButton.disable();
  }
}

leaveGameAction() {
  this.state.start('Menu');
  clientSocket.emit('leave pending game');
}

startGameAction() {
  this.state.start('Play', true, false, this.game_id);
  clientSocket.emit('start game');
}

   launchGame(game) {
    this.state.start('Play', true, false, game);
  }
}

export default PendingGame;