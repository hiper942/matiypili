export default class BootScene extends Phaser.Scene 
{
    constructor() 
    {
        super('BootScene');
    }

    preload() 
    {
        // ---- FONDO ---- //
        this.load.image('fondoBosque', 'assets/Escenario/Fondo.PNG');

        this.load.image('fondoMadera', 'assets/Menus/fondoMadera.PNG');
        this.load.image('fondoTronco', 'assets/Menus/TroncoFondo.PNG');

        this.load.image('fondoPersonajes', 'assets/Menus/Seleccion/FondoSeleccion.PNG');
        this.load.image('fondoLobby', 'assets/Menus/OnlineMulti.PNG');
        this.load.image('creditos', 'assets/Menus/Creditos.PNG');

        // ---- SELECCIÓN PERSONAJES ---- //
        this.load.image('btnListoOff', 'assets/Menus/Seleccion/ListoApagado.PNG');
        this.load.image('btnListoOn', 'assets/Menus/Seleccion/ListoEncendido.PNG');

        this.load.image('btnEsperando', 'assets/Menus/Seleccion/Esperando.PNG');

        this.load.image('btnConflicto', 'assets/Menus/Seleccion/Conflicto.PNG');

        this.load.image('matiSplashOff', 'assets/Menus/Seleccion/MatiNegro.PNG');
        this.load.image('matiSplashR', 'assets/Menus/Seleccion/MatiRojo.PNG');
        this.load.image('matiSplashB', 'assets/Menus/Seleccion/MatiAzul.PNG');
        this.load.image('matiSplashG', 'assets/Menus/Seleccion/MatiVerde.PNG');

        this.load.image('piliSplashOff', 'assets/Menus/Seleccion/PiliNegro.PNG');
        this.load.image('piliSplashR', 'assets/Menus/Seleccion/PiliRojo.PNG');
        this.load.image('piliSplashB', 'assets/Menus/Seleccion/PiliAzul.PNG');
        this.load.image('piliSplashG', 'assets/Menus/Seleccion/PiliVerde.PNG');

        // ---- MATI ---- //
        this.load.spritesheet('matiIdle', 'assets/Mati/idleMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiWalk', 'assets/Mati/walkMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiDash', 'assets/Mati/dashMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiJump', 'assets/Mati/jumpMati.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('matiFall', 'assets/Mati/fallMati.png', { frameWidth: 256, frameHeight: 256 });

        // ---- PILI ---- //
        this.load.spritesheet('piliIdle', 'assets/Pili/idlePili.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('piliWalk', 'assets/Pili/walkPili.png', { frameWidth: 256, frameHeight: 256 });

        // ---- ESCENARIO / TILES ---- //
        this.load.spritesheet('platformTiles', 'assets/Escenario/Tiles/SpriteSheet/tilemap.png',
            { frameWidth: 64, frameHeight: 64 });

        // ---- INTERACTIVOS ---- //
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

        this.load.image('spike', 'assets/Escenario/Pinchos/pinchos.PNG');
        this.load.image('rock', 'assets/Escenario/Pedroloo/PiedraPili.png');

        this.load.spritesheet('pressure', 'assets/Escenario/Placa/placa.png', { frameWidth: 128, frameHeight: 128 });

        // ---- DECORACIÓN ---- //
        this.load.image('grassL', 'assets/Escenario/Tiles/cespedIzquierda.png');
        this.load.image('grassM', 'assets/Escenario/Tiles/cespedCentro.png');
        this.load.image('grassR', 'assets/Escenario/Tiles/cespedDerecha.png');

        this.load.image('bushS', 'assets/Escenario/Decoraciones/Arbusto.PNG');
        this.load.image('bushL', 'assets/Escenario/Decoraciones/ArbustoGrande.PNG');

        this.load.image('yellowCrystal', 'assets/Escenario/Decoraciones/CristalAmarillo.PNG');
        this.load.image('greenCrystal', 'assets/Escenario/Decoraciones/CristalVerde.PNG');

        this.load.image('lamp', 'assets/Escenario/Decoraciones/Farolillo.PNG');

        this.load.image('vine1', 'assets/Escenario/Decoraciones/Liana1.PNG');
        this.load.image('vine2', 'assets/Escenario/Decoraciones/Liana2.PNG');
        this.load.image('vine3', 'assets/Escenario/Decoraciones/LianasArbol.PNG');
        this.load.image('vine4', 'assets/Escenario/Decoraciones/LianasArbolFinal.PNG');
        this.load.image('vineL', 'assets/Escenario/Decoraciones/Liana3.PNG');
        this.load.image('vineArch', 'assets/Escenario/Decoraciones/archVine.png');

        this.load.image('mossR', 'assets/Escenario/Decoraciones/MusgoArbolDerecha.PNG');
        this.load.image('mossL', 'assets/Escenario/Decoraciones/MusgoArbolIzquierda.PNG');
        this.load.image('mossB', 'assets/Escenario/Decoraciones/MusgoFinalAbajo.PNG');
        this.load.image('mossT', 'assets/Escenario/Decoraciones/MusgoFinalArriba.PNG');
        this.load.image('mossU', 'assets/Escenario/Decoraciones/MusgoHorizontal.PNG');
        this.load.image('mossCornerR', 'assets/Escenario/Decoraciones/MusgoRamaFinalDerecha.PNG');
        this.load.image('mossCornerL', 'assets/Escenario/Decoraciones/MusgoRamaFinalIzquierda.PNG');

        this.load.image('stoneL', 'assets/Escenario/Decoraciones/PiedraGrande.PNG');
        this.load.image('stoneM', 'assets/Escenario/Decoraciones/PiedraMediana.PNG');
        this.load.image('stoneS', 'assets/Escenario/Decoraciones/PiedraPequeña.PNG');

        this.load.image('branch', 'assets/Escenario/Decoraciones/planta.PNG');

        this.load.image('shrooms1', 'assets/Escenario/Decoraciones/Setas2.PNG');
        this.load.image('shrooms2', 'assets/Escenario/Decoraciones/Setas3.PNG');

        this.load.image('up', 'assets/Escenario/Decoraciones/arriba.png');
        this.load.image('right', 'assets/Escenario/Decoraciones/derecha.png');
        this.load.image('left', 'assets/Escenario/Decoraciones/izquierda.png');
        this.load.image('down', 'assets/Escenario/Decoraciones/abajo.png');
        this.load.image('upR', 'assets/Escenario/Decoraciones/diagonalDerecha.png');
        this.load.image('upL', 'assets/Escenario/Decoraciones/diagonalIzquierda.png');

        this.load.spritesheet('swirly', 'assets/Escenario/Decoraciones/espiral.png', { frameWidth: 128, frameHeight: 128 });
        
        this.load.spritesheet('fireflies', 'assets/Escenario/Decoraciones/luciernagas.png', { frameWidth: 128, frameHeight: 128 });

        // ---- TUTORIALES ---- //
        this.load.image('tutoWASD', 'assets/Tutorial/WASD.png');
        this.load.image('tutoSHIFT', 'assets/Tutorial/Shift.png');
        this.load.image('tutoARROWS', 'assets/Tutorial/Flechas.png');

        // ---- INTERFACES ---- //
        this.load.image('frame', 'assets/Escenario/Marco.PNG');
        this.load.image('light', 'assets/Escenario/Luz.PNG');

        // ---- MENÚS ---- //
        this.load.image('menuScene', 'assets/Menus/FondoMenu.PNG');
        this.load.image('deathScene', 'assets/Menus/FondoMenuMuerte.PNG');
        this.load.image('winScene', 'assets/Menus/FondoMenuVictoria.PNG');

        this.load.image('btnJugarOff', 'assets/Menus/botonJugarApagado.PNG');
        this.load.image('btnJugarOn', 'assets/Menus/botonJugarEncendido.PNG');

        this.load.image('btnOnlineOff', 'assets/Menus/onlineApagado.PNG');
        this.load.image('btnOnlineOn', 'assets/Menus/onlineEncendido.PNG');

        this.load.image('btnOfflineOff', 'assets/Menus/offlineApagado.PNG');
        this.load.image('btnOfflineOn', 'assets/Menus/offlineEncendido.PNG'); 
        
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

        this.load.image('btnUsuarioOff', 'assets/Menus/usuarioApagado.PNG');
        this.load.image('btnUsuarioOn', 'assets/Menus/usuarioEncendido.PNG');

        this.load.image('btnstt', 'assets/Menus/ajustes.png');

        // ---- MÚSICA ---- //
        this.load.audio('menuMusic', 'assets/Musica/menu.mp3');
        this.load.audio('levelMusic', 'assets/Musica/level.mp3');

        // ---- LOGIN ---- //
        this.load.html('loginForm', 'assets/ui/login.html');
        this.load.html('registerForm', 'assets/ui/register.html');

        this.load.image('fondoUsuario', 'assets/Menus/Leaderboard/LeaderboardFondo.PNG');

        this.load.image('cell1', 'assets/Menus/Leaderboard/Casilla1.PNG');
        this.load.image('cell2', 'assets/Menus/Leaderboard/Casilla2.PNG');

        this.load.image('btnLoginOff', 'assets/Menus/Usuario/IniciarApagado.PNG');
        this.load.image('btnLoginOn', 'assets/Menus/Usuario/IniciarEncendido.PNG');

        this.load.image('btnRegistrarOff', 'assets/Menus/Usuario/RegApagado.PNG');
        this.load.image('btnRegistrarOn', 'assets/Menus/Usuario/RegEncendido.PNG');

        this.load.image('btnLogoutOff', 'assets/Menus/logoutApagado.PNG');
        this.load.image('btnLogoutOn', 'assets/Menus/logoutEncendido.PNG');

        this.load.image('inputBack', 'assets/Menus/Usuario/UsuarioContraseña.PNG');
    }

    create()
    {
        // ---- ANIMACIONES ---- //
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

        this.anims.create({
            key: 'flies',
            frames: this.anims.generateFrameNumbers('fireflies', { start: 0, end: 157 }),
            frameRate: 24,
            repeat: -1
        })

        this.anims.create({
            key: 'swirl',
            frames: this.anims.generateFrameNumbers('swirly', { start: 0, end: 35 }),
            frameRate: 6,
            repeat: -1
        })

        this.events.emit('boot-complete');
    }
}