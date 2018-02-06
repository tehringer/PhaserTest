var GameState = {
	
	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 700;
		
		this.game.world.setBounds(0, 0, 638, 864);
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.WALK_SPEED = 140;
		this.JUMP_SPEED = 500;
	},

	// Add assets to game and activate them
	create: function() {	
		this.ground = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 116, 'ground');
		this.ground.anchor.setTo(0.5, 0.5);
		this.ground.scale.setTo(2,1);
		this.game.physics.arcade.enable(this.ground);
		this.ground.body.allowGravity = false;
		this.ground.body.immovable = true;
		
		
		
		this.top = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 160, 'top');
		this.top.anchor.setTo(0.5, 0.5);		 
		
		this.top2 = this.game.add.sprite(this.game.world.x + 216, this.game.world.height - 325, 'top');
		this.top2.anchor.setTo(0.5, 0.5);
		this.top2.scale.setTo(0.65, 1);
		
		
		
		/*var platformData = [
			{"x": this.game.world.centerX - 125, "y": this.game.world.height - 325},
			{"x": 0, "y": 200},
			{"x": 400, "y": 375}
		];*/
		
		// parse a file
		this.levelData = JSON.parse(this.game.cache.getText('level1'));
		
		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		
		this.levelData.platformData.forEach(function(element) {
			this.platforms.create(element.x, element.y, 'platform');
		}, this);
		
		this.platforms.setAll('body.immovable', true);
		this.platforms.setAll('body.allowGravity', false);
		
		
		
		this.platform = this.game.add.sprite(this.game.world.centerX-105, this.game.world.height - 285, 'platform');
		this.platform.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.platform);
		this.platform.body.allowGravity = false;
		this.platform.body.immovable = true;
		
		
		
		// Fire Data
		this.fires = this.add.group();
		this.fires.enableBody = true;
		
		var fire;
		this.levelData.fireData.forEach(function(element) {
			fire = this.fires.create(element.x, element.y, 'fire');
			fire.anchor.setTo(0.5, 0.5);
			var rotate = this.game.add.tween(fire);
			rotate.to({angle: '+360'}, 1000, null, true, 0, Infinity);
			rotate.start();
		}, this);		
		
		this.fires.setAll('body.allowGravity', false);
		

		
		// Moving obstacles
		this.movingObstacles = this.add.group();
		this.movingObstacles.enableBody = true;
		
		this.movingObstaclesCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.movingObstacleFrequency, this.createMovingObstacle, this);
		
		
		
		this.alpha = this.game.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'alpha_walk', 0);
		//this.alpha = this.game.add.sprite(100, this.game.world.height - 300, 'alpha_walk', 0);
		this.alpha.anchor.setTo(0.5, 0.5);
		this.alpha.scale.setTo(0.5);
		
		this.alpha.animations.add('stand', [0], 1);
		this.alpha.animations.add('walk', [0,1,2,3,4,0,5,6,7,8], 10);
		this.alpha.animations.add('jump', [9], 1);
		
		this.alpha.customParams = {};
		
		this.game.physics.arcade.enable(this.alpha);
		
		
		
		this.goal = this.game.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal', 0);
		
		this.goal.anchor.setTo(0.5, 0.5);
		this.goal.scale.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.goal);
		this.goal.body.allowGravity = false;
		this.goal.body.immovable = true;
		
		
		
		this.createOnscreenControls();
	},
	
	update: function() {
		var isJumping = false;
		
		this.game.physics.arcade.collide(this.alpha, this.ground);
		this.game.physics.arcade.collide(this.alpha, this.platforms);
		this.game.physics.arcade.collide(this.alpha, this.platform);
		this.game.physics.arcade.overlap(this.alpha, this.fires, this.gameOver);
		this.game.physics.arcade.overlap(this.alpha, this.goal, this.gameOver);
		
		this.game.physics.arcade.collide(this.movingObstacles, this.ground);		
		this.game.physics.arcade.collide(this.movingObstacles, this.platforms);
		this.game.physics.arcade.collide(this.movingObstacles, this.platform);
		
		this.alpha.body.collideWorldBounds = true;
		
		
		this.alpha.body.velocity.x = 0;
		
		if (this.cursors.left.isDown || this.alpha.customParams.isMovingLeft)
		{
			this.alpha.body.velocity.x = -this.WALK_SPEED;
			this.alpha.scale.setTo(-0.5, 0.5);
			this.alpha.animations.play('walk', 12, true);
		}
			
		else if (this.cursors.right.isDown || this.alpha.customParams.isMovingRight)
		{
			this.alpha.body.velocity.x = 
this.WALK_SPEED;
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
		
		this.movingObstacles.forEach(function(element) {
			if (element.x < 10 && element.y > 600) {
				element.kill();
			}
		}, this);
	},
	
	createOnscreenControls: function() {		
				this.leftButton = this.add.button(45, this.game.world.height - 260, 'left_arrow');

				this.rightButton = this.add.button(125, this.game.world.height - 260, 'right_arrow');

				this.actionButton = this.add.button(this.game.world.width - 250, this.game.world.height - 260, 'action_button');
		
				this.leftButton.anchor.setTo(0.5,0.5);
				this.rightButton.anchor.setTo(0.5,0.5);
				this.actionButton.anchor.setTo(0.5,0.5);
		
				this.leftButton.alpha = 0.75;		
				this.rightButton.alpha = 0.75;				
				this.actionButton.alpha = 0.75;
		
				this.leftButton.fixedToCamera = true;
				this.rightButton.fixedToCamera = true;
				this.actionButton.fixedToCamera = true;
				this.game.camera.follow(this.alpha);
		
		
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
	
	
	// Create Moving Obstacles
	createMovingObstacle: function () {
		var movingObstacle = this.movingObstacles.getFirstExists(false);
		
		if (!movingObstacle) {
			movingObstacle = this.movingObstacles.create(0, 0, 'goal');
		}
		
		movingObstacle.reset(this.levelData.goal.x, this.levelData.goal.y);
		
		movingObstacle.body.velocity.x = this.levelData.movingObstacleSpeed;
		
		movingObstacle.body.collideWorldBounds = true;
		movingObstacle.body.bounce.set(1,0);
	},
	
	
	// Game over - return to home state
	gameOver: function() {
		game.state.start('GameoverState', true, false, 'Restart');
	}
	
};