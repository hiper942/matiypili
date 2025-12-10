import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene{
    preload(){
        // Fondos
        this.load.image('menuScene', 'assets/Menus/FondoMenu.png');
        this.load.image('winScene', 'assets/Menus/FondoMenuVictoria.png');
        this.load.image('deathScene', 'assets/Menus/FondoMenuMuerte.png');

       


    }

    constructor(){
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

        // Boton Jugar
        const playBtn = this.add.image(300, 500, 'btnJugarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => playBtn.setTexture('btnJugarOn'))
            .on('pointerout',  () => playBtn.setTexture('btnJugarOff'))
            .on('pointerdown', () =>
            {
                this.menuMusic.stop();
                this.scene.start('ForestLevel2Scene');
            })

        // Boton Creditos
        const creditsBtn = this.add.image(500, 800, 'btnCreditosOff')
            .setInteractive({ useHandCursor: true})
            .on('pointerover', () => creditsBtn.setTexture('btnCreditosOn'))
            .on('pointerout',  () => creditsBtn.setTexture('btnCreditosOff'))
            .on('pointerdown', () =>
                alert(`Mati & Pili - Fase 2\nAutores: Olga, Ismael y Samuel`));

        const settingsBtn = this.add.image(1500, 70, 'btnstt')
            .setScale(0.1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('SettingsScene'));
    }
}