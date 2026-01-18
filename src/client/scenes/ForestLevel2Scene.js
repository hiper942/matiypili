import Mati from '../entities/Mati.js';
import Pili from '../entities/Pili.js';
import Platform from '../entities/Platform.js';
import Switch from '../entities/Switch.js';
import Door from '../entities/Door.js';
import Rock from '../entities/Rock.js';
import PressurePlate from '../entities/PressurePlate.js';
import Grid from '../entities/Grid.js';
import Decoration from '../entities/Decoration.js';

import { MoveCharacterCommand } from '../commands/MoveCharacterCommand.js';
import { JumpCharacterCommand } from '../commands/JumpCharacterCommand.js';

export default class ForestLevel2Scene extends Phaser.Scene
{
    constructor()
    {
        super('ForestLevel2Scene');
    }

    // Start()
    create()
    {
        // --- ONLINE --- //
        this.isOnline = false;
        
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
            [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,1,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,6,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1],
            [1,1,1,{ tag: 9, type: 'interactable', id: 2 },{ tag: 9, type: 'interactable', id: 2 },1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,{ tag: 11, type: 'interactable', id: 1 },5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{ tag: 7, type: 'interactable', id: 2 },0,0,3,0,1],
            [1,1,1,1,1,1,1,{ tag: 8, type: 'interactable', id: 1 },{ tag: 8, type: 'interactable', id: 1 },{ tag: 8, type: 'interactable', id: 1 },{ tag: 8, type: 'interactable', id: 1 },{ tag: 8, type: 'interactable', id: 1 },{ tag: 8, type: 'interactable', id: 1 },{ tag: 8, type: 'interactable', id: 1 },{ tag: 8, type: 'interactable', id: 1 },1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,1,1,1,1,1,1,1,1,1,1]
        ]
        // = DECORACION BACK = //
        // 1  = Espiral
        // 3  = Flechas
        // 4  = WASD
        // 5  = SHIFT
        // 6  = Arbusto Grande
        // 7  = Arbusto Peque
        // 8  = Cristal Amarillo
        // 9  = Cristal Verde
        // 10 = Flecha Arriba
        // 11 = Flecha Abajo
        // 12 = Flecha Izquierda
        // 13 = Flecha Derecha
        // 14 = Flecha Arriba Izquierda
        // 15 = Flecha Arriba Derecha
        // 22 = Piedra Grande
        // 23 = Piedra Mediana
        // 24 = Piedra Pequeña
        // 25 = Dos Setas
        // 26 = Tres Setas

        const backMatrix = 
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,9,0,0,24,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0],
            [0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16],
            [0,0,4,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,4,0,0,0],
            [0,0,0,0,0,16,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,19,0,0,0,0,0,0,0,16],
            [0,0,20,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
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
        });

        // = PERSONAJES 1 = //
        this.mati = new Mati(this, this.grid.matiSpawn.x, this.grid.matiSpawn.y);
        this.mati.sprite.y -= this.mati.sprite.body.height / 2;

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
        this.pressure = [this.mati, this.pili];

        this.grid.rocks.forEach(rock =>
        {
            this.pressure.push(rock);
        });

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
    }

    // Update()
    update()
    {
        // ----- PAUSA ----- //
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) this.openPause();
        
        // ----- MATI ----- //
        this.mati.update(this.pili);

        // ----- PILI ----- //        
        this.pili.update();
        
        //----- INTERRUPTOR -----//        
        if (this.grid.switch) this.grid.switch.update(this.mati);

        //----- PUERTA -----//
        if (!this.door.open && this.grid.switch.active) this.door.openDoor();

        if (this.door) this.door.update(this.mati, this.pili, 'WinScene');

        //----- BOTON -----//
        this.grid.buttons.forEach(btn => btn.update(this.mati));

        //----- PINCHOS -----//
        if (this.grid.spikes) this.grid.spikes.forEach(spike => spike.update(this.mati, this.pili));

        //----- PLACA DE PRESIÓN -----//
        if (this.grid.pressurePlates) this.grid.pressurePlates.forEach(press => press.update(this.pressure));
    }

    openPause()
    {
        if (this.scene.isActive('Pause')) return;

        this.scene.pause(this.scene.key);
        this.scene.launch('Pause', { target: this.scene.key });
        this.scene.bringToTop('Pause');
    }

    // provisional
    onSpikeTouched(who)
    {
        console.log("Pincho tocado por:", who);

        this.scene.start('DeathScene', { who: who, target: this.scene.key });
    }
}