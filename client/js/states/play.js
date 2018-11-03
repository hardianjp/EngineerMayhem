import { TILESET, LAYER } from '../utils/constants.js ';
import { findFrom, findAndDestroyFrom } from '../utils/utils.js';
import Player from '../entities/player.js'; 
import EnemyPlayer from '../entities/enemy_player.js';

class Play extends Phaser.State {
  init(game) {
    this.currentGame = game
    this.setEventHandlers();
    this.game.time.events.loop(400 , this.stopAnimationLoop.bind(this));
  }

  setEventHandlers() {
    clientSocket.on('move player', this.onMovePlayer.bind(this));
    clientSocket.on('player disconnect', this.onPlayerDisconnect.bind(this)); 
  }

  onMovePlayer({ player_id, x, y }) {
    let enemy = findFrom(player_id, this.enemies);
    if (!enemy) { return }

      enemy.goTo({ x: x, y: y })
  }

  create() {
    this.createMap();
    this.createPlayers();
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.blockLayer);
    this.game.physics.arcade.collide(this.player, this.enemies);
    if( this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) ) {
      this.onPlayerWin(this.player.skin);
    }
  }

  onPlayerWin(winner_skin) {
    this.state.start('Win', true, false, winner_skin);
  }

  onPlayerDisconnect({ player_id }) {

    findAndDestroyFrom(player_id, this.enemies);

    if (this.enemies.children.length >= 1) { return }

    this.onPlayerWin()
  }

  createMap() {
    this.map = this.add.tilemap(this.currentGame.map_name);

    this.map.addTilesetImage(TILESET);

    this.blockLayer = this.map.createLayer(LAYER);
    this.blockLayer.resizeWorld();

    this.map.setCollision(this.blockLayer.layer.properties.collisionTiles)

    this.player  = null;
    this.enemies = this.game.add.group();
  }

  createPlayers() {
    for (let player of Object.values(this.currentGame.players)) {
      let setup = {
        game:   this.game,
        id:     player.id,
        spawn:  player.spawn,
        skin:   player.skin
      }

      if (player.id === clientSocket.id) {
        this.player = new Player(setup);
      } else {
        this.enemies.add(new EnemyPlayer(setup))
      }
    }
  }

  stopAnimationLoop() {
    for (let enemy of this.enemies.children) {
      if (enemy.lastMoveAt < this.game.time.now - 200) {
        enemy.animations.stop();
      }
    }
  }
}

export default Play;
