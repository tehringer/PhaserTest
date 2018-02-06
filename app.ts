/// <reference path="phaser.d.ts" />

export namespace GensGame {

    export var game: Phaser.Game;

    export function start() {
        game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: preload, create: create });
    }

    function preload() {
        game.load.image('logo', 'res/phaser-logo-small.png');
    }

    function create() {
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        logo.scale.setTo(0.1, 0.1);
        game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
    }

}

window.onload = () => {
    var game = GensGame.start();
};