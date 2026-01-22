export default class LoadScreen extends Phaser.Scene {
    constructor() {
        super('LoadScreen');
    }

    preload() {
        this.load.spritesheet('load', 'assets/Menus/carga.png', {
            frameWidth: 256,
            frameHeight: 256
        });
    }

    create()
    {
        // Crear animación del loader
        this.anims.create({
            key: 'loadAnim',
            frames: this.anims.generateFrameNumbers('load', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });

        // Sprite de carga
        this.loaderSprite = this.add.sprite(1500, 800, 'load').setScale(0.4);
        this.loaderSprite.play('loadAnim');

        // Lanzar BootScene en paralelo pero sin destruir LoadScreen
        this.scene.launch('BootScene');

        // Escuchar evento "done" enviado desde BootScene
        this.scene.get('BootScene').events.once('boot-complete', () => {
            this.scene.start('MenuScene');
        });

        const test = this.add.text(800, 450, '', { fontFamily: 'Rockwell' });

        const test2 = this.add.text(800, 450, '', { fontFamily: 'RockwellBold' });
    }
}