import Phaser from 'phaser';

export default class SettingsScene extends Phaser.Scene
{
    constructor()
    {
        super('SettingsScene');
    }

    preload()
    {
        // Botones y fondo
        this.load.image('btnVolverOff', 'assets/Menus/botonVolverApagado.PNG');
        this.load.image('btnVolverOn',  'assets/Menus/botonVolverEncendido.PNG');

        this.load.image('sliderBar', 'assets/Menus/sliderBar.png');
        this.load.image('sliderHandle', 'assets/Menus/sliderHandle.png');

        this.load.image('fullscreenOff', 'assets/Menus/fullscreenOff.png');
        this.load.image('fullscreenOn', 'assets/Menus/fullscreenOn.png');

        this.load.image('menuScene', 'assets/Menus/FondoMenu.png');
    }

    create()
    {
        if (this.sound.get('menuMusic'))
        {
            this.sound.get('menuMusic').stop();
        }
        
        // = FONDO = //
        this.add.image(800, 450, 'menuScene')
            .setDisplaySize(1600, 900);

        this.add.text(800, 120, 'AJUSTES', {
            color: '#ffffff',
            fontSize: '80px'
        }).setOrigin(0.5);

        // = SLIDER VOLUMEN MÚSICA = //
        this.add.text(400, 250, 'Volumen Música', { fontSize: '40px', color: '#fff' });

        const musicBar = this.add.image(900, 270, 'sliderBar');
        const musicHandle = this.add.image(900 - 200 * 400, 270, 'sliderHandle')
            .setInteractive({ draggable: true });

        this.input.setDraggable(musicHandle);

        musicHandle.on('drag', (pointer, x) => {
            x = Phaser.Math.Clamp(x, 700, 1100);
            musicHandle.x = x;

            const newVolume = (x - 700) / 400;
            this.sound.volume = newVolume;
        });

        // = BOTÓN FULLSCREEN = //
        this.add.text(400, 550, 'Pantalla Completa', { fontSize: '40px', color: '#fff' });

        const fullscreenBtn = this.add.image(900, 570,
            this.scale.isFullscreen ? 'fullscreenOn' : 'fullscreenOff'
        )
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                fullscreenBtn.setTexture('fullscreenOff');
            } else {
                this.scale.startFullscreen();
                fullscreenBtn.setTexture('fullscreenOn');
            }
        });

        // = BOTÓN VOLVER = //
        const volverBtn = this.add.image(800, 780, 'btnVolverOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => volverBtn.setTexture('btnVolverOn'))
            .on('pointerout',  () => volverBtn.setTexture('btnVolverOff'))
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}
