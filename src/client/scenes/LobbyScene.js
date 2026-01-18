/**
 * Lobby Scene - Waiting for multiplayer matchmaking
 */
export default class LobbyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LobbyScene' });
    this.ws = null;
    this.transferSocket = false;
  }

  create()
  {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Fondo
    this.add.image(800, 450, 'fondoLobby')
      .setDisplaySize(1600, 900)
      .setDepth(-10);

    // Status text
    this.statusText = this.add.text(width / 2, height / 2 - 50, 'CONNECTING TO SERVER...', {
      fontSize: '24px',
      fontFamily: 'Rockwell',
      color: '#21170B'
    }).setOrigin(0.5);

    // Player count text
    this.playerCountText = this.add.text(width / 2, height / 2 + 20, '', {
      fontSize: '20px',
      fontFamily: 'RockwellBold',
      color: '#331F0A'
    }).setOrigin(0.5);

    // Cancel button

    const cancelButton = this.add.image(800, 800, 'btnSalirOff')
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => cancelButton.setTexture('btnSalirOn'))
      .on('pointerout', () => cancelButton.setTexture('btnSalirOff'))
      .on('pointerdown', () => this.goToMenu());

    // Connect to WebSocket server
    this.connectToServer();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
    this.events.once(Phaser.Scenes.Events.DESTROY, this.onShutdown, this);
  }

  goToMenu()
  {
      this.scene.start('MenuScene');
      this.scene.stop();
  }

  connectToServer()
  {
    try
    {
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

  handleServerMessage(data)
  {
    if (!this.scene.isActive('LobbyScene')) return;
    
    switch (data.type)
    {
      case 'queueStatus':
        this.playerCountText.setText(`Players in queue: ${data.position}/2`);
        break;

      case 'gameStart':
        console.log('Game starting!', data);

        this.transferSocket = true;

        // Cerrar listeners
        this.ws.onclose = null;
        this.ws.onerror = null;
        this.ws.onmessage = null;

        // Store game data and transition to multiplayer game scene
        this.scene.start('CharacterSelectScene',
        {
          ws: this.ws,
          playerIndex: data.playerIndex,
          roomId: data.roomId
        });
        this.scene.stop();
        break;

      case 'playerDisconnected':
        this.onShutdown();
        break;

      default:
        // console.log('Unknown message type:', data.type);
        break;
    }
  }

  leaveQueue()
  {
    if (this.ws && this.ws.readyState === WebSocket.OPEN)
    {
      this.ws.send(JSON.stringify({ type: 'leaveQueue' }));
      this.ws.close();
    }
  }

  onShutdown()
  {
    if (!this.ws) return;

    this.ws.onopen = null;
    this.ws.onmessage = null;
    this.ws.onerror = null;
    this.ws.onclose = null;

    if (!this.transferSocket) this.leaveQueue();

    this.ws = null;
  }
}
