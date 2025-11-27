import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene{
    constructor(){
        super('MenuScene');
    }

    create(){
        this.add.text(480, 120, 'MATY & PILI', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const playBtn = this.add.text(480, 300, 'Jugar', {
            fontSize: '32px',
            color: '#00ff00',
        }).setOrigin(0.5)
        .setInteractive()
        .on('pointerover', () => this.scene.start('ForestLevelScene'));

        const creditsBtn = this.add.text(480, 380, 'Créditos', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () =>
            alert(`Mati & Pili - Fase 2\nAutores: Olga, Ismael y Samuel`)
        );
    }
}