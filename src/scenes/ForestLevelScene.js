import Mati from '../entities/Mati.js';
import Pili from '../entities/Pili.js';
import Platform from '../entities/Platform.js';
import Switch from '../entities/Switch.js';
import Door from '../entities/Door.js';
import Rock from '../entities/Rock.js';
import Grid from '../entities/Grid.js';

import { MoveCharacterCommand } from '../commands/MoveCharacterCommand.js';
import { JumpCharacterCommand } from '../commands/JumpCharacterCommand.js';

export default class ForestLevelScene extends Phaser.Scene
{
    constructor()
    {
        super('ForestLevelScene');
    }

    preload()
    {
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
    }

    // Start()
    create()
    {
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

        // --- NIVEL --- //
        // = GRID = //
        const levelMatrix = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,4,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
            [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,1],
            [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2,0,0,0,6,0,3,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ]

        this.grid = new Grid(this, levelMatrix);
        
        // = PERSONAJES = //
        this.pili = new Pili(this, this.grid.piliSpawn.x, this.grid.piliSpawn.y);
        this.pili.sprite.y -= this.pili.sprite.body.height / 2;

        this.mati = new Mati(this, this.grid.matiSpawn.x, this.grid.matiSpawn.y);
        this.mati.sprite.y -= this.mati.sprite.body.height / 2;
        
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
                    mati.x = r.x - (r.displayWidth / 2 + mati.displayWidth / 2);
                }
                else
                {
                    mati.x = r.x + (r.displayWidth / 2 + mati.displayWidth / 2);
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
        if (this.grid.door)
        {
            this.physics.add.collider(this.mati.sprite, this.grid.door.sprite);
            this.physics.add.collider(this.pili.sprite, this.grid.door.sprite);
        }

        // --- INPUT --- //
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            A: 'A',
            D: 'D',
            W: 'W',
            SPACE: 'SPACE',
            SHIFT: 'SHIFT'
        });
    }

    // Update()
    update()
    {
        // ----- MATI ----- //
        if (!this.mati.isDashing)
        {
            this.mati.sprite.setVelocityX(0);

            // Movimiento
            if(this.keys.A.isDown) this.mati.sprite.setVelocityX(-this.mati.baseSpeed);
            if(this.keys.D.isDown) this.mati.sprite.setVelocityX(this.mati.baseSpeed);

            // Deteccion de Pili
            const isTouchingPili = this.physics.overlap(this.mati.sprite, this.pili.topCollider) && this.mati.sprite.body.velocity.y > 0 && this.mati.sprite.body.bottom <= this.pili.sprite.body.top + 8;

            if (isTouchingPili)
            {
                this.pili.isPlatform = true;
            }

            // Mantener a Mati encima de Pili si Mati está encima
            if (this.pili.isPlatform)
            {
            this.mati.sprite.body.y = this.pili.sprite.body.top - this.mati.sprite.body.height;

            this.mati.sprite.body.setVelocityY(0);

            const stillOverlapping = this.physics.overlap(this.mati.sprite, this.pili.topCollider);

            if (!stillOverlapping) 
                {
                    this.pili.isPlatform = false;
                }

                if (this.mati.sprite.body.bottom < this.pili.sprite.body.top - 4)
                {
                    this.pili.isPlatform = false;
                }
            }

            // Salto
            if ((this.keys.W.isDown || this.keys.SPACE.isDown) && (this.mati.sprite.body.onFloor() || this.pili.isPlatform)) 
            {
                this.mati.sprite.setVelocityY(-this.mati.jumpStrength);
                this.pili.isPlatform = false;
            }
        }
        
        // Dash
        if(this.keys.SHIFT.isDown)
        {
            const dir = this.keys.D.isDown ? 1 : (this.keys.A.isDown ? -1 : 0);
            if (dir !== 0)
            {
                this.mati.dash(dir);
            }
        }

        // ----- PILI ----- //

        this.pili.sprite.setVelocityX(0);

        // Actualizar posicion del colliderTop de pili
        this.pili.update();

        // console.log(this.pili.isPlatform);

        // Movimiento solo si Mati no está encima
        if (!this.pili.isPlatform)
        {
            if(this.cursors.left.isDown)
            {
                
                this.pili.sprite.flipX = true;
                this.pili.sprite.play('piliWalk', true);
                this.pili.sprite.setVelocityX(-this.pili.baseSpeed);
            }
            else if(this.cursors.right.isDown)
            {
                this.pili.sprite.flipX = false;
                this.pili.sprite.play('piliWalk', true);
                this.pili.sprite.setVelocityX(this.pili.baseSpeed);
            }
            else if(this.cursors.up.isDown && this.pili.sprite.body.onFloor())
            {
                // animacion salto??
                this.pili.sprite.play('piliIdle', true);
                this.pili.sprite.setVelocityY(-this.pili.jumpStrength);
            }
            else
            {
                this.pili.sprite.play('piliIdle', true);
            }
        }
        else
        {
            this.pili.sprite.play('piliIdle', true);
        }
        
        //----- INTERRUPTOR -----//        
        if (this.grid.switch)
        {
            this.grid.switch.update(this.mati);
        }

        //----- PUERTA -----//
        if (!this.grid.door.open && this.grid.switch.active)
        {
            this.grid.door.openDoor();
        }

        if (this.grid.door)
        {
            this.grid.door.update(this.mati, this.pili);
        }
    }
}