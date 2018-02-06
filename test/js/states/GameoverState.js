var GameoverState = {
	create: function() {
		this.game.world.setBounds(0, 0, 420, 638);
		
		var style = { font: '20px Arial', fill: '#fff'};
		
		var startGame = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 25, 'Game Over', style);
		startGame.anchor.setTo(0.5, 0.5);
		
		var restartGame = this.game.add.text(this.game.world.centerX, this.game.world.centerY+ 25, 'Restart', style);
		restartGame.anchor.setTo(0.5, 0.5);
		
		restartGame.inputEnabled = true;
		restartGame.events.onInputDown.add(function() {this.game.state.start('HomeState');}, this);
	}
};