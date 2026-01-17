import Phaser from 'phaser';

export default class Pause extends Phaser.Scene
{
    constructor()
    {
        super('Pause');
        this.targetSceneKey = null;
    }

    init(data)
    {
        this.targetSceneKey = data.target;
    }

    create()
    {
        const music = this.sound.get('levelMusic');
        if (music) music.pause();

        this.input.setTopOnly(true);
        
        // Fondo semitransparente
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.6)
            .setOrigin(0);

        // Texto
        this.add.text(800, 150, 'PAUSA',
        {
            fontSize: '80px',
            color: '#ffffff',
            fontFamily: 'Rockwell'
        }).setOrigin(0.5);

        // Botón Continuar
        const continuarBtn = this.add.image(800, 350, 'btnReanudarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => continuarBtn.setTexture('btnReanudarOn'))
            .on('pointerout',  () => continuarBtn.setTexture('btnReanudarOff'))
            .on('pointerdown', () => this.resumeGame());

        // Boton Reiniciar
        const reiniciarBtn = this.add.image(800, 550, 'btnReiniciarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => reiniciarBtn.setTexture('btnReiniciarOn'))
            .on('pointerout',  () => reiniciarBtn.setTexture('btnReiniciarOff'))
            .on('pointerdown', () => this.restartLevel());


        // Botón Volver al Menú
        const menuBtn = this.add.image(800, 750, 'btnSalirOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => menuBtn.setTexture('btnSalirOn'))
            .on('pointerout',  () => menuBtn.setTexture('btnSalirOff'))
            .on('pointerdown', () => this.goToMenu());

        // Boton Ajustes
        const settingsBtn = this.add.image(1500, 70, 'btnstt')
            .setScale(0.1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.goToSettings());

        // Pulsar ESC para continuar
        this.input.keyboard.once('keydown-ESC', () => this.resumeGame());
    }

    resumeGame()
    {
        const music = this.sound.get('levelMusic');
        if (music) music.resume();

        this.scene.stop();
        this.scene.resume(this.targetSceneKey);
    }

    restartLevel()
    {
        this.scene.stop();
        this.scene.stop(this.targetSceneKey);
        this.scene.start(this.targetSceneKey);
    }

    goToMenu()
    {
        const gameScene = this.scene.get(this.targetSceneKey);

        if (gameScene?.handleDisconnection) gameScene.handleDisconnection('exit_to_menu');
        
        this.scene.start('MenuScene');
        this.scene.stop(this.targetSceneKey);
        this.scene.stop();
    }

    goToSettings()
    {
        this.scene.pause();
        this.scene.launch('Settings', { target: this.scene.key});
        this.scene.bringToTop('Settings');
        
    }
}