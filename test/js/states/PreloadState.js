var PreloadState = {
	preload: function() {
		// Control Buttons
		this.load.image('action1'	, 'assets/images/a_controls/action1_button.png');
		this.load.image('action2'	, 'assets/images/a_controls/action2_button.png');
		this.load.image('action3'	, 'assets/images/a_controls/action3_button.png');
		this.load.image('action4'	, 'assets/images/a_controls/action4_button.png');
		this.load.image('down'		, 'assets/images/a_controls/down_arrow.png');
		this.load.image('downleft'	, 'assets/images/a_controls/downleft_arrow.png');
		this.load.image('left'		, 'assets/images/a_controls/left_arrow.png');
		this.load.image('upleft'	, 'assets/images/a_controls/upleft_arrow.png');
		this.load.image('up'		, 'assets/images/a_controls/up_arrow.png');
		this.load.image('upright'	, 'assets/images/a_controls/upright_arrow.png');
		this.load.image('right'		, 'assets/images/a_controls/right_arrow.png');
		this.load.image('downright'	, 'assets/images/a_controls/downright_arrow.png');
		this.load.image('menu'		, 'assets/images/a_controls/menu_button.png');
		
		// Foreground Objects
		this.load.image('asphault'	, 'assets/images/b_foreground/asphault.png');
		this.load.image('autumn'	, 'assets/images/b_foreground/autumn.png');
		this.load.image('concrete'	, 'assets/images/b_foreground/concrete.png');
		this.load.image('dirt'		, 'assets/images/b_foreground/dirt.png');
		this.load.image('grass'		, 'assets/images/b_foreground/grass.png');
		this.load.image('sand'		, 'assets/images/b_foreground/sand.png');
		this.load.image('seawater'	, 'assets/images/b_foreground/seawater.png');
		this.load.image('snow'		, 'assets/images/b_foreground/snow.png');
		this.load.image('spring'	, 'assets/images/b_foreground/spring.png');
		this.load.image('water'		, 'assets/images/b_foreground/water.png');
		
		// Background Objects
		this.load.image('dawn'		, 'assets/images/c_background/dawn.png');
		this.load.image('day'		, 'assets/images/c_background/day.png');
		this.load.image('evening'	, 'assets/images/c_background/evening.png');
		this.load.image('night'		, 'assets/images/c_background/night.png');
		this.load.image('midnight'	, 'assets/images/c_background/midnight.png');
		this.load.image('space'		, 'assets/images/c_background/space.png');
		
		// Fixed Objects
		this.load.image('ice'		, 'assets/images/d_fixedobjects/ice.png');
		this.load.image('stone'		, 'assets/images/d_fixedobjects/stone.png');
		this.load.image('wood'		, 'assets/images/d_fixedobjects/wood.png');
			
		// Moving Objects
		this.load.image('fire'		, 'assets/images/e_movingobjects/fire.png');
		this.load.image('particle'	, 'assets/images/e_movingobjects/particle.png');
		
		// Characters
		this.load.image('enemy'		, 'assets/images/f_characters/enemy.png');
		this.load.image('npc'		, 'assets/images/f_characters/npc.png');
		this.load.image('player'	, 'assets/images/f_characters/player.png');
		
		
		
		// Spritesheets
		this.load.spritesheet('playersheet', 'assets/images/f_characters/playersheet.png', 64, 64);	
	},
	
	create: function() {
		this.game.state.start('HomeState');
	}
};