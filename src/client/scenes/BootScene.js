export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // ---- FONDO ----
        this.load.image('fondoBosque', 'assets/Escenario/Fondo.png');

        // ---- MATI ----
        this.load.spritesheet('matiIdle', 'assets/Mati/idleMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiWalk', 'assets/Mati/walkMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiDash', 'assets/Mati/dashMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiJump', 'assets/Mati/jumpMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiFall', 'assets/Mati/fallMati.png', { frameWidth: 256, frameHeight: 256 });

        // ---- PILI ----
        this.load.spritesheet('piliIdle', 'assets/Pili/idlePili.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('piliWalk', 'assets/Pili/walkPili.png', { frameWidth: 256, frameHeight: 256 });

        // ---- ESCENARIO / TILES ----
        this.load.spritesheet('platformTiles', 'assets/Escenario/Tiles/SpriteSheet/tilemap.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.image('grassL', 'assets/Escenario/Tiles/cespedIzquierda.png');
        this.load.image('grassM', 'assets/Escenario/Tiles/cespedCentro.png');
        this.load.image('grassR', 'assets/Escenario/Tiles/cespedDerecha.png');

        // ---- INTERACTIVOS ----
        this.load.spritesheet('switchActivation', 'assets/Escenario/Palanca/palanca.png',
            { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet('doorOpen', 'assets/Escenario/Puerta/puertaAnim.png',
            { frameWidth: 256, frameHeight: 256 });

        this.load.image('crystalOff', 'assets/Escenario/Boton/cristalApagado.png');
        this.load.image('crystalMid', 'assets/Escenario/Boton/cristalIntermedio.png');
        this.load.image('crystalOn', 'assets/Escenario/Boton/cristalEncendido.png');

        this.load.image('bridgeL', 'assets/Escenario/Puente/puenteIzquierda.png');
        this.load.image('bridgeM', 'assets/Escenario/Puente/puenteCentro.png');
        this.load.image('bridgeR', 'assets/Escenario/Puente/puenteDerecha.png');

        this.load.image('spike', 'assets/Escenario/Pinchos/pinchos.png');
        this.load.image('rock', 'assets/Escenario/Pedroloo/PiedraPili.png');

        this.load.spritesheet('pressure', 'assets/Escenario/Placa/placa.png', { frameWidth: 128, frameHeight: 128 });

        // ---- DECORACIÓN ----
        this.load.image('lamp', 'assets/Escenario/Decorations/decorations/lamp.png');
        this.load.image('sign', 'assets/Escenario/Decorations/decorations/sign.png');

        // ---- TUTORIALES ----
        this.load.image('tutoWASD', 'assets/Tutorial/WASD.png');
        this.load.image('tutoSHIFT', 'assets/Tutorial/Shift.png');
        this.load.image('tutoARROWS', 'assets/Tutorial/Flechas.png');

        // ---- INTERFACES ---- //
        this.load.image('frame', 'assets/Escenario/Marco.PNG');

        // ---- MENÚS ----
        this.load.image('menuScene', 'assets/Menus/FondoMenu.png');
        this.load.image('deathScene', 'assets/Menus/FondoMenuMuerte.png');
        this.load.image('winScene', 'assets/Menus/FondoMenuVictoria.png');

        this.load.image('btnJugarOff', 'assets/Menus/botonJugarApagado.PNG');
        this.load.image('btnJugarOn', 'assets/Menus/botonJugarEncendido.PNG');
        
        this.load.image('btnVolverOff', 'assets/Menus/botonVolverApagado.PNG');
        this.load.image('btnVolverOn', 'assets/Menus/botonVolverEncendido.PNG');

        this.load.image('btnCreditosOff', 'assets/Menus/botonCreditosApagado.PNG');
        this.load.image('btnCreditosOn', 'assets/Menus/botonCreditosEncendido.PNG');

        this.load.image('btnSalirOff', 'assets/Menus/botonSalirApagado.PNG');
        this.load.image('btnSalirOn', 'assets/Menus/botonSalirEncendido.PNG');

        this.load.image('btnReanudarOff', 'assets/Menus/botonReanudarApagado.PNG');
        this.load.image('btnReanudarOn', 'assets/Menus/botonReanudarEncendido.PNG');

        this.load.image('btnReiniciarOff', 'assets/Menus/botonReiniciarApagado.PNG');
        this.load.image('btnReiniciarOn', 'assets/Menus/botonReiniciarEncendido.PNG');

        this.load.image('btnstt', 'assets/Menus/ajustes.PNG');

        // ---- MÚSICA ----
        this.load.audio('menuMusic', 'assets/Musica/menu.mp3');
        this.load.audio('levelMusic', 'assets/Musica/level.mp3');
    }

    create() {
        // ---- ANIMACIONES ----
        this.anims.create({
            key: 'piliIdle',
            frames: this.anims.generateFrameNumbers('piliIdle', { start: 0, end: 19 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'piliWalk',
            frames: this.anims.generateFrameNumbers('piliWalk', { start: 0, end: 37 }),
            frameRate: 18,
            repeat: -1
        });

        this.anims.create({
            key: 'matiIdle',
            frames: this.anims.generateFrameNumbers('matiIdle', { start: 0, end: 12 }),
            frameRate: 14,
            repeat: -1
        });
        this.anims.create({
            key: 'matiWalk',
            frames: this.anims.generateFrameNumbers('matiWalk', { start: 0, end: 19 }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'matiDash',
            frames: this.anims.generateFrameNumbers('matiDash', { start: 0, end: 14 }),
            frameRate: 60,
            repeat: 0
        });
        this.anims.create({
            key: 'matiJump',
            frames: this.anims.generateFrameNumbers('matiJump', { start: 0, end: 22 }),
            frameRate: 34
        });
        this.anims.create({
            key: 'matiFall',
            frames: this.anims.generateFrameNumbers('matiFall', { start: 0, end: 9 }),
            frameRate: 34,
            repeat: -1
        });

        this.anims.create({
            key: 'switchActivation',
            frames: this.anims.generateFrameNumbers('switchActivation', { start: 0, end: 9 }),
            frameRate: 12
        });

        this.anims.create({
            key: 'doorOpen',
            frames: this.anims.generateFrameNumbers('doorOpen', { start: 0, end: 12 }),
            frameRate: 12
        });

        this.anims.create({
            key: 'pressOn',
            frames: this.anims.generateFrameNumbers('pressure', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'pressOff',
            frames: this.anims.generateFrameNumbers('pressure', { start: 6, end: 0 }),
            frameRate: 12,
            repeat: 0
        });

        this.events.emit('boot-complete');
    }
}
