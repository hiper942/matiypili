import Phaser from 'phaser';

export default class UserScene extends Phaser.Scene {
    constructor()
    {
        super('UserScene');
    }

    create()
    {
        const username = localStorage.getItem('username');

        // ===== FONDO =====
        this.add.image(800, 450, 'fondoUsuario')
            .setDisplaySize(1600, 900)
            .setDepth(-10);

        // ===== NOMBRE ARRIBA =====
        const user = this.add.text(350, 100,
            username ? username.toUpperCase() : '',
            { fontSize: '96px', fontFamily: 'Rockwell', color: '#8a6946', align: 'left' }
        )
            .setOrigin(0.5);

        // ===== PERFIL =====
        if (!username)
        {
            this.createLoginUI();
        }
        else
        {
            this.createProfileUI(username);
        }

        // ===== BOTÓN VOLVER =====
        const volverBtn = this.add.image(150, 830, 'btnSalirOff')
            .setDepth(1)
            .setScale(0.6)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => volverBtn.setTexture('btnSalirOn'))
            .on('pointerout',  () => volverBtn.setTexture('btnSalirOff'))
            .on('pointerdown', () => this.goToMenu());
    }

    goToMenu()
    {
        this.scene.start('MenuScene');
        this.scene.stop();
    }

    createLoginUI()
    {
        // FONDO        
        this.add.image(810, 450, 'fondoTronco')
            .setDisplaySize(1600, 900)
            .setOrigin(0.5)
            .setDepth(-8);

        this.add.image(810, 325, 'inputBack')
            .setDepth(-5)
            .setOrigin(0.5);

        // =========================
        // USERNAME
        // =========================

        this.username = this.add.dom(800, 240, 'input', {
            type: 'text',
            name: 'username',
            placeholder: 'Nombre de usuario',
            fontSize: '24px',
            fontFamily: 'Rockwell',
            border: '6px solid #311F08',
            width: '450px',
            height: '40px',
            backgroundColor: '#583710',
            color: '#8a6946',
            outline: 'none'
        });

        // =========================
        // PASSWORD
        // =========================

        this.password = this.add.dom(800, 465, 'input', {
            type: 'password',
            name: 'password',
            placeholder: 'Contraseña',
            fontSize: '24px',
            fontFamily: 'Rockwell',
            border: '6px solid #311F08',
            width: '450px',
            height: '40px',
            backgroundColor: '#583710',
            color: '#8a6946',
            outline: 'none'
        });

        // =========================
        // BOTÓN LOGIN
        // =========================

        const loginButton = this.add.image(800, 700, 'btnLoginOff')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => loginButton.setTexture('btnLoginOn'))
            .on('pointerout', () => loginButton.setTexture('btnLoginOff'))
            .on('pointerdown', () => this.login());

        // =========================
        // BOTÓN REGISTER
        // =========================

        const regButton = this.add.image(800, 825, 'btnRegistrarOff')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => regButton.setTexture('btnRegistrarOn'))
            .on('pointerout', () => regButton.setTexture('btnRegistrarOff'))
            .on('pointerdown', () => this.register());

        // Error o mensaje
        this.err = this.add.text(800, 600, '', {
                fontSize: '32px',
                fontFamily: 'Rockwell',
                color: '#6e352d'
            })
            .setOrigin(0.5);
    }

    async createProfileUI(username)
    {
        // ===== OBTENER DATOS =====
        const res = await fetch('/api/leaderboard');
        const leaderboard = await res.json();

        const myEntry = leaderboard.find(u => u.username === username);

        // ===== MEJOR TIEMPO PERSONAL =====
        this.add.image(1175, 825, 'cell2');

        this.add.text(900, 825, username, {
            fontSize: '36px',
            fontFamily: 'Rockwell',
            color: '#21170B'
        }).setOrigin(0, 0.5);

        this.add.text(
            1450,
            825,
            myEntry ? this.formatTime(myEntry.bestTime) : '--:--.---',
            {
                fontSize: '36px',
                fontFamily: 'Rockwell',
                align: 'right',
                color: '#ffeab0'
            }
        ).setOrigin(1, 0.5);

        // ===== TABLA =====
        const startY = 300;
        const rowHeight = 125;
        const width = 750;

        leaderboard.slice(0, 5).forEach((entry, index) => {
            const y = startY + index * rowHeight;

            const bgColor = index % 2 === 0 ? 'cell1' : 'cell2';

            // Fondo fila
            this.add.image(1175, y, bgColor);

            // Posición + nombre
            this.add.text(900, y, `${index + 1}. ${entry.username}`, {
                fontSize: '36px',
                fontFamily: 'Rockwell',
                align: 'left',
                color: '#21170B'
            }).setOrigin(0, 0.5);

            // Tiempo
            this.add.text(1450, y, this.formatTime(entry.bestTime), {
                fontSize: '36px',
                fontFamily: 'Rockwell',
                align: 'right',
                color: '#ffeab0'
            }).setOrigin(1, 0.5);
        });

        // ===== LOGOUT =====

        const logout = this.add.image(350, 600, 'btnLogoutOff')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => logout.setTexture('btnLogoutOn'))
            .on('pointerout', () => logout.setTexture('btnLogoutOff'))
            .on('pointerdown', () => {
                localStorage.clear();
                this.scene.restart();
            });
    }

    formatTime(ms)
    {
        if (ms == null) return '--:--.---';

        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const millis  = ms % 1000;

        return `${minutes}:${seconds.toString().padStart(2,'0')}.${millis.toString().padStart(3,'0')}`;
    }

    async login()
    {
        const username = this.username.node.value.trim();
        const password = this.password.node.value.trim();

        if (!username || !password) return;

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            this.err.setText('Algo salió mal...');
            return;
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        this.scene.restart();
    }

    async register()
    {
        const username = this.username.node.value.trim();
        const password = this.password.node.value.trim();

        if (!username || !password) return;

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            console.warn('Registro fallido');
            return;
        }

        // tras registrar → vuelve a login
        console.log('Usuario creado, inicie sesion');

        this.err.setText('Cuenta creada. Inicie Sesion.');
    }
}