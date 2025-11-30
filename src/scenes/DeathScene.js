export default class WinScene extends Phaser.Scene{
    constructor(){
        super('WinScene');
    }

    create(){
        //Fondo
        this.add.rectangle(480,270,960,540, 0x000000, 0.8);

        //Texto principal
        this.add.text(800, 300, 'Habeis muerto',{
            fontSize: '64px',
            color: '#ff0000ff'
        }).setOrigin(0.5);

        //Texto secundario
        this.add.text(800, 384, 'Intentadlo de nuevo!',{
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        //Botón vuelta al menú
        const menuBtn = this.add.text(800, 700, 'Volver al menú',{
            fontSize: '32px',
            color:'#00ff00'
        }).setOrigin(0.5)
        .setInteractive({useHandCursor : true})
        .on('pointerover', () => menuBtn.setColor('#66ff66'))
        .on('pointerout', () => menuBtn.setColor('#00ff00'))
        .on("pointerdown", () => {
            this.scene.start("MenuScene");
        });
    }
}