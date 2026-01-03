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
        this.isOnline = true;

        this.lastNetSend = 0;
        this.NET_RATE = 50; // ms -> 1000 / 50 = 20 veces/segundo para evitar lag innecesario
        
        this.localPlayer  = this.character === 'mati' ? this.mati : this.pili;
        this.remotePlayer = this.character === 'mati' ? this.pili : this.mati;

        this.mati.isLocal = this.character === 'mati';
        this.pili.isLocal = this.character === 'pili';

        this.socket.addEventListener('message', (event) =>
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
            }
        });
    }

    // Update()
    update()
    {
        // ----- ONLINE ----- //
        const now = Date.now();

        if (now - this.lastNetSend > this.NET_RATE) {
            this.sendPlayerState();
            this.lastNetSend = now;
        }
        
        // ----- PAUSA ----- //
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey))
        {
            if (!this.scene.isActive('Pause'))
            {
                this.scene.pause();
                this.scene.launch('Pause');
                this.scene.bringToTop('Pause');
            }
        };

        // ----- PERSONAJE ----- //
        if (this.localPlayer === this.mati)
        {
            this.mati.update(this.pili);
        }
        else
        {
            this.pili.update();
        }

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

    onSpikeTouched(who)
    {
        console.log("Pincho tocado por:", who);

        this.scene.start("DeathScene");
    }

    sendPlayerState()
    {
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
            anim: p.anims.currentAnim?.key ?? null
        }));
    }

    applyRemoteState(data) {
    const s = this.remotePlayer.sprite;

        // posición
        s.x = data.x;
        s.y = data.y;

        // velocidad
        s.body.setVelocity(data.vx, data.vy);

        // orientación
        s.flipX = data.flipX;

        // animación
        if (data.anim && (!s.anims.currentAnim || s.anims.currentAnim.key !== data.anim))
        {
            s.play(data.anim, true);
        }
    }
}