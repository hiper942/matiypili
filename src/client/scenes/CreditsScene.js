import Phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene
{
    constructor()
    {
        super('CreditsScene');
    }

    create()
    {
        const fondo = this.add.image(800, 450, 'creditos')
            .setDepth(-10);

        const menuBtn = this.add.image(800, 800, 'btnVolverOff')
            .setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => menuBtn.setTexture('btnVolverOn'))
            .on('pointerout',  () => menuBtn.setTexture('btnVolverOff'))
            .on('pointerdown', () => this.goToMenu());
    }

    goToMenu()
    {
        this.scene.start('MenuScene');
        this.scene.stop();
    }
}