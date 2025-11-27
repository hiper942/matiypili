import Phaser, { Physics } from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import ForestLevelScene from './scenes/ForestLevelScene.js';
import WinScene from './scenes/WinScene.js';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [MenuScene, ForestLevelScene, WinScene],
    backgroundColor: '#173327',
}

const game = new Phaser.Game(config);