import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene{
    constructor(){
        super('MenuScene');
    }

    create(){
        this.add.text(800, 350, 'MATI & PILI', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const playBtn = this.add.text(800, 500, 'Jugar', {
            fontSize: '32px',
            color: '#aaa82aff',
        }).setOrigin(0.5)
        .setInteractive()
        .on('pointerover', () => playBtn.setColor('#dfdc32ff'))
        .on('pointerout', () => playBtn.setColor('#aaa82aff'))
        .on('pointerdown', () => this.scene.start('TutorialLevelScene'))


        const creditsBtn = this.add.text(800, 600, 'Créditos', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () =>
            alert(`Mati & Pili - Fase 2\nAutores: Olga, Ismael y Samuel`)
        );
    }
}