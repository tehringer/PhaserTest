/// <reference path="phaser.d.ts" />
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GensGame;
    return {
        setters: [],
        execute: function () {
            (function (GensGame) {
                function start() {
                    GensGame.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: preload, create: create });
                }
                GensGame.start = start;
                function preload() {
                    GensGame.game.load.image('logo', 'res/phaser-logo-small.png');
                }
                function create() {
                    var logo = GensGame.game.add.sprite(GensGame.game.world.centerX, GensGame.game.world.centerY, 'logo');
                    logo.anchor.setTo(0.5, 0.5);
                    logo.scale.setTo(0.2, 0.2);
                    logo.scale.setTo(0.1, 0.1);
                    GensGame.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
                }
            })(GensGame || (GensGame = {}));
            exports_1("GensGame", GensGame);
            window.onload = function () {
                var game = GensGame.start();
            };
        }
    };
});
