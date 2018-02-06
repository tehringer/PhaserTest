var PreloadState = {
	preload: function() {
		this.load.image('background', 'assets/images/plains.png');
		this.load.image('ground', 'assets/images/floors/ground.png');
		this.load.image('top', 'assets/images/floors/top.png');
		this.load.image('platform', 'assets/images/floors/platform.png');
		this.load.image('right_arrow', 'assets/images/controls/right_arrow.png');
		this.load.image('left_arrow', 'assets/images/controls/left_arrow.png');
		this.load.image('action_button', 'assets/images/controls/action1_button.png');
		this.load.image('fire', 'assets/images/fireball.png');
		this.load.image('goal', 'assets/images/candy.png');
		
		this.load.text('level1', 'assets/data/level1.json');
		
		this.load.spritesheet('alpha_walk', 'assets/images/characters/Alpha_Platform_Walk_Spritesheet.png', 96, 195);
		this.load.spritesheet('alpha_run', 'assets/images/characters/Alpha_Platform_Run_Spritesheet.png', 160, 192);
		this.load.spritesheet('alpha_punch', 'assets/images/characters/Alpha_Platform_Punch_Spritesheet.png', 128, 190);
	},
	create: function() {
		this.game.state.start('HomeState');
	}
};