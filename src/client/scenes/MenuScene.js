import Phaser from 'phaser';
import { connectionManager } from '../services/ConnectionManager';

export default class MenuScene extends Phaser.Scene{

    constructor()
    {
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

        // Boton Jugar Local
        const playBtn = this.add.image(300, 500, 'btnJugarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => playBtn.setTexture('btnJugarOn'))
            .on('pointerout',  () => playBtn.setTexture('btnJugarOff'))
            .on('pointerdown', () =>
            {
                this.menuMusic.stop();
                this.registry.set('gameMode', 'local');
                this.scene.start('TutorialLevelScene');
            })

        // Boton Jugar Online
        const onlineBtn = this.add.image(300, 400, 'btnJugarOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => onlineBtn.setTexture('btnJugarOn'))
            .on('pointerout',  () => onlineBtn.setTexture('btnJugarOff'))
            .on('pointerdown', () => 
            {
                if (!localStorage.getItem('token'))
                {
                    this.showWarning('Regístrate para jugar online');
                    return;
                }

                this.registry.set('gameMode', 'online');
                this.scene.start('LobbyScene');
            });

        // Boton Creditos
        const creditsBtn = this.add.image(500, 800, 'btnCreditosOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => creditsBtn.setTexture('btnCreditosOn'))
            .on('pointerout',  () => creditsBtn.setTexture('btnCreditosOff'))
            .on('pointerdown', () =>
                alert(`Mati & Pili - Fase 2\nAutores: Olga, Ismael y Samuel`));

        // Boton Ajustes
        const settingsBtn = this.add.image(1500, 70, 'btnstt')
            .setScale(0.1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('SettingsScene'));

        // Boton Usuario
        this.add.text(800, 50, 'Usuario')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () =>
            {
                this.scene.start('UserScene');
            });


        this.connectionText = this.add.text(400, 500, 'Servidor: Comprobando...',
            {
                fontSize: '18px',
                color: '#ffff00'
            }
        ).setOrigin(0.5);

        // Listener para cambios de conexión
        this.connectionListener = (data) => {
            this.updateConnectionDisplay(data);
        };
        connectionManager.addListener(this.connectionListener);
    }

    showWarning(text)
    {
        const warning = this.add.text(400, 200, text,
        {
            fontSize: '24px',
            color: '#ff4444',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        })
        .setOrigin(0.5);

        this.time.delayedCall(1000, () => warning.destroy());
    }

    

    updateConnectionDisplay(data) {
        // Solo actualizar si el texto existe (la escena está creada)
        if (!this.connectionText || !this.scene || !this.scene.isActive('MenuScene')) {
            return;
        }

        try {
            if (data.connected) {
                this.connectionText.setText(`Servidor: ${data.count} usuario(s) conectado(s)`);
                this.connectionText.setColor('#00ff00');
            } else {
                this.connectionText.setText('Servidor: Desconectado');
                this.connectionText.setColor('#ff0000');
            }
        } catch (error) {
            console.error('[MenuScene] Error updating connection display:', error);
        }
    }

    shutdown() {
        // Remover el listener
        if (this.connectionListener) {
            connectionManager.removeListener(this.connectionListener);
        }
    }
}