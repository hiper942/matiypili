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

export default class TutorialLevelScene extends Phaser.Scene
{
    constructor()
    {
        super('TutorialLevelScene');
    }

    preload()
    {
        // --- FONDO DEL NIVEL ---
        this.load.image('fondoBosque', 'assets/Escenario/Fondo.png');
        
        // --- PERSONAJES --- //
        // = PILI = //
        // Pili Idle
        this.load.spritesheet('piliIdle', 'assets/Pili/idlePili.png',
        {
            frameWidth: 256, 
            frameHeight: 256 
        });

        // Pili Walk
        this.load.spritesheet('piliWalk', 'assets/Pili/walkPili.png',
        {
            frameWidth: 256, 
            frameHeight: 256 
        });

        // = MATI = //
        // Mati Idle
        this.load.spritesheet('matiIdle', 'assets/Mati/idleMati.png',
        {
            frameWidth: 256,
            frameHeight: 256
        });

        // Mati Walk
        this.load.spritesheet('matiWalk', 'assets/Mati/walkMati.png',
        {
            frameWidth: 256,
            frameHeight: 256
        });

        // Mati Dash
        this.load.spritesheet('matiDash', 'assets/Mati/dashMati.png',
        {
            frameWidth: 256,
            frameHeight: 256
        });

        // Mati Jump
        this.load.spritesheet('matiJump', 'assets/Mati/jumpMati.png',
        {
            frameWidth: 256,
            frameHeight: 256
        });

        // Mati Fall
        this.load.spritesheet('matiFall', 'assets/Mati/fallMati.png',
        {
            frameWidth: 256,
            frameHeight: 256
        });

        // = INTERRUPTOR = //
        this.load.spritesheet('switchActivation', 'assets/Escenario/Palanca/palanca.png',
        {
            frameWidth: 128,
            frameHeight: 128
        });

        // = PUERTA = //
        this.load.spritesheet('doorOpen', 'assets/Escenario/Puerta/puertaAnim.png',
        {
            frameWidth: 256,
            frameHeight: 256
        });
        // = BOTON = //
        this.load.image('crystalOff', "assets/Escenario/Boton/cristalApagado.png");
        this.load.image('crystalMid', "assets/Escenario/Boton/cristalIntermedio.png");
        this.load.image('crystalOn', "assets/Escenario/Boton/cristalEncendido.png");

        // = PLACA DE PRESIÓN = //
        this.load.image('pressureOff', "assets/Escenario/Placa/pressureOff.png");
        this.load.image('pressureOn', "assets/Escenario/Placa/pressureOn.png");

        // = CESPED = //
        this.load.image('grassR', "assets/Escenario/Tiles/cespedDerecha.png");
        this.load.image('grassM', "assets/Escenario/Tiles/cespedCentro.png");
        this.load.image('grassL', "assets/Escenario/Tiles/cespedIzquierda.png");

        // = TILES = //
        this.load.spritesheet('platformTiles', "assets/Escenario/Tiles/SpriteSheet/tilemap.png",
        {
            frameWidth: 64,
            frameHeight: 64
        });

        // = PINCHOS = //
        this.load.image('spike', "assets/Escenario/Pinchos/pinchos.png");

        // = ROCA = //
        this.load.image('rock', "assets/Escenario/Pedroloo/PiedraPili.png");
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
        
        // --- ANIAMCIONES --- //
        // = PILI = //
        // Idle
        this.anims.create(
        {
            key: 'piliIdle',
            frames: this.anims.generateFrameNumbers('piliIdle',
            {
                start: 0,
                end: 19
            }),

            frameRate: 8,
            repeat: -1
        });

        // Walk
        this.anims.create(
        {
            key: 'piliWalk',
            frames: this.anims.generateFrameNumbers('piliWalk',
            {
                start: 0,
                end: 37
            }),

            frameRate: 18,
            repeat: -1
        });

        // = MATI = //
        // Idle
        this.anims.create(
        {
            key: 'matiIdle',
            frames: this.anims.generateFrameNumbers('matiIdle',
            {
                start: 0,
                end: 12
            }),

            frameRate: 14,
            repeat: -1
        });

        // Walk
        this.anims.create(
        {
            key: 'matiWalk',
            frames: this.anims.generateFrameNumbers('matiWalk',
            {
                start: 0,
                end: 19
            }),

            frameRate: 18,
            repeat: -1
        });

        // Dash
        this.anims.create(
        {
            key: 'matiDash',
            frames: this.anims.generateFrameNumbers('matiDash',
            {
                start: 0,
                end: 14
            }),

            frameRate: 60,
            repeat: 0
        });

        // Jump
        this.anims.create(
        {
            key: 'matiJump',
            frames: this.anims.generateFrameNumbers('matiJump',
                {
                    start: 0,
                    end: 22
                }
            ),
            frameRate: 34
        });

        // Fall
        this.anims.create(
        {
            key: 'matiFall',
            frames: this.anims.generateFrameNames('matiFall',
            {
                start: 0,
                end: 9
            }
            ),
            frameRate: 34,
            repeat: -1
        });

        // = PALANCA = //
        this.anims.create(
        {
            key: 'switchActivation',
            frames: this.anims.generateFrameNames('switchActivation',
                {
                    start: 0,
                    end: 9
                }
            ),
            frameRate: 12,
            repeat: 0
        });

        // = PUERTA = //
        this.anims.create(
        {
            key: 'doorOpen',
            frames: this.anims.generateFrameNames('doorOpen',
                {
                    start: 0,
                    end: 12
                }
            ),
            frameRate: 8,
            repeat: 0
        });

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
        // 12 = Decoración

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
            [1,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,12,12,12,12,12,6,0,12,12,12,12,12,12,12,12,12,12,12,12,12,0,3,0,1],
            [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ]

        this.grid = new Grid(this, levelMatrix);

                
        // = PUERTA = //
        this.door = new Door(this, this.grid.doorpos.x, this.grid.doorpos.y);
        
        // = DECORACIÓN FONDO = //

        // = PERSONAJES 1 = //
        this.mati = new Mati(this, this.grid.matiSpawn.x, this.grid.matiSpawn.y);
        this.mati.sprite.y -= this.mati.sprite.body.height / 2;

        // = DECORACIÓN FRENTE = //
        this.grid.decoPos.forEach(deco => {
            this.grass = new Decoration(this, deco.x, deco.y, this.grid.grass(deco.row, deco.col));
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
        this.keys = this.input.keyboard.addKeys({
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

        if (this.door) this.door.update(this.mati, this.pili, 'ForestLevelScene');

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
}