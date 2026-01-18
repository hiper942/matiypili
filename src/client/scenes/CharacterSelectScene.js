import Phaser from 'phaser';

export default class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super('CharacterSelectScene');
    }

    init(data) {
        // data viene del lobby / matchmaking
        // { socket, playerIndex }
        this.socket = data.ws;
        this.playerIndex = data.playerIndex; // 1 o 2
        this.roomId = data.roomId;
    }

    create()
    {
        console.log('Soy el jugador:', this.playerIndex);

        this.selectedCharacter = null;
        this.isReady = false;
        
        this.otherSelection = null;
        this.readyState = { 1: false, 2: false };
        this.hasConflict = false;

        // ===== FONDO =====
        this.add.image(800, 450, 'fondoPersonajes').setDepth(-10);

        // ===== JUGADOR =====
        this.add.text(
            800,
            200,
            this.playerIndex === 1 ? 'JUGADOR 1' : 'JUGADOR 2',
            {
                fontSize: '28px',
                fontFamily: 'Rockwell',
                color: this.playerIndex === 1 ? '#3399ff' : '#ff5555'
            }
        ).setOrigin(0.5);

        /* =========================
           CARTA MATI
        ========================= */

        this.matiCard = this.add.image(430, 470, 'matiSplashOff')
            .setDisplaySize(430, 580)
            .setInteractive({ useHandCursor: true });

        this.matiCard.on('pointerdown', () => {
            this.selectCharacter('mati');
        });

        /* =========================
           CARTA PILI
        ========================= */

        this.piliCard = this.add.image(1035, 470, 'piliSplashOff')
            .setDisplaySize(700, 580)
            .setInteractive({ useHandCursor: true });

        this.piliCard.on('pointerdown', () => {
            this.selectCharacter('pili');
        });

        /* =========================
           BOTÓN LISTO
        ========================= */

        this.readyBtn = this.add.image(800, 800, 'btnListoOff')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.confirmReady());

        this.state = this.add.text(800, 800, '')
            .setFontSize(48)
            .setOrigin(0.5)
            .setFontFamily('Rockwell')
            .setVisible(false);

        /* =========================
        BOTON VOLVER AL MENU
        ========================= */

        const menuBtn = this.add.image(200, 800, 'btnSalirOff')
                .setScale(0.5)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => menuBtn.setTexture('btnSalirOn'))
                .on('pointerout',  () => menuBtn.setTexture('btnSalirOff'))
                .on('pointerdown', () => this.goToMenu());

        /* =========================
           SOCKET LISTENERS
        ========================= */

        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {

                case 'selectionUpdate':
                    this.updateRemoteState(data);
                    break;

                case 'startGame':
                    this.scene.start('TutorialLevelSceneOnline', {
                        playerIndex: this.playerIndex,
                        character: data.players[this.playerIndex],
                        roomId: this.roomId,
                        socket: this.socket
                    });
                    break;
            }
        });

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
        this.events.once(Phaser.Scenes.Events.DESTROY, this.onShutdown, this);
    }

    /* =========================
       SELECCIÓN
    ========================= */

    selectCharacter(character)
    {
        this.selectedCharacter = character;

        if (character === 'mati')
        {
            this.playerIndex === 1 ? this.matiCard.setTexture('matiSplashB') : this.matiCard.setTexture('matiSplashR');
            this.otherSelection === 'pili' ? this.piliCard.setTexture(this.playerIndex === 1 ? 'piliSplashR' : 'piliSplashB') : this.piliCard.setTexture('piliSplashOff');
        }

        if (character === 'pili')
        {
            this.playerIndex === 1 ? this.piliCard.setTexture('piliSplashB') : this.piliCard.setTexture('piliSplashR');
            this.otherSelection === 'mati' ? this.matiCard.setTexture(this.playerIndex === 1 ? 'matiSplashR' : 'matiSplashB') : this.matiCard.setTexture('matiSplashOff');
        }
        
        this.socket.send(JSON.stringify({
            type: 'selectCharacter',
            character
        }));

        this.readyBtn.setTexture('btnListoOn');
    }


    /* =========================
       CONFIRMAR LISTO
    ========================= */

    confirmReady()
    {
        if (!this.selectedCharacter || this.isReady || this.hasConflict) return;

        this.isReady = true;

        this.readyBtn.active = false;
        
        this.state.setText('ESPERANDO...')
            .setColor('#777777');

        this.socket.send(JSON.stringify({
            type: 'playerReady'
        }));
    }

    updateRemoteState(data)
    {
        const myId = this.playerIndex;
        const otherId = myId === 1 ? 2 : 1;

        // Guardar estados
        this.hasConflict = data.conflict;
        this.readyState = data.ready;

        // Mostrar selección del otro
        if (data.selections[otherId])
        {
            if (data.selections[otherId] === 'mati')
            {
                otherId === 1 ? this.matiCard.setTexture('matiSplashR') : this.matiCard.setTexture('matiSplashB');
                this.selectedCharacter === 'pili' ? this.piliCard.setTexture(otherId === 1 ? 'piliSplashB' : 'piliSplashR') : this.piliCard.setTexture('piliSplashOff');
            }

            if (data.selections[otherId] === 'pili')
            {
                otherId === 1 ? this.piliCard.setTexture('piliSplashR') : this.piliCard.setTexture('piliSplashB');
                this.selectedCharacter === 'mati' ? this.matiCard.setTexture(otherId === 1 ? 'matiSplashB' : 'matiSplashR') : this.matiCard.setTexture('matiSplashOff');
            }
        }

        // Conflicto -> verde
        if (data.conflict)
        {
            const conflictedCharacter = data.selections[1];
            // da igual 1 o 2, son iguales en conflicto

            if (conflictedCharacter === 'mati')
            {
                this.matiCard.setTexture('matiSplashG');
                this.piliCard.setTexture('piliSplashOff');
            }

            if (conflictedCharacter === 'pili')
            {
                this.piliCard.setTexture('piliSplashG');
                this.matiCard.setTexture('matiSplashOff');
            }

            this.readyBtn.setVisible(false);

            this.state.setText('CONFLICTO')
                .setColor('#00ff00')
                .setVisible(true);

            return;
        }
        else if (!this.isReady)
        {
            this.state.setVisible(false);
            this.readyBtn.setVisible(true);
        }
        else 
        {            
            this.readyBtn.setVisible(false);
            this.state.setText('ESPERANDO...')
                .setColor('#777777')
                .setVisible(true);
        }
    }

    goToMenu()
    {
        this.scene.start('MenuScene');
    }

    onShutdown()
    {
        if (!this.socket) return;

        this.socket.onmessage = null;
        this.socket.onerror = null;
        this.socket.onclose = null;
    }

    showWarning(text)
    {
        const warning = this.add.text(800, 520, text, {
            fontSize: '64px',
            fontFamily: 'Rockwell',
            color: '#ff4444',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5);

        this.time.delayedCall(1000, () => warning.destroy());
    }
}