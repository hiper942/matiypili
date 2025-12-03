import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene{
    preload(){
        // Fondos
        this.load.image('menuScene', 'assets/Menus/FondoMenu.png');
        this.load.image('winScene', 'assets/Menus/FondoMenuVictoria.png');
        this.load.image('deathScene', 'assets/Menus/FondoMenuMuerte.png');

        // Botones ON/OFF
        this.load.image('btnJugarOff', 'assets/Menus/botonJugarApagado.PNG');
        this.load.image('btnJugarOn',  'assets/Menus/botonJugarEncendido.PNG');

        this.load.image('btnCreditosOff', 'assets/Menus/botonCreditosApagado.PNG');
        this.load.image('btnCreditosOn',  'assets/Menus/botonCreditosEncendido.PNG');

        this.load.image('btnVolverOff', 'assets/Menus/botonVolverApagado.PNG');
        this.load.image('btnVolverOn',  'assets/Menus/botonVolverEncendido.PNG');

        this.load.image('btnReiniciarOff', 'assets/Menus/botonReiniciarApagado.PNG');
        this.load.image('btnReiniciarOn',  'assets/Menus/botonReiniciarEncendido.PNG');

        this.load.image('btnSalirOff', 'assets/Menus/botonSalirApagado.PNG');
        this.load.image('btnSalirOn',  'assets/Menus/botonSalirEncendido.PNG');
    }

    constructor(){
        super('MenuScene');
    }

    create(){
        // = FONDO = //
        this.add.image(800, 450, 'menuScene').setDisplaySize(1600, 900);

        // ====================== //
        //      BOTÓN JUGAR       //
        // ====================== //
        const playBtn = this.add.image(300, 500, 'btnJugarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => playBtn.setTexture('btnJugarOn'))
            .on('pointerout',  () => playBtn.setTexture('btnJugarOff'))
            .on('pointerdown', () => this.scene.start('TutorialLevelScene'));


        // ====================== //
        //      BOTÓN CRÉDITOS    //
        // ====================== //
        const creditsBtn = this.add.image(500, 800, 'btnCreditosOff')
            .setInteractive({ useHandCursor: true})
            .on('pointerover', () => creditsBtn.setTexture('btnCreditosOn'))
            .on('pointerout',  () => creditsBtn.setTexture('btnCreditosOff'))
            .on('pointerdown', () =>
                alert(`Mati & Pili - Fase 2\nAutores: Olga, Ismael y Samuel`));
    }
}