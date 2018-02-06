var HomeState = {
	create: function() {
		var style = { font: '20px Arial', fill: '#fff'};
		
		var startGame = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Start', style);
		startGame.anchor.setTo(0.5, 0.5);
		
		startGame.inputEnabled = true;
		startGame.events.onInputDown.add(function() {this.game.state.start('GameState');}, this);
	}
};