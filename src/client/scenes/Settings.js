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

        this.load.image('btnAjustes', 'assets/Escenario/Pedroloo/PiedraPili.PNG');

        this.load.image('fondoPausa', 'assets/Menus/FondoMenuPausa.png');
        this.load.image('fondoBosque', 'assets/Escenario/Fondo.png');
    }

    create()
    {
        if (this.sound.get('menuMusic'))
        {
            this.sound.get('menuMusic').stop();
        }
        
        // = FONDO = //
        this.add.image(800, 450, 'fondoBosque')
            .setDisplaySize(1600, 900)
            .setDepth(-10);

        // = PANEL AJUSTES = //
        this.add.image(680, 450, 'fondoPausa')
            .setDisplaySize(3200, 896)
            .setDepth(0);


        this.add.text(800, 120, 'AJUSTES',
        {
            color: '#ffffff',
            fontSize: '80px'
        })
        .setOrigin(0.5);

        // = SLIDER VOLUMEN MÚSICA = //
        this.add.text(350, 270, 'Volumen Música',
        { 
            fontSize: '40px', 
            color: '#fff' 
        })
        .setOrigin(0,0.5)
        .setDepth(2);

        const minX = 750;
        const maxX= 1100;
        const y = 280
        
        const bar = this.add.rectangle(minX, y, (maxX - minX), 6, 0xffffff)
            .setOrigin(0, 0.5)
            .setDepth(1);

        // HANDLE usando btnAjustes (más grande para que se vea)
        const handle = this.add.image( minX + (this.sound.volume * (maxX - minX)), y,
            'btnAjustes')
            .setScale(1)
            .setInteractive({ draggable: true })
            .setDepth(2)
            .setScrollFactor(0);

        this.input.setDraggable(handle);

        handle.on("drag", (pointer, x) =>
        {
            x = Phaser.Math.Clamp(x, minX, maxX);
            handle.x = x;

            const newVolume = (x - minX) / (maxX - minX);
            this.sound.volume = newVolume;
        });


        // = BOTÓN FULLSCREEN = //
        this.add.text(400, 570, 'Pantalla Completa',
        { 
            fontSize: '40px', 
            color: '#fff' 
        })
        .setOrigin(0, 0.5)
        .setDepth(2);

        const fullscreenBtn = this.add.image(900, 570, 'btnAjustes')
            .setScale(1)
            .setDepth(2)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0);

        fullscreenBtn.on('pointerdown', () =>
        {
            if (this.scale.isFullscreen)
            {
                this.scale.stopFullscreen();
                this.scale.resize(1600,896);
            }
            else
            {
                this.scale.startFullscreen();
                this.scale.resize(1980,1080);
            }
        });

        // = BOTÓN VOLVER = //
        const volverBtn = this.add.image(800, 780, 'btnVolverOff')
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => volverBtn.setTexture('btnVolverOn'))
            .on('pointerout',  () => volverBtn.setTexture('btnVolverOff'))
            .on('pointerdown', () => this.scene.start('MenuScene'));
        }
}
