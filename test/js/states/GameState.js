var GameState = {
	
	create: function() {
	
		console.log("Hello");
		
		var player = new HERO.Player(0,0, 100);
		var enemy = new ENEMY.Player(250, 250, 10);
		
		console.log(player.health);
		
		player = this.game.add.sprite(player.x, player.y, 'player');
		enemy = this.game.add.sprite(enemy.x, enemy.y, 'enemy');
	
	},
	
	gameOver: function() {
		this.game.state.start('GameoverState', true, false, 'Restart');
	}
	
}