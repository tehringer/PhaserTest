/// <reference path="phaser.d.ts" />
/// <reference path="player.ts" />
/// <reference path="image-map.ts" />

var GAME: Phaser.Game;

namespace GensGame {

    export function start() {
        GAME = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: preload, create: create });
    }

    function preload() {
        imageMappings.images.forEach(a => GAME.load.image(a[0], a[1]));
    }

    function create() {
        var logo = GAME.add.existing(new Player(GAME.world.centerX, GAME.world.centerY));
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        GAME.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
    }

}

window.onload = () => {
    var runningGame = GensGame.start();
};