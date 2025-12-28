import Phaser from 'phaser';

export default class UserScene extends Phaser.Scene {
  constructor() {
    super('UserScene');
  }

  create() {

    const username = localStorage.getItem('username');

    // ===== NOMBRE ARRIBA =====
    this.add.text(400, 60,
      username ? username.toUpperCase() : 'INVITADO',
      { fontSize: '48px', color: '#ffffff' }
    ).setOrigin(0.5);

    // ===== PERFIL =====
    if (!username) {
      this.createLoginUI();
    } else {
      this.createProfileUI(username);
    }

    // ===== BOTÓN VOLVER =====
    this.add.text(50, 550, '← Volver', {
      fontSize: '20px',
      color: '#ffffff'
    })
    .setInteractive()
    .on('pointerdown', () => this.scene.start('MenuScene'));
  }

  createLoginUI()
  {
    this.usernameBox = this.add.rectangle(400, 240, 320, 50, 0xffffff)
        .setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true });

    this.username = this.add.dom(400, 240, 'input', {
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

    this.passwordBox = this.add.rectangle(400, 300, 320, 50, 0xffffff)
        .setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true });

    this.password = this.add.dom(400, 300, 'input', {
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

    this.add.text(400, 380, 'Iniciar Sesion', {
        fontSize: '32px',
        color: '#ffffff'
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.login());

    // =========================
    // BOTÓN REGISTER
    // =========================

    this.add.text(400, 430, 'Registrarse', {
        fontSize: '18px',
        color: '#cccccc'
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.register());
    }


    createProfileUI(username)
    {
        // ===== LEADERBOARD PLACEHOLDER =====
        this.add.text(400, 200, 'LEADERBOARD', {
        fontSize: '32px',
        color: '#ffff00'
        }).setOrigin(0.5);

        this.add.text(400, 260,
        '1. player1 - 00:12:34,123\n2. player2 - 00:13:10,456\n...',
        { fontSize: '20px', color: '#ffffff', align: 'center' }
        ).setOrigin(0.5);

        // ===== LOGOUT =====
        this.add.text(400, 420, 'LOGOUT', {
        fontSize: '28px',
        color: '#ff4444'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
        localStorage.clear();
        this.scene.restart();
        });
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
            this.err = this.add.text(400, 470, 'Algo salió mal...', {
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

        this.err = this.add.text(400, 470, 'Cuenta creada. Inicie Sesion.',
            {
                fontSize: '18px',
                color: '#00ff00'
            })
            .setOrigin(0.5);
    }
}
