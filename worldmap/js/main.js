var game = new Phaser.Game(2304, 1728, Phaser.AUTO);

var GameState =
	{
		
	// Center the game
	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
	},
  
    preload: function()
    {
        // Load Images
		this.load.image('background_1', 'assets/images/worldmap/alard_scene1_day_frame1.png');
        this.load.image('alpha_topdown_stand', 'assets/images/characters/alpha_topdown_front_stand.png');
        
        this.load.image('health', 'assets/images/status/heart.png');
        this.load.image('strength', 'assets/images/status/fist.png');
        this.load.image('defense', 'assets/images/status/shield.png');
        this.load.image('magic', 'assets/images/status/magic.png');
        this.load.image('spirit', 'assets/images/status/spirit.png');
        
        this.load.image('arrow', 'assets/images/controls/arrow.png');
        
        
        
        // Load Spritesheets
        this.load.spritesheet('alard_scene1_day', 'assets/images/worldmap/alard_scene1_day_spritesheet.png', 1152, 864);
        this.load.spritesheet('alpha_walk', 'assets/images/characters/Alpha_TopDown_Spritesheet.png', 32, 64);
        
        // Load Sounds
        this.load.audio('wind', ['assets/sounds/wind.mp3', 'assets/sounds/wind.ogg']);
    },
    
    create: function()
    {        
        // BASICS - 1. Full Screen - 2. Add Sprite - 3. Center Sprite - 4. Set Anchor - 5. Scale - 6. Flip - 7. Rotate - 8. Pixel Perfect - 9. Input - 10. Group
        
        // Add Background
        //this.background = this.game.add.sprite(0, 0, 'background_1');
        //var worldmap;
        //this.worldmap = game.add.group();
        
        this.alard = this.game.add.sprite(0, 0, 'alard_scene1_day');
        var wind = this.game.add.audio('wind');
        this.alard.scale.setTo(2);
        this.alard.animations.add('breathe', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        this.alard.animations.play('breathe', 6, true);
        
        wind.loopFull(1);
        wind.play();
        
        
        // Add Player
        this.alpha_topdown_stand = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'alpha_walk');
        
        
        // Set Player Options
        this.alpha_topdown_stand.anchor.setTo(0.5);
        this.alpha_topdown_stand.scale.setTo(1);
        this.alpha_topdown_stand.angle = 0;
        
        this.alpha_topdown_stand.inputEnabled = true;
        this.alpha_topdown_stand.input.pixelPerfectClick = true;
        //this.alpha_topdown_stand.customParams = {direction: 1};
        this.alpha_topdown_stand.events.onInputDown.add(this.someFunction, this);
        
        // Set Player Stats
        var characterData = 
        [
            {key: 'health',   text: 'Health'    },
            {key: 'strength', text: 'Strength'  },
            {key: 'defense',  text: 'Defense'   },
            {key: 'magic',    text: 'Magic'     },
            {key: 'spirit',   text: 'Spirit'    }
        ];
        
        // Add Player Stats
        this.status = this.game.add.group();      
        var self = this;
        var stat;
        characterData.forEach(function(element)
        {
            stat = self.status.create(-100, self.game.world.height - 200, element.key);
            
            stat.customParams = {text: element.text};
            stat.anchor.setTo(0.5);
            
			// Enable input so we can touch it
            stat.inputEnabled = true;
            stat.input.pixelPerfectClick = true;
            stat.events.onInputDown.add(self.moveStat, self);
        });
        
		// Place first stat down and in the middle
        this.currentStat = this.status.next();
        this.currentStat.position.set(this.game.world.centerX, this.game.world.height - 200);
        
		// Show stat text
        this.showText(this.currentStat);
        
        
        // Input Buttons
        
        // Up Arrow
        this.upArrow = this.game.add.sprite(200, this.game.world.height - 350, 'arrow');
        this.upArrow.anchor.setTo(0.5);
        this.upArrow.angle = 0;
        
        // Upright Arrow
        this.uprightArrow = this.game.add.sprite(300, this.game.world.height - 300, 'arrow');
        this.uprightArrow.anchor.setTo(0.5);
        this.uprightArrow.angle = 45;
        this.uprightArrow.alpha = .25;
        
        // Right Arrow
        this.rightArrow = this.game.add.sprite(350, this.game.world.height - 200, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.angle = 90;
        
        // Downright Arrow
        this.downrightArrow = this.game.add.sprite(300, this.game.world.height - 100, 'arrow');
        this.downrightArrow.anchor.setTo(0.5);
        this.downrightArrow.angle = 135;
        this.downrightArrow.alpha = .25;
        
        // Down Arrow
        this.downArrow = this.game.add.sprite(200, this.game.world.height - 50, 'arrow');
        this.downArrow.anchor.setTo(0.5);
        this.downArrow.angle = 180;
        
        // Downleft Arrow
        this.downleftArrow = this.game.add.sprite(100, this.game.world.height - 100, 'arrow');
        this.downleftArrow.anchor.setTo(0.5);
        this.downleftArrow.angle = 225;
        this.downleftArrow.alpha = .25;  
        
        // Left Arrow
        this.leftArrow = this.game.add.sprite(50, this.game.world.height - 200, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.angle = 270;
        
        
        // Upleft Arrow
        this.upleftArrow = this.game.add.sprite(100, this.game.world.height - 300, 'arrow');
        this.upleftArrow.anchor.setTo(0.5);
        this.upleftArrow.angle = 315;
        this.upleftArrow.alpha = .25;
        
        
        
        // Input Controls
        this.upArrow.customParams = {walkDirection: 'up'};
        this.upArrow.inputEnabled = true;
        this.upArrow.input.pixelPerfectClick = true;
        this.upArrow.events.onInputDown.add(this.movePlayer, this);
        this.upArrow.events.onInputUp.add(this.returnSize, this);
        
                
        this.rightArrow.customParams = {walkDirection: 'right', direction: 1};
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.movePlayer, this);
        this.rightArrow.events.onInputDown.add(this.switchStat, this);
        this.rightArrow.events.onInputUp.add(this.returnSize, this);
        
        
        this.downArrow.customParams = {walkDirection: 'down'};
        this.downArrow.inputEnabled = true;
        this.downArrow.input.pixelPerfectClick = true;
        this.downArrow.events.onInputDown.add(this.movePlayer, this);
        this.downArrow.events.onInputUp.add(this.returnSize, this);
        
        
        this.leftArrow.customParams = {walkDirection: 'left', direction: -1};
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.movePlayer, this);
        this.leftArrow.events.onInputDown.add(this.switchStat, this);
        this.leftArrow.events.onInputUp.add(this.returnSize, this);
        
    },
    
    
    
    update: function()
    {
        
    },
    
    
    
    someFunction: function(sprite, event)
    {
        console.log('Clicked on Alpha');
    },
    
    
    
    switchStat: function(sprite, event)
    {   
        
        if (this.isMoving)
        {
            return false;
        }

        this.isMoving = true;
        
        this.statText.visible = false;
        
        console.log('switch stat');
        
        sprite.scale.setTo(.75);
        
        var newStat, endX;
        
        if (sprite.customParams.direction > 0)
        {
            newStat = this.status.next();
            endX = this.game.world.width + this.currentStat.width/2;
        }
        else
        {
            newStat = this.status.previous();
            endX = -this.currentStat.width/2;
        }
        
        // Tweens
        var newStatMovement = this.game.add.tween(newStat);
        newStatMovement.to({x: this.game.world.centerX}, 1000);
        newStatMovement.onComplete.add(function()
        {
            this.isMoving = false;
            this.showText(newStat);
        }, this);
        
        newStatMovement.start();
        
        var currentStatMovement = this.game.add.tween(this.currentStat);
        currentStatMovement.to({x: endX}, 1000);
        currentStatMovement.start();
        
        this.currentStat.x = endX;
        newStat.x = this.game.world.centerX;
        this.currentStat = newStat;
        
    },
    
    
    
    moveStat: function(sprite, event)
    {
        console.log('move stat');
    },
    
    
    
    returnSize: function(sprite, event)
    {
        sprite.scale.setTo(1);
    },
    
    
    movePlayer: function(sprite, event)
    {
        sprite.scale.setTo(.75);
        this.walk = this.alpha_topdown_stand;
        
        if (sprite.customParams.walkDirection == 'up')
        {
            this.walk.animations.add('walk', [5,6,7,8,9]);
        }
        else if (sprite.customParams.walkDirection == 'down')
        {
            this.walk.animations.add('walk', [0,1,2,3,4]);
        }
        else if (sprite.customParams.walkDirection == 'right')
        {
            this.walk.scale.setTo(1,1);
            this.walk.animations.add('walk', [11,12,13,15,16,17]);
        }
        else if (sprite.customParams.walkDirection == 'left')
        {
            this.walk.scale.setTo(-1,1);
            this.walk.animations.add('walk', [11,12,13,15,16,17]);
        }
        
        this.walk.animations.play('walk', 6, true);
    },
    
    showText: function(stat)
    {
        if(!this.statText)
        {
            this.statText = this.game.add.text(this.game.width/2, this.game.height-125, '');
            this.statText.anchor.setTo(0.5);
        }
        
        this.statText.setText(stat.customParams.text);
        this.statText.visible = true;
    }
    
};

game.state.add('GameState', GameState);
game.state.start('GameState');