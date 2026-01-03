import Phaser from 'phaser';

export default class UserScene extends Phaser.Scene {
  constructor() {
    super('UserScene');
  }

  create() {

    const username = localStorage.getItem('username');

    // ===== NOMBRE ARRIBA =====
    this.add.text(300, 100,
      username ? username.toUpperCase() : 'INVITADO',
      { fontSize: '128px', color: '#ffffff', align: 'left' }
    ).setOrigin(0.5);

    // ===== PERFIL =====
    if (!username) {
      this.createLoginUI();
    } else {
      this.createProfileUI(username);
    }

    // ===== BOTÓN VOLVER =====
    this.add.text(50, 800, '← Volver', {
      fontSize: '20px',
      color: '#ffffff'
    })
    .setInteractive()
    .on('pointerdown', () => this.scene.start('MenuScene'));
  }

  createLoginUI()
  {
    this.usernameBox = this.add.rectangle(800, 400, 320, 50, 0xffffff)
        .setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true });

    this.username = this.add.dom(800, 400, 'input', {
        type: 'text',
        name: 'username',
        placeholder: 'Username',
        style: `
            width: 300px;
            height: 40px;
            background: transparent;
            color: black;
            font-size: 18px;
            border: none;
            outline: none;
            text-align: left;
        `
    });

    this.username.node.style.pointerEvents = 'auto';

    this.usernameBox.on('pointerdown', () => {
        this.username.node.focus();
        this.usernameBox.setStrokeStyle(2, 0x00aaff);
        this.passwordBox.setStrokeStyle(2, 0x000000);
    });

    // =========================
    // PASSWORD
    // =========================

    this.passwordBox = this.add.rectangle(800, 500, 320, 50, 0xffffff)
        .setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true });

    this.password = this.add.dom(800, 500, 'input', {
        type: 'password',
        name: 'password',
        placeholder: 'Contraseña',
        style: `
            width: 300px;
            height: 40px;
            background: transparent;
            color: black;
            font-size: 18px;
            border: none;
            outline: none;
        `
    });

    this.password.node.style.pointerEvents = 'auto';

    this.passwordBox.on('pointerdown', () => {
        this.password.node.focus();
        this.passwordBox.setStrokeStyle(2, 0x00aaff);
        this.usernameBox.setStrokeStyle(2, 0x000000);
    });

    // =========================
    // BOTÓN LOGIN
    // =========================

    this.add.text(800, 650, 'Iniciar Sesion', {
        fontSize: '32px',
        color: '#ffffff'
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.login());

    // =========================
    // BOTÓN REGISTER
    // =========================

    this.add.text(800, 700, 'Registrarse', {
        fontSize: '18px',
        color: '#cccccc'
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.register());
    }


    async createProfileUI(username) {

        // ===== TÍTULO =====
        this.add.text(800, 150, 'LEADERBOARD', {
            fontSize: '40px',
            color: '#e0c097'
        }).setOrigin(0.5);

        // ===== OBTENER DATOS =====
        const res = await fetch('/api/leaderboard');
        const leaderboard = await res.json();

        const myEntry = leaderboard.find(u => u.username === username);

        // ===== MEJOR TIEMPO PERSONAL =====
        this.add.rectangle(800, 300, 520, 80, 0x6f4e37)
            .setStrokeStyle(3, 0x5a3e2b);

        this.add.text(800, 280, 'TU MEJOR TIEMPO', {
            fontSize: '22px',
            color: '#e0c097'
        }).setOrigin(0.5);

        this.add.text(
            800,
            315,
            myEntry ? this.formatTime(myEntry.bestTime) : '--:--.---',
            {
                fontSize: '36px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // ===== TABLA =====
        const startY = 400;
        const rowHeight = 48;
        const width = 600;

        leaderboard.slice(0, 10).forEach((entry, index) => {
            const y = startY + index * rowHeight;

            const bgColor = index % 2 === 0 ? 0xb08968 : 0x9c6b4f;

            // Fondo fila
            this.add.rectangle(800, y, width, rowHeight, bgColor)
                .setStrokeStyle(2, 0x5a3e2b);

            // Resaltar usuario actual
            if (entry.username === username) {
                this.add.rectangle(800, y, width + 10, rowHeight + 6, 0xe0c097, 0.35)
                    .setStrokeStyle(2, 0xffffff);
            }

            // Posición + nombre
            this.add.text(520, y, `${index + 1}. ${entry.username}`, {
                fontSize: '20px',
                color: '#2b1d13'
            }).setOrigin(0, 0.5);

            // Tiempo
            this.add.text(1080, y, this.formatTime(entry.bestTime), {
                fontSize: '20px',
                color: '#1f140d'
            }).setOrigin(1, 0.5);
        });

        // ===== LOGOUT =====
        this.add.text(1400, 820, 'LOGOUT', {
            fontSize: '28px',
            color: '#ffaaaa'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            localStorage.clear();
            this.scene.restart();
        });
    }

    formatTime(ms) {
    if (ms == null) return '--:--.---';

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis  = ms % 1000;

    return `${minutes}:${seconds.toString().padStart(2,'0')}.${millis.toString().padStart(3,'0')}`;
}


    async login() {
        const username = this.username.node.value.trim();
        const password = this.password.node.value.trim();

        if (!username || !password) return;

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            this.err = this.add.text(800, 600, 'Algo salió mal...', {
                fontSize: '18px',
                color: '#00ff00'
            })
            .setOrigin(0.5);
            return;
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        this.scene.restart(); // 🔁 refresca a perfil
    }

    async register() {
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

        this.err = this.add.text(800, 600, 'Cuenta creada. Inicie Sesion.',
            {
                fontSize: '18px',
                color: '#00ff00'
            })
            .setOrigin(0.5);
    }
}