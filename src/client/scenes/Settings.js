import Phaser from 'phaser';

export default class Settings extends Phaser.Scene
{
    constructor()
    {
        super('Settings');
    }

    init(data)
    {
        this.targetSceneKey = data.target;
    }

    create()
    {
        if (this.sound.get('menuMusic'))
        {
            this.sound.get('menuMusic').stop();
        }
        
        // = FONDO = //
        this.add.image(800, 450, 'fondoMadera')
            .setDisplaySize(1600, 900)
            .setDepth(-10);

        // = PANEL AJUSTES = //
        this.add.image(800, 450, 'fondoTronco')
            .setDisplaySize(1600, 900)
            .setScale(1.5, 1)
            .setDepth(-5);


        this.add.text(800, 120, 'AJUSTES',
        {
            color: '#21170B',
            fontFamily: 'Rockwell',
            fontSize: '80px'
        })
        .setOrigin(0.5);

        // = SLIDER VOLUMEN MÚSICA = //
        this.add.text(350, 270, 'Volumen Música',
        { 
            fontSize: '40px',
            fontFamily: 'Rockwell', 
            color: '#21170B'
        })
        .setOrigin(0,0.5)
        .setDepth(2);

        const minX = 750;
        const maxX= 1100;
        const y = 280
        
        const bar = this.add.rectangle(minX, y, (maxX - minX), 6, 0x684927)
            .setOrigin(0, 0.5)
            .setDepth(1);

        // HANDLE usando btnAjustes (más grande para que se vea)
        const handle = this.add.image( minX + (this.sound.volume * (maxX - minX)), y,
            'rock')
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
        this.add.text(350, 570, 'Pantalla Completa',
        { 
            fontSize: '40px',
            fontFamily: 'Rockwell',
            color: '#21170B'
            
        })
        .setOrigin(0, 0.5)
        .setDepth(2);

        const fullscreenBtn = this.add.image(900, 570, 'rock')
            .setScale(1)
            .setDepth(2)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0);

        fullscreenBtn.on('pointerdown', () =>
        {
            if (this.scale.isFullscreen)
            {
                this.scale.stopFullscreen();
                this.game.scale.resize(1600, 900);
            }
            else
            {
                this.scale.startFullscreen();
                this.game.scale.resize(1600, 900);
            }
        });

        // = BOTÓN VOLVER = //
        const volverBtn = this.add.image(800, 780, 'btnVolverOff')
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => volverBtn.setTexture('btnVolverOn'))
            .on('pointerout',  () => volverBtn.setTexture('btnVolverOff'))
            .on('pointerdown', () => this.exitSettings());
    }

    exitSettings()
    {
        if (this.targetSceneKey == 'MenuScene')
        {
            this.scene.start(this.targetSceneKey)
        }
        else
        {
            this.scene.stop();
            this.scene.resume(this.targetSceneKey);
        }
    }
}