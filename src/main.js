import Phaser, { Physics } from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import ForestLevelScene from './scenes/ForestLevelScene.js';
import WinScene from './scenes/WinScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [MenuScene, ForestLevelScene, WinScene],
    backgroundColor: '#8e9423ff',
}

const game = new Phaser.Game(config);