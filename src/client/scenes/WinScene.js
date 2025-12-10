import Phaser from 'phaser';

export default class WinScene extends Phaser.Scene
{
    constructor()
    {
        super('WinScene');
    }

    create()
    {
        if (this.sound.get('levelMusic'))
        {
            this.sound.get('levelMusic').stop();
        }
        
        //Fondo
        this.add.image(800, 450, 'winScene').setDisplaySize(1600, 900);

        //Botón vuelta al menú
        const volverBtn = this.add.image(800, 650, 'btnVolverOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => volverBtn.setTexture('btnVolverOn'))
            .on('pointerout',  () => volverBtn.setTexture('btnVolverOff'))
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}