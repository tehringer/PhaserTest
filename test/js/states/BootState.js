var BootState = {	
	
	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;		
	},
	
	create: function() {
		this.game.state.start('PreloadState');
	}
};