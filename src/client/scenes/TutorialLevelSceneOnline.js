import Mati from '../entities/Mati.js';
import Pili from '../entities/Pili.js';
import Platform from '../entities/Platform.js';
import Switch from '../entities/Switch.js';
import Spike from '../entities/Spike.js'
import Door from '../entities/Door.js';
import Rock from '../entities/Rock.js';
import PressurePlate from '../entities/PressurePlate.js';
import Decoration from '../entities/Decoration.js';
import Grid from '../entities/Grid.js';

import { MoveCharacterCommand } from '../commands/MoveCharacterCommand.js';
import { JumpCharacterCommand } from '../commands/JumpCharacterCommand.js';

export default class TutorialLevelSceneOnline extends Phaser.Scene
{
    constructor()
    {
        super('TutorialLevelSceneOnline');
        this.disconnected = false;
        this.isOnline = true;
    }

    init(data)
    {
        this.socket = data.socket;
        this.playerIndex = data.playerIndex;
        this.character = data.character;
        this.roomId = data.roomId;
    }

    // Start()
    create()
    {                
        // --- LISTENERS SHUTDOWN --- //
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
        this.events.once(Phaser.Scenes.Events.DESTROY, this.onShutdown, this);
        
        // --- MUSICA --- //
        if (!this.sound.get('levelMusic'))
        {
            this.levelMusic = this.sound.add('levelMusic', {
                loop: true,
                volume: 0.4
            });
            this.levelMusic.play();
        }
        else
        {
            this.levelMusic = this.sound.get('levelMusic');
        }
        
        // --- FONDO --- //
        this.add.image(800, 450, 'fondoBosque2')
            .setDisplaySize(1600, 900)
            .setDepth(-10);

        // --- INTERFAZ --- //
        this.add.image(800, 450, 'frame')
            .setDisplaySize(1600, 900)
            .setDepth(30);

        // --- LUZ --- //
        this.add.image(800, 450, 'light')
            .setDisplaySize(1600, 900)
            .setDepth(29);
        
        // --- NIVEL --- //
        // = GRID = //

        // 0 = Vacio
        // 1 = Plataforma
        // 2 = Interruptor
        // 3 = Puerta
        // 4 = Spawn Mati
        // 5 = Spawn Pili
        // 6 = Roca
        // 7 = Boton
        // 8 = Puente
        // 9 = Trampilla
        // 10 = Pinchos
        // 11 = Placa de Presión

        const levelMatrix = 
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,0,4,0,1,10,1,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,5,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1],
            [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ]

        // = DECORACION BACK = //
        // 3  = Flechas
        // 4  = WASD
        // 5  = SHIFT
        // 6  = Arbusto Grande
        // 7  = Arbusto Peque
        // 8  = Cristal Amarillo
        // 9  = Cristal Verde
        // 22 = Piedra Grande
        // 23 = Piedra Mediana
        // 24 = Piedra Pequeña
        // 25 = Dos Setas
        // 26 = Tres Setas

        const backMatrix = 
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,4,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,6,0,0,7,0,0,0,0,0,0,22,24,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]
        
        // = DECORACION FRONT = //
        // 1  = Cesped
        // 2  = Lampara
        // 3  = Rama
        // 4  = Luciernagas
        // 10 = Liana1
        // 11 = Liana2
        // 12 = Liana3
        // 13 = Liana4
        // 14 = Liana Grande
        // 15 = Musgo Derecha
        // 16 = Musgo Izquierda
        // 17 = Musgo Abajo
        // 18 = Musgo Cima
        // 19 = Musgo Arriba
        // 20 = Musgo Esquina Derecha
        // 21 = Musgo Esquina Izquierda
        // 27 = Liana arco
    
        const frontMatrix = 
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,27,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,0,0,0,21,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,3,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
            [0,0,0,2,0,0,0,19,3,0,19,0,0,0,20,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0],
            [0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]

        this.grid = new Grid(this, levelMatrix, frontMatrix, backMatrix);

        // = PUERTA = //
        this.door = new Door(this, this.grid.doorpos.x, this.grid.doorpos.y);
        
        // = DECORACIÓN FONDO = //
        this.grid.decoBack.forEach(deco =>
        {
            const dec = new Decoration(this, deco.x, deco.y, deco.texture);
            dec.sprite.setDepth(-5);
        });

        // = PERSONAJES 1 = //
        this.mati = new Mati(this, this.grid.matiSpawn.x, this.grid.matiSpawn.y);
        this.mati.sprite.y -= this.mati.sprite.body.height / 2;

        this.pili = new Pili(this, this.grid.piliSpawn.x, this.grid.piliSpawn.y);
        this.pili.sprite.y -= this.pili.sprite.body.height / 2;

        // = DECORACIÓN FRENTE = //
        this.grid.decoFront.forEach(deco =>
        {
            if (deco.type === "grass")
            {
                const texture = this.grid.grass(deco.row, deco.col);
                if (!texture) return;

                const decoration = new Decoration(this, deco.x, deco.y, texture);
                decoration.sprite.setDepth(20);

                return;
            }

            if (deco.anim)
            {
                const sprite = this.add.sprite(deco.x, deco.y, deco.texture);

                sprite.play(deco.anim);
                if (deco.texture === 'fireflies')
                {
                    sprite.setScale(2.5);
                    sprite.setDepth(22);
                    sprite.setOrigin(0.5, 0.625);
                    
                    return;
                }
                sprite.setDepth(22);
                    
                return;
            }

            const dec = new Decoration(this, deco.x, deco.y, deco.texture);
            dec.sprite.setDepth(22);
        });

        // --- FISICAS --- //
        // = COLISIONES = //

        // Plataforma pili
        this.physics.add.collider(this.mati.sprite, this.pili.topCollider);

        // Plataformas
        this.physics.add.collider(this.mati.sprite, this.grid.platforms);
        this.physics.add.collider(this.pili.sprite, this.grid.platforms);

        // Rocas
        this.grid.rocks.forEach(rock => 
        {
            this.physics.add.collider(rock.sprite, this.grid.platforms);
            this.physics.add.collider(this.mati.sprite, rock.sprite, () =>
            {
                const mati = this.mati.sprite;
                const roca = rock.sprite;

                // Si Mati está encima → plataforma
                const matiAbove =
                    mati.body.velocity.y > 0 &&
                    mati.body.bottom <= roca.body.top + 8;

                if (matiAbove)
                {
                    mati.body.y = roca.body.top - mati.body.height;
                    mati.body.setVelocityY(0);
                    return;
                }

                // Si colisión lateral → pared (NO empuja)
                mati.setVelocityX(0);

                if (mati.x < roca.x)
                {
                    mati.x = roca.x - (roca.displayWidth / 2 + mati.body.width / 2);
                }
                else
                {
                    mati.x = roca.x + (roca.displayWidth / 2 + mati.body.width / 2);
                }
            });
            this.physics.add.collider(rock.sprite, this.pili.sprite);
        });

        // Entre rocas
        for (let i = 0; i < this.grid.rocks.length; i++)
        {
            for (let j = i + 1; j < this.grid.rocks.length; j++)
            {
                this.physics.add.collider(this.grid.rocks[i].sprite, this.grid.rocks[j].sprite);
            }
        }

        // Puerta
        if (this.door)
        {
            this.physics.add.collider(this.mati.sprite, this.door.sprite);
            this.physics.add.collider(this.pili.sprite, this.door.sprite);
        }

        // = INTERACCIONES = //
        // Quien puede pulsar
        this.pressure = [this.mati, this.pili, this.grid.rocks];

        // --- INPUT --- //
        this.keys = this.input.keyboard.addKeys(
        {
            A: 'A',
            D: 'D',
            W: 'W',
            SPACE: 'SPACE',
            SHIFT: 'SHIFT',
        });
        this.pauseKey = this.input.keyboard.addKey('ESC');

        const playerIndex = this.registry.get('playerIndex'); // 1 o 2

        // --- CRONO --- //
        this.registry.set('runStartTime', Date.now());

        // --- ONLINE --- //
        this.lastNetSend = 0;
        this.NET_RATE = 20; // ms -> 1000 / 20 = 50 veces/segundo para evitar lag innecesario
        
        this.localPlayer  = this.character === 'mati' ? this.mati : this.pili;
        this.remotePlayer = this.character === 'mati' ? this.pili : this.mati;

        this.mati.isLocal = this.character === 'mati';
        this.pili.isLocal = this.character === 'pili';

        this.onSocketMessage = (event) =>
        {
            const data = JSON.parse(event.data);

            if (data.roomId !== this.roomId) return;

            switch (data.type)
            {
                case 'playerState':
                    if (data.playerIndex !== this.playerIndex)
                    {
                        this.applyRemoteState(data);
                    }
                    break;

                case 'piliPlatform':
                    this.pili.isPlatform = data.active;
                    break;

                case 'switchActivated':
                    if (this.grid.switch && !this.grid.switch.active)
                    {
                        this.grid.switch.forceActivate();
                    }
                    break;

                case 'doorOpened':
                    if (!this.door.open)
                    {
                        this.door.openDoor();
                    }
                    break;

                case 'levelCompleted':
                    this.scene.start('ForestLevel1Scene');
                    break;

                case 'rockState':
                    const rock = this.grid.rocks.find(r => r.id === data.id);
                    if (rock)
                    {
                        rock.applyRemoteState(data);
                    }
                    break;

                case 'playerDisconnected':
                    this.handleDisconnection(data.reason || 'other_player_left');
                    break;
            }
        };
        
        this.onSocketClose = () =>
        {
            this.handleDisconnection('other_player_left');
        };

        this.onSocketError = () =>
        {
            this.handleDisconnection('connection_lost');
        };

        this.socket.addEventListener('message', this.onSocketMessage);

        this.socket.addEventListener('close', this.onSocketClose);

        this.socket.addEventListener('error', this.onSocketError);
    }

    // Update()
    update()
    {
        if (this.disconnected) return;
        
        // ----- ONLINE ----- //
        const now = Date.now();

        if (now - this.lastNetSend > this.NET_RATE)
        {
            this.sendPlayerState();
            this.lastNetSend = now;
        }
        
        // ----- PAUSA ----- //
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) this.openPause();

        // ----- PERSONAJE ----- //
        if (this.localPlayer === this.mati) this.mati.update(this.pili);
        else this.pili.update();

        // = SINCRONIZAR TOP COLLIDERS (LOCAL Y REMOTO) = //
        [this.mati, this.pili].forEach(player =>
        {
            if (player == this.pili)
            {
                const p = player;

                if (!p.topCollider) return;

                p.topCollider.x = p.sprite.x;
                p.topCollider.y = p.sprite.y - p.topColliderOffsetY;

                p.topCollider.body.updateFromGameObject();
            }
        });

        //----- INTERRUPTOR -----//        
        if (this.grid.switch && this.localPlayer === this.mati)
        {
            this.grid.switch.update(this.mati);
        }

        //----- PUERTA -----//
        if (!this.door.open && this.grid.switch.active)
        {
            if (!this.isOnline || this.localPlayer.isLocal)
            {
                this.door.openDoor();
            }
        }

        if (this.door) this.door.update(this.mati, this.pili, 'ForestLevel1Scene');

        //----- ROCAS -----//
        this.grid.rocks.forEach(rock => rock.update());

        //----- BOTON -----//
        this.grid.buttons.forEach(btn => btn.update(this.mati));

        //----- PINCHOS -----//
        if (this.grid.spikes) this.grid.spikes.forEach(spike => spike.update(this.mati, this.pili));

        //----- PLACA DE PRESIÓN -----//
        if (this.grid.pressurePlates) this.grid.pressurePlates.forEach(press => press.update(this.pressure))
    }

    openPause()
    {
        if (this.scene.isActive('Pause')) return;

        this.scene.pause(this.scene.key);
        this.scene.launch('Pause', { target: this.scene.key });
        this.scene.bringToTop('Pause');
    }

    onSpikeTouched(who)
    {
        console.log("Pincho tocado por:", who);

        this.scene.start("DeathScene");
    }

    sendPlayerState()
    {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;

        const p = this.localPlayer.sprite;

        this.socket.send(JSON.stringify
        ({
            type: 'playerState',
            roomId: this.roomId,
            playerIndex: this.playerIndex,
            x: p.x,
            y: p.y,
            vx: p.body.velocity.x,
            vy: p.body.velocity.y,
            flipX: p.flipX,
            anim: p.anims.currentAnim?.key ?? null,
            topColliderOffsetY: this.pili.topColliderOffsetY,
            piliIsPlatform: this.pili.isPlatform
        }));
    }

    applyRemoteState(data)
    {
        const remote = this.remotePlayer.sprite;

        if (remote == this.pili) remote.isPlatform = data.piliIsPlatform;

        // posición
        remote.x = data.x;
        remote.y = data.y;

        if (remote.topCollider)
        {
            const offset = data.topColliderOffsetY ?? remote.topColliderOffsetY ?? 0;
            remote.topCollider.y = data.y + offset;
            
            remote.topCollider.x = data.x;

            remote.topCollider.body.updateFromGameObject();
        }

        // velocidad
        remote.body.setVelocity(data.vx, data.vy);

        // orientación
        remote.flipX = data.flipX;

        // animación
        if (data.anim && (!remote.anims.currentAnim || remote.anims.currentAnim.key !== data.anim))
        {
            remote.play(data.anim, true);
        }
    }

    handleDisconnection(reason = 'unknown')
    {
        if (this.disconnected) return;
        this.disconnected = true;

        console.warn('[ONLINE] Disconnected:', reason);

        const isVoluntary = reason === 'exit_to_menu';

        // 1. Avisar al otro jugador si es salida voluntaria
        if (isVoluntary && this.socket && this.socket.readyState === WebSocket.OPEN)
        {
            try
            {
                this.socket.send(JSON.stringify({
                    type: 'playerDisconnected',
                    roomId: this.roomId,
                    playerIndex: this.playerIndex,
                    reason
                }));
            }
            catch (e)
            {
                console.warn('Failed to notify disconnection', e);
            }
        }

        // 2. Cerrar el socket SOLO en salida voluntaria
        if (isVoluntary && this.socket && this.socket.readyState === WebSocket.OPEN)
        {
            this.socket.close(1000, 'exit_to_menu');
        }

        // 4. Pausar escena actual
        this.scene.pause();
        this.time.removeAllEvents();

        // 5. Lanzar escena de desconexión
        if (!this.scene.isActive('DisconnectionScene') && !isVoluntary)
        {
            this.scene.launch('DisconnectionScene',
            {
                previousScene: this.scene.key,
                reason
            });
        }
    }

    onReconnected(socket)
    {
        console.log('[ONLINE] Reconnected');

        this.socket = socket;
        this.disconnected = false;

        // Volver a escuchar eventos
        this.socket.addEventListener('close', () =>
        {
            this.handleDisconnection('other_player_left');
        });

        this.socket.addEventListener('error', () =>
        {
            this.handleDisconnection('connection_lost');
        });
    }

    onShutdown()
    {
        if (!this.socket) return;

        if (this.onSocketMessage)
        {
            this.socket.removeEventListener('message', this.onSocketMessage);
            this.onSocketMessage = null;
        }

        if (this.onSocketClose)
        {
            this.socket.removeEventListener('close', this.onSocketClose);
            this.onSocketClose = null;
        }

        if (this.onSocketError)
        {
            this.socket.removeEventListener('error', this.onSocketError);
            this.onSocketError = null;
        }
    }
}