class Preload extends Phaser.State {

	preload() {
    	//menu
    	this.load.image('main_menu',     	'images/menu/main_menu.png')
    	this.load.image('main_menu_2',     	'images/menu/main_menu_2.png')
        this.load.image('slot_backdrop',    'images/menu/slot_backdrop.png');
    	
    	this.load.spritesheet('buttons',    'images/menu/buttons.png', 200, 65);
    	this.load.spritesheet('buttons',    'images/menu/buttons.png', 200, 75);
    	
    	this.load.spritesheet('list_icon',  'images/menu/game_enter.png', 75, 75);
    	
    	this.load.image('map_1_preview',    'images/menu/map_1_preview.png');
    	this.load.image('map_2_preview',    'images/menu/map_2_preview.png');
    	
    	this.load.image('prev',             'images/menu/left_arrow.png');
    	this.load.image('next',             'images/menu/right_arrow.png');
    	this.load.image('tiles',     		'maps/tileset.png');

    	//maps
    	this.load.tilemap('map_1',  'maps/map_1.json', null, Phaser.Tilemap.TILED_JSON);
    	this.load.tilemap('map_2', 'maps/map_2.json', null, Phaser.Tilemap.TILED_JSON);

    	//skins
    	this.load.image('engineer_head_blank',    'images/game/chars/sprite_blank.png');

    	this.load.image('engineer_head_1',  		         'images/game/chars/1-face.gif');
    	this.load.image('engineer_head_2',    	             'images/game/chars/2-face.gif');
        this.load.image('engineer_head_3',                   'images/game/chars/3-face.gif');
        this.load.image('engineer_head_4',                   'images/game/chars/4-face.gif');

    	this.load.spritesheet('engineer_1',  			       'images/game/chars/1-preview.png', 64, 64);
    	this.load.spritesheet('engineer_2',    		           'images/game/chars/2-preview.png', 64, 64);
        this.load.spritesheet('engineer_3',                    'images/game/chars/3-preview.png', 64, 64);
        this.load.spritesheet('engineer_4',                    'images/game/chars/4-preview.png', 64, 64);
    }

    create() {
    	this.state.start('Menu');
    }
}

export default Preload;