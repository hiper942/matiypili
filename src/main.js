import Phaser, { Physics } from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import ForestLevelScene from './scenes/ForestLevelScene.js';
import TutorialLevelScene from './scenes/TutorialLevelScene.js';
import ForestLevel2Scene from './scenes/ForestLevel2Scene.js';
import WinScene from './scenes/WinScene.js';
import DeathScene from './scenes/DeathScene.js';
import Pause from './scenes/Pause.js';
import Settings from './scenes/Settings.js'

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 896,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [MenuScene, Pause, Settings, TutorialLevelScene, ForestLevelScene, ForestLevel2Scene, WinScene, DeathScene],
    backgroundColor: '#8e9423ff',
}

const game = new Phaser.Game(config);