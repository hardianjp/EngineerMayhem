import Boot from './states/boot.js';
import Preload from './states/preload.js';
import Menu from './states/menu.js'
import SelectMap from './states/select_map.js';
import PendingGame from './states/pending_game.js';
import Play from './states/play.js';
import Win from './states/win.js';


  class Game extends Phaser.Game {
    constructor() {
      super(960, 960, Phaser.AUTO, 'game-container');

      this.state.add('Boot',            Boot);
	    this.state.add('Preload',         Preload);
      this.state.add('Menu',            Menu);
      this.state.add('SelectMap',       SelectMap);
      this.state.add('PendingGame',     PendingGame);
      this.state.add('Play',            Play);
      this.state.add('Win',             Win);

      this.state.start('Boot');
    }
  }

  new Game();