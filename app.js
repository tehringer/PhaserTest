"use strict";
/// <reference path="app.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        return _super.call(this, GAME, x, y, 'logo') || this;
    }
    return Player;
}(Phaser.Sprite));
/// <reference path="phaser.d.ts" />
/// <reference path="player.ts" />
var GAME;
var GensGame;
(function (GensGame) {
    function start() {
        GAME = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: preload, create: create });
    }
    GensGame.start = start;
    function preload() {
        GAME.load.image('logo', 'res/phaser-logo-small.png');
    }
    function create() {
        var logo = GAME.add.existing(new Player(GAME.world.centerX, GAME.world.centerY));
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        logo.scale.setTo(0.1, 0.1);
        GAME.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
    }
})(GensGame || (GensGame = {}));
window.onload = function () {
    var runningGame = GensGame.start();
};
