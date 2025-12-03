export default class DeathScene extends Phaser.Scene
{
    constructor()
    {
        super('DeathScene');
    }

    create()
    {
        //Fondo
        this.add.image(800, 450, 'deathScene').setDisplaySize(1600, 900);

        //Texto secundario
        this.add.text(800, 384, 'Intentadlo de nuevo!',
        {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        //Botón vuelta al menú
        const volverBtn = this.add.image(800, 650, 'btnVolverOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => volverBtn.setTexture('btnVolverOn'))
            .on('pointerout',  () => volverBtn.setTexture('btnVolverOff'))
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}