import Phaser from 'phaser';

export default class WinScene extends Phaser.Scene
{
    constructor()
    {
        super('WinScene');

        this.levelId = 'win';
    }

    create()
    {
        
        
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

        const time = this.add.text(innerWidth/2, 800, 'Time: ' + this.getTime(), { fontFamily: 'RockwellBold', fontSize: '24px', color: '#ffffff', align: 'center' });
        
        this.getTime();
    }

    getTime()
    {
        const startTime = this.registry.get('runStartTime');
        const endTime = Date.now();

        const totalTimeMs = endTime - startTime;
        const totalTimeSeconds = (totalTimeMs / 1000).toFixed(2);

        console.log('Tiempo total: ', totalTimeSeconds, 's');

        return this.formatTime(totalTimeMs);
    }

    formatTime(ms)
    {
        if (ms == null) return '--:--.---';

        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const millis  = ms % 1000;

        return `${minutes}:${seconds.toString().padStart(2,'0')}.${millis.toString().padStart(3,'0')}`;
    }
}