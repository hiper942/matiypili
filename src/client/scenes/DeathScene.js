export default class DeathScene extends Phaser.Scene
{
    constructor()
    {
        super('DeathScene');
        this.targetSceneKey = null;
    }

    init(data)
    {
        this.targetSceneKey = data.target;
    }

    create()
    {
        if (this.sound.get('levelMusic'))
        {
            this.sound.get('levelMusic').stop();
        }

        //Fondo
        this.add.image(800, 450, 'deathScene').setDisplaySize(1600, 900);

        const restartButton = this.add.image(800, 600, 'btnReiniciarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restartButton.setTexture('btnReiniciarOn'))
            .on('pointerout', () => restartButton.setTexture('btnReiniciarOff'))
            .on('pointerdown', () => this.restartLevel());

        //Botón vuelta al menú
        const cancelButton = this.add.image(800, 800, 'btnSalirOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => cancelButton.setTexture('btnSalirOn'))
            .on('pointerout', () => cancelButton.setTexture('btnSalirOff'))
            .on('pointerdown', () => this.goToMenu());
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
}