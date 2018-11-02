  const { TILE_SIZE, EMPTY_CELL, DESTRUCTIBLE_CELL, NON_DESTRUCTIBLE_CELL, SKINS } = require('../constants.js');

  var uuidv4 = require('uuid/v4');
  var faker = require('faker');
  var { Player } = require('./player.js');

  class Game {
    constructor({ map_name }) {
      this.id           = uuidv4();
      this.name         = faker.commerce.color()
      this.map_name     = map_name;

      this.layer_info   = require('../../client/maps/' + this.map_name + '.json').layers[0]
      this.max_players  = this.layer_info.properties.max_players

      this.players     = {}
      this.playerSkins = SKINS

      this.playerSpawns = this.layer_info.properties.spawns.slice()
    }

    addPlayer(id) {
      let skin = this.getAndRemoveSkin()
      let [spawn, spawnOnGrid] = this.getAndRemoveSpawn()

      let player = new Player({ id: id, skin: skin, spawn: spawn, spawnOnGrid: spawnOnGrid })
      this.players[player.id] = player
    }

    getAndRemoveSkin() {
      let index = Math.floor(Math.random() * this.playerSkins.length);
      let randomSkin = this.playerSkins[index];
      this.playerSkins.splice(index, 1);

      return randomSkin;
    }

    getAndRemoveSpawn() {
      let index = Math.floor(Math.random() * this.playerSpawns.length);
      let spawnOnGrid = this.playerSpawns[index];
      this.playerSpawns.splice(index, 1);

      let spawn = { x: spawnOnGrid.col * TILE_SIZE, y: spawnOnGrid.row * TILE_SIZE };
      return [spawn, spawnOnGrid];
    }

    isFull() {
      return Object.keys(this.players).length === this.max_players
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

  exports.Game = Game;