/**
 * Lobby Scene - Waiting for multiplayer matchmaking
 */
export default class PartyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PartyScene' });
    this.ws = null;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Title
    this.add.text(width / 2, 100, 'Online Multiplayer', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Status text
    this.statusText = this.add.text(width / 2, height / 2 - 50, 'Connecting to server...', {
      fontSize: '24px',
      color: '#ffff00'
    }).setOrigin(0.5);

    // Player count text
    this.playerCountText = this.add.text(width / 2, height / 2 + 20, '', {
      fontSize: '20px',
      color: '#00ff00'
    }).setOrigin(0.5);

    // Cancel button
    const cancelButton = this.add.text(width / 2, height - 100, 'Cancel', {
      fontSize: '24px',
      color: '#ff6666',
      backgroundColor: '#333333',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    cancelButton.on('pointerover', () => {
      cancelButton.setColor('#ff0000');
    });

    cancelButton.on('pointerout', () => {
      cancelButton.setColor('#ff6666');
    });

    cancelButton.on('pointerdown', () => {
      this.leaveQueue();
      this.scene.start('MenuScene');
    });

    // Connect to WebSocket server
    this.connectToServer();
  }

  connectToServer() {
    try {
      // Connect to WebSocket server (same host as web server)
      const wsUrl = `ws://${window.location.host}`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
        this.statusText.setText('Waiting for opponent...');

        // Join matchmaking queue
        this.ws.send(JSON.stringify({ type: 'joinQueue' }));
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleServerMessage(data);
        } catch (error) {
          console.error('Error parsing server message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.statusText.setText('Connection error!');
        this.statusText.setColor('#ff0000');
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
        if (this.scene.isActive('LobbyScene')) {
          this.statusText.setText('Connection lost!');
          this.statusText.setColor('#ff0000');
        }
      };
    } catch (error) {
      console.error('Error connecting to server:', error);
      this.statusText.setText('Failed to connect!');
      this.statusText.setColor('#ff0000');
    }
  }

  handleServerMessage(data) {
    switch (data.type) {
      case 'queueStatus':
        this.playerCountText.setText(`Players in queue: ${data.position}/2`);
        break;

      case 'gameStart':
        console.log('Game starting!', data);
        // Store game data and transition to multiplayer game scene
        this.scene.start('TutorialLevelScene', {
          ws: this.ws,
          playerRole: data.role,
          roomId: data.roomId,
          initialBall: data.ball
        });
        break;

      default:
        console.log('Unknown message type:', data.type);
    }
  }

  leaveQueue() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'leaveQueue' }));
      this.ws.close();
    }
  }

  shutdown() {
    this.leaveQueue();
  }
}
