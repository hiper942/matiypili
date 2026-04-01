import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene{

    constructor()
    {
        super('MenuScene');
    }

    create()
    {
        // = MUSICA = //   
        this.menuMusic = this.sound.add('menuMusic', {
            loop: true,
            volume: 0.5
        });

        this.menuMusic.play();
        
        // = FONDO = //
        this.add.image(800, 450, 'menuScene').setDisplaySize(1600, 900);

        // Boton Jugar Local
        const playBtn = this.add.image(300, 350, 'btnOfflineOff')
            .setScale(0.6)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => playBtn.setTexture('btnOfflineOn'))
            .on('pointerout',  () => playBtn.setTexture('btnOfflineOff'))
            .on('pointerdown', () =>
            {
                this.menuMusic.stop();
                this.registry.set('gameMode', 'local');
                this.scene.start('TutorialLevelScene');
            })

        // Boton Usuario
        const userBtn = this.add.image(300, 650, 'btnUsuarioOff')
            .setScale(0.6)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => userBtn.setTexture('btnUsuarioOn'))
            .on('pointerout',  () => userBtn.setTexture('btnUsuarioOff'))
            .on('pointerdown', () => this.notImplemented());

        // Boton Jugar Online
        const onlineBtn = this.add.image(300, 500, 'btnOnlineOff')
            .setScale(0.6)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => onlineBtn.setTexture('btnOnlineOn'))
            .on('pointerout',  () => onlineBtn.setTexture('btnOnlineOff'))
            .on('pointerdown', () => this.notImplemented());

        // Boton Creditos
        const creditsBtn = this.add.image(300, 800, 'btnCreditosOff')
            .setScale(0.6)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => creditsBtn.setTexture('btnCreditosOn'))
            .on('pointerout',  () => creditsBtn.setTexture('btnCreditosOff'))
            .on('pointerdown', () =>
                this.scene.start('CreditsScene'));

        // Boton Ajustes
        const settingsBtn = this.add.image(1500, 70, 'btnstt')
            .setScale(0.1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Settings', { target: this.scene.key }));
    }

    notImplemented()
    {
        this.showWarning("No implementado en esta plataforma\nVisita nuestro GitHub para más!");
    }

    showWarning(text)
    {
        const warning = this.add.text(800, 450, text,
        {
            fontSize: '24px',
            fontFamily: 'Rockwell',
            color: '#ff4444',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 6 }
        })
        .setOrigin(0.5);

        this.time.delayedCall(1000, () => warning.destroy());
    }
}