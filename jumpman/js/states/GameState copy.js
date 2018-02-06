var GameState = {
	
	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;		
	},

	// Add assets to game and activate them
	create: function() {
		this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.height.centerY, 'background');
		this.background.anchor.setTo(0.5, 0.5);
		this.background.scale.setTo(2);
		
		this.alpha = this.game.add.sprite(100, this.game.world.height - 200, 'alpha_punch');
		this.alpha.anchor.setTo(0.5, 0.5);
		this.alpha.scale.setTo(0.5);
		
		//this.alpha.animations.add('punch', [0,1,2,3,4,5,6,5,4,3,2,1], 12);
		//this.alpha.animations.play('punch', 12, true);
		
		//this.alpha.animations.add('run', [0,1,2,3,0,4,5,6], 8);
		//this.alpha.animations.play('run', 12, true);
		
		//this.alpha.animations.add('walk', [0,1,2,3,4,0,5,6,7,8], 10);
		//this.alpha.animations.play('walk', 12, true);
		
		//this.game.time.events.add(1000, this.gameOver, this);
	},
	
	update: function() {
		//this.alpha.position.x += 4;
		
		//this.alpha.position.x += 1;	
	},
	
	
	// Game over - return to home state
	gameOver: function() {
		this.game.state.start('GameoverState', true, false, 'Restart');
	}
	
};