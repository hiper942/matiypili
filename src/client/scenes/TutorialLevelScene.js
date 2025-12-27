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
import { connectionManager } from '../services/ConnectionManager.js';

export default class TutorialLevelScene extends Phaser.Scene
{
    constructor()
    {
        super('TutorialLevelScene');
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
        this.add.image(800, 450, 'fondoBosque')
            .setDisplaySize(1600, 900)
            .setDepth(-10);

        // --- INTERFAZ --- //
        this.add.image(800, 450, 'frame')
            .setDisplaySize(1600, 900)
            .setDepth(30);
        
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

        // = DECORACION FRONT = //
        // 1 = Cesped
        

        const frontMatrix = 
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]

        // = DECORACION BACK = //
        // 1 = Lampara
        // 2 = Rama
        // 3 = Flechas
        // 4 = WASD
        // 5 = SHIFT
        // 6 = Arbusto Grande
        // 7 = Arbusto Peque
        // 8 = Cristal Amarillo
        // 9 = Cristal Verde
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
            [0,1,2,3,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0],
            [0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
            if (deco.texture == 'lamp')
            {
                dec.sprite.setOffset(0, 32);
            }
        });

        // = PERSONAJES 1 = //
        this.mati = new Mati(this, this.grid.matiSpawn.x, this.grid.matiSpawn.y);
        this.mati.sprite.y -= this.mati.sprite.body.height / 2;

        // = DECORACIÓN FRENTE = //
        this.grid.decoFront.forEach(deco =>
        {
            if (deco.type === "grass")
            {
                let texture = this.grid.grass(deco.row, deco.col);
                const decoration = new Decoration(this, deco.x, deco.y, texture);
                decoration.sprite.setDepth(20);
            }
        });

        this.grid.decoFront.forEach(deco =>
        {
            if (deco.type === "raw")
            {
                const dec = new Decoration(this, deco.x, deco.y, deco.texture);
                dec.sprite.setDepth(22);
            }
        });

        // = PERSONAJES 2 = //
        this.pili = new Pili(this, this.grid.piliSpawn.x, this.grid.piliSpawn.y);
        this.pili.sprite.y -= this.pili.sprite.body.height / 2;

        // --- FISICAS --- //
        // = COLISIONES = //
        // Plataformas
        this.physics.add.collider(this.mati.sprite, this.grid.platforms);
        this.physics.add.collider(this.pili.sprite, this.grid.platforms);

        // Rocas
        this.grid.rocks.forEach(rock => 
        {
            this.physics.add.collider(rock.sprite, this.grid.platforms);
            this.physics.add.overlap(this.mati.sprite, rock.sprite, () =>
            {
                this.mati.sprite.setVelocityX(0);

                const mati = this.mati.sprite;
                const r = rock.sprite;

                if (mati.x < r.x)
                {
                    mati.x = r.x - (r.displayWidth / 2 + mati.body.width / 2);
                }
                else
                {
                    mati.x = r.x + (r.displayWidth / 2 + mati.body.width / 2);
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
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys(
        {
            A: 'A',
            D: 'D',
            W: 'W',
            SPACE: 'SPACE',
            SHIFT: 'SHIFT',
            
        });
        this.pauseKey = this.input.keyboard.addKey('ESC');

        this.connectionListener = (data) =>
        {
            if  (!data.connected)
            {
                this.onConnectionLost();
            }
        };
        connectionManager.addListener(this.connectionListener);
    }

    // Update()
    update()
    {
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

        // ----- MATI ----- //
        this.mati.update(this.pili);

        // ----- PILI ----- //        
        this.pili.update();
        
        //----- INTERRUPTOR -----//        
        if (this.grid.switch) this.grid.switch.update(this.mati);

        //----- PUERTA -----//
        if (!this.door.open && this.grid.switch.active) this.door.openDoor();

        if (this.door) this.door.update(this.mati, this.pili, 'ForestLevel1Scene');

        //----- BOTON -----//
        this.grid.buttons.forEach(btn => btn.update(this.mati));

        //----- PINCHOS -----//
        if (this.grid.spikes) this.grid.spikes.forEach(spike => spike.update(this.mati, this.pili));

        //----- PLACA DE PRESIÓN -----//
        if (this.grid.pressurePlates) this.grid.pressurePlates.forEach(press => press.update(this.pressure))
    }

    onConnectionLost()
    {
        this.scene.pause();

        this.scene.launch('DisconectionScene', { previousScene: 'TutorialLevelScene' });
    }

    onSpikeTouched(who)
    {
        console.log("Pincho tocado por:", who);

        this.scene.start("DeathScene");
    }
}