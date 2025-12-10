import Phaser, { Physics } from 'phaser';
import LoadScreen from './scenes/LoadScreen.js';
import MenuScene from './scenes/MenuScene.js';
import CreditsScene from './scenes/CreditsScene.js';
import TutorialLevelScene from './scenes/TutorialLevelScene.js';
import ForestLevel1Scene from './scenes/ForestLevel1Scene.js';
import ForestLevel2Scene from './scenes/ForestLevel2Scene.js';
import ForestLevel3Scene from './scenes/ForestLevel3Scene.js';
import BootScene from './scenes/BootScene.js';
import WinScene from './scenes/WinScene.js';
import DeathScene from './scenes/DeathScene.js';
import Pause from './scenes/Pause.js';
import Settings from './scenes/Settings.js';

const config = 
{
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: 'game-container',

    scale: 
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 900 },
            debug: false
        }
    },
    
    scene: [
        LoadScreen,
        BootScene,
        MenuScene,
        CreditsScene,
        Settings,
        Pause,
        WinScene,
        DeathScene,
        TutorialLevelScene,
        ForestLevel1Scene,
        ForestLevel2Scene,
        ForestLevel3Scene
    ],
    backgroundColor: '#8e9423ff',
}

const game = new Phaser.Game(config);