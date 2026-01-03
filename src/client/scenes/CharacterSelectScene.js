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

    create() {

        console.log('Soy el jugador:', this.playerIndex);

        this.selectedCharacter = null;
        this.isReady = false;
        
        this.otherSelection = null;
        this.readyState = { 1: false, 2: false };
        this.hasConflict = false;
        

        const borderColor = this.playerIndex === 1 ? 0x0077ff : 0xff3333;

        // ===== TÍTULO =====
        this.add.text(400, 80, 'SELECCIÓN DE PERSONAJE', {
            fontSize: '36px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(
            400,
            130,
            this.playerIndex === 1 ? 'Jugador 1' : 'Jugador 2',
            {
                fontSize: '28px',
                color: this.playerIndex === 1 ? '#3399ff' : '#ff5555'
            }
        ).setOrigin(0.5);

        /* =========================
           CARTA MATI
        ========================= */

        this.matiCard = this.add.rectangle(250, 350, 200, 280, 0x222222)
            .setInteractive({ useHandCursor: true });

        this.add.text(250, 350, 'MATI', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.matiCard.on('pointerdown', () => {
            this.selectCharacter('mati', borderColor);
        });

        /* =========================
           CARTA PILI
        ========================= */

        this.piliCard = this.add.rectangle(550, 350, 200, 280, 0x222222)
            .setInteractive({ useHandCursor: true });

        this.add.text(550, 350, 'PILI', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.piliCard.on('pointerdown', () => {
            this.selectCharacter('pili', borderColor);
        });

        /* =========================
           BOTÓN LISTO
        ========================= */

        this.readyBtn = this.add.text(400, 600, 'LISTO', {
            fontSize: '36px',
            color: '#aaaaaa'
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.confirmReady());

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
    }

    /* =========================
       SELECCIÓN
    ========================= */

    selectCharacter(character, color) {
    if (this.isReady) return;

    this.selectedCharacter = character;

    this.matiCard.setStrokeStyle(
        character === 'mati' ? 6 : 0,
        color
    );

    this.piliCard.setStrokeStyle(
        character === 'pili' ? 6 : 0,
        color
    );

    this.socket.send(JSON.stringify({
        type: 'selectCharacter',
        character
    }));

    this.readyBtn.setColor('#ffffff');
    }


    /* =========================
       CONFIRMAR LISTO
    ========================= */

    confirmReady() {
        if (!this.selectedCharacter || this.isReady || this.hasConflict) return;

        this.isReady = true;

        this.readyBtn.setText('ESPERANDO...');
        this.readyBtn.setColor('#777777');

        this.socket.send(JSON.stringify({
            type: 'playerReady'
        }));
    }

    updateRemoteState(data) {
        const borderColor = this.playerIndex === 1 ? 0x0077ff : 0xff3333;
        const otherColor  = this.playerIndex === 1 ? 0xff3333 : 0x0077ff;

        const myId = this.playerIndex;
        const otherId = myId === 1 ? 2 : 1;

        // Guardar estados
        this.hasConflict = data.conflict;
        this.readyState = data.ready;

        // Mostrar selección del otro
        if (data.selections[otherId]) {
            if (data.selections[otherId] === 'mati') {
            this.matiCard.setStrokeStyle(6, otherColor);
            }
            if (data.selections[otherId] === 'pili') {
            this.piliCard.setStrokeStyle(6, otherColor);
            }
        }

        // Iluminación de listo
        if (data.ready[myId]) {
            this.glowCard(this.selectedCharacter, borderColor);
        }
        if (data.ready[otherId]) {
            this.glowCard(data.selections[otherId], otherColor);
        }

        // Conflicto → verde
        if (data.conflict) {
            const conflictedCharacter = data.selections[1];
            // da igual 1 o 2, son iguales en conflicto

            // Limpia bordes primero
            this.matiCard.setStrokeStyle();
            this.piliCard.setStrokeStyle();

            if (conflictedCharacter === 'mati') {
                this.matiCard.setStrokeStyle(6, 0x00ff00);
            }

            if (conflictedCharacter === 'pili') {
                this.piliCard.setStrokeStyle(6, 0x00ff00);
            }

            this.readyBtn.setText('CONFLICTO');
            this.readyBtn.setColor('#00ff00');

            return; // 🔑 MUY IMPORTANTE
        }
        else if (!this.isReady)
        {
            this.readyBtn.setText('LISTO');
            this.readyBtn.setColor('#ffffff');
        }
        else 
        {            
            this.readyBtn.setText('ESPERANDO...');
            this.readyBtn.setColor('#777777');
        }
    }

    glowCard(character, color) {
        const card = character === 'mati' ? this.matiCard : this.piliCard;
        card.setStrokeStyle(6, color);
        card.setAlpha(1);
    }

    /* =========================
       WARNING VISUAL
    ========================= */

    showWarning(text) {
        const warning = this.add.text(400, 520, text, {
            fontSize: '20px',
            color: '#ff4444',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5);

        this.time.delayedCall(1000, () => warning.destroy());
    }
}