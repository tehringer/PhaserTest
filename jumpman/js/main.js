var game = new Phaser.Game(432, 648, Phaser.AUTO);

game.state.add('BootState', BootState);
game.state.add('PreloadState', PreloadState);
game.state.add('HomeState', HomeState);
game.state.add('GameState', GameState);
game.state.add('GameoverState', GameoverState);
game.state.start('BootState');