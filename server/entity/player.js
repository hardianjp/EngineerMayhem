  const { POWER, INITIAL_POWER, STEP_POWER } = require('../constants.js');

  class Player {

    constructor({ id, skin, spawn, spawnOnGrid }) {
      this.id          = id;
      this.skin        = skin;
      this.spawn       = spawn;
      this.spawnOnGrid = spawnOnGrid;

      this.isAlive = true;

      this.power = INITIAL_POWER;
    }

    removePlayer(id) {
      let player = this.players[id];

      this.playerSkins.push(player.skin)
      this.playerSpawns.push(player.spawnOnGrid)

      delete this.players[id];
    }

    isEmpty() {
      return Object.keys(this.players).length === 0
    }
  }

  exports.Player = Player;