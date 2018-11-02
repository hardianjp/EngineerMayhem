  var Lobby    = require('./lobby.js');
  var { Game } = require('./entity/game.js');


  var runningGames = new Map();

  var Play = {
    onStartGame: function() {
      let game = Lobby.deletePendingGame(this.socket_game_id);
      runningGames.set(game.id, game)

      serverSocket.sockets.in(game.id).emit('launch game', game);
    },

    onDisconnectFromGame: function() {
      let current_game = runningGames.get(this.socket_game_id);

      if (current_game) {
        serverSocket.sockets.in(this.socket_game_id).emit('player disconnect', {player_id: this.id } );
      }
    },

    updatePlayerPosition: function (coordinates) {
      this.broadcast.to(this.socket_game_id).emit('move player', Object.assign({}, { player_id: this.id }, coordinates));
    }
  }

  module.exports = Play;