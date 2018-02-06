var GameState = {
	
	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 700;
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.WALK_SPEED = 140;
		this.JUMP_SPEED = 500;
	},

	// Add assets to game and activate them
	create: function() {	
		this.ground = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 116, 'ground');
		this.ground.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.ground);
		this.ground.body.allowGravity = false;
		this.ground.body.immovable = true;
		
		
		
		this.top = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 160, 'top');
		this.top.anchor.setTo(0.5, 0.5);		
		
		this.top2 = this.game.add.sprite(this.game.world.x + 216, this.game.world.height - 325, 'top');
		this.top2.anchor.setTo(0.5, 0.5);
		this.top2.scale.setTo(0.65, 1);
		
		
		
		this.platform = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 285, 'platform');
		this.platform.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.platform);
		this.platform.body.allowGravity = false;
		this.platform.body.immovable = true;
		
		
		
		this.alpha = this.game.add.sprite(100, this.game.world.height - 300, 'alpha_walk', 0);
		this.alpha.anchor.setTo(0.5, 0.5);
		this.alpha.scale.setTo(0.5);
		
		this.alpha.animations.add('stand', [0], 1);
		this.alpha.animations.add('walk', [0,1,2,3,4,0,5,6,7,8], 10);
		this.alpha.animations.add('jump', [9], 1);
		
		this.alpha.customParams = {};
		
		this.game.physics.arcade.enable(this.alpha);
		
		
		
		this.createOnscreenControls();
	},
	
	update: function() {
		var isJumping = false;
		
		this.game.physics.arcade.collide(this.alpha, this.ground);
		this.game.physics.arcade.collide(this.alpha, this.platform);
		
		this.alpha.body.velocity.x = 0;
		
		if (this.cursors.left.isDown || this.alpha.customParams.isMovingLeft)
		{
			this.alpha.body.velocity.x = -this.WALK_SPEED;
			this.alpha.scale.setTo(-0.5, 0.5);
			this.alpha.animations.play('walk', 12, true);
		}
			
		else if (this.cursors.right.isDown || this.alpha.customParams.isMovingRight)
		{
			this.alpha.body.velocity.x = this.WALK_SPEED;
			this.alpha.scale.setTo(0.5, 0.5);
			this.alpha.animations.play('walk', 12, true);
		}
		else
		{
			this.alpha.animations.play('stand', 12, true);
		}
		
		if ((this.cursors.up.isDown || this.alpha.customParams.jump) && this.alpha.body.touching.down)
		{	
			this.alpha.body.velocity.y = -this.JUMP_SPEED;
			this.alpha.customParams.jump = false;
		}
		
		if (!this.alpha.body.touching.down)
			{
				this.alpha.animations.play('jump', 12, true);
			}		
	},
	
	createOnscreenControls: function() {		
				this.leftButton = this.add.button(this.game.world.x + 45, this.game.world.height - 40, 'left_arrow');

				this.rightButton = this.add.button(this.game.world.x + 125, this.game.world.height - 40, 'right_arrow');

				this.actionButton = this.add.button(this.game.world.width - 45, this.game.world.height - 40, 'action_button');
		
				this.leftButton.anchor.setTo(0.5,0.5);
				this.rightButton.anchor.setTo(0.5,0.5);
				this.actionButton.anchor.setTo(0.5,0.5);
		
				this.leftButton.alpha = 0.75;		
				this.rightButton.alpha = 0.75;				
				this.actionButton.alpha = 0.75;
		
		
				// Left Button
				this.leftButton.events.onInputDown.add(function() {
					this.alpha.customParams.isMovingLeft = true;
					this.leftButton.scale.setTo(0.9, 0.9);
				}, this);
		
				this.leftButton.events.onInputUp.add(function() {
					this.alpha.customParams.isMovingLeft = false;
					this.leftButton.scale.setTo(1, 1);
				}, this);
		
				this.leftButton.events.onInputOver.add(function() {
					this.alpha.customParams.isMovingLeft = true;
					this.leftButton.scale.setTo(0.9, 0.9);
				}, this);
		
				this.leftButton.events.onInputOut.add(function() {
					this.alpha.customParams.isMovingLeft = false;
					this.leftButton.scale.setTo(1, 1);
				}, this);

		
				// Right Button
				this.rightButton.events.onInputDown.add(function() {
					this.alpha.customParams.isMovingRight = true;
					this.rightButton.scale.setTo(0.9, 0.9);
				}, this);
		
				this.rightButton.events.onInputUp.add(function() {
					this.alpha.customParams.isMovingRight = false;
					this.rightButton.scale.setTo(1, 1);
				}, this);

				this.rightButton.events.onInputOver.add(function() {
					this.alpha.customParams.isMovingRight = true;
					this.rightButton.scale.setTo(0.9, 0.9);
				}, this);
		
				this.rightButton.events.onInputOut.add(function() {
					this.alpha.customParams.isMovingRight = false;
					this.rightButton.scale.setTo(1, 1);
				}, this);
		
		
				// Action Button
				this.actionButton.events.onInputDown.add(function() {
					this.alpha.customParams.jump = true;
					this.actionButton.scale.setTo(0.9, 0.9);
				}, this);
		
				this.actionButton.events.onInputUp.add(function() {
					this.alpha.customParams.jump = false;
					this.actionButton.scale.setTo(1, 1);
				}, this);
		
				this.actionButton.events.onInputOver.add(function() {
					this.alpha.customParams.jump = true;
					this.actionButton.scale.setTo(0.9, 0.9);
				}, this);
		
				this.actionButton.events.onInputOut.add(function() {
					this.alpha.customParams.jump = false;
					this.actionButton.scale.setTo(1, 1);
				}, this);
	},
	
	
	// Game over - return to home state
	gameOver: function() {
		this.game.state.start('GameoverState', true, false, 'Restart');
	}
	
};