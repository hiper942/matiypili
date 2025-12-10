import Phaser from 'phaser';

export default class Pause extends Phaser.Scene
{
    constructor()
    {
        super('Pause');
    }

    create()
    {
        if (this.sound.get('levelMusic'))
        {
            this.sound.get('levelMusic').pause();
        }
        
        // Fondo semitransparente
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.6)
            .setOrigin(0);

        // Texto
        this.add.text(800, 150, 'PAUSA',
        {
            fontSize: '80px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Botón Continuar
        const continuarBtn = this.add.image(800, 350, 'btnReanudarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => continuarBtn.setTexture('btnReanudarOn'))
            .on('pointerout',  () => continuarBtn.setTexture('btnReanudarOff'))
            .on('pointerdown', () =>
            {
                if (this.sound.get('levelMusic'))
                {
                    this.sound.get('levelMusic').resume();
                }
                this.scene.stop();
                this.scene.resume('TutorialLevelScene');
                this.scene.resume('ForestLevelScene');
                this.scene.resume('ForestLevel2Scene');
            });

        // Botón Volver al Menú
        const menuBtn = this.add.image(800, 550, 'btnSalirOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => menuBtn.setTexture('btnSalirOn'))
            .on('pointerout',  () => menuBtn.setTexture('btnSalirOff'))
            .on('pointerdown', () =>
            {
                this.scene.stop();
                this.scene.stop('TutorialLevelScene');
                this.scene.stop('ForestLevelScene');
                this.scene.stop('ForestLevel2Scene');
                this.scene.start('MenuScene');
            });

        // Botón Volver al Menú
        const restartBtn = this.add.image(800, 750, 'btnReiniciarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restartBtn.setTexture('btnReiniciarOn'))
            .on('pointerout',  () => restartBtn.setTexture('btnReiniciarOff'))
            .on('pointerdown', () =>
            {
                this.scene.stop();
                this.scene.start('TutorialLevelScene');
            });

        // Pulsar ESC para continuar
        this.input.keyboard.once('keydown-ESC', () =>
        {
            if (this.sound.get('levelMusic'))
            {
                this.sound.get('levelMusic').resume();
            }
            
            this.scene.stop();
            this.scene.resume('TutorialLevelScene');
            this.scene.resume('ForestLevelScene');
            this.scene.resume('ForestLevel2Scene');
        });
    }
}