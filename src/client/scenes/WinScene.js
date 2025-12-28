import Phaser from 'phaser';

export default class WinScene extends Phaser.Scene
{
    constructor()
    {
        super('WinScene');
    }

    create()
    {
        this.sendTime();
        
        if (this.sound.get('levelMusic'))
        {
            this.sound.get('levelMusic').stop();
        }
        
        //Fondo
        this.add.image(800, 450, 'winScene').setDisplaySize(1600, 900);

        //Botón vuelta al menú
        const volverBtn = this.add.image(800, 650, 'btnVolverOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => volverBtn.setTexture('btnVolverOn'))
            .on('pointerout',  () => volverBtn.setTexture('btnVolverOff'))
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }

    async sendTime()
    {
        const startTime = this.registry.get('runStartTime');
        const endTime = Date.now();

        const totalTimeMs = endTime - startTime;
        const totalTimeSeconds = (totalTimeMs / 1000).toFixed(2);

        console.log('Tiempo total: ', totalTimeSeconds, 's');
        
        await fetch('/api/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                time: totalTimeMs
            })
            });
    }
}