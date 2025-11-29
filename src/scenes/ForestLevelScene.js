import Mati from '../entities/Mati.js';
import Pili from '../entities/Pili.js';
import Platform from '../entities/Platform.js';
import Switch from '../entities/Switch.js';
import Door from '../entities/Door.js';
import Grid from "../entities/Grid.js";

import { MoveCharacterCommand } from '../commands/MoveCharacterCommand.js';
import { JumpCharacterCommand } from '../commands/JumpCharacterCommand.js';

export default class ForestLevelScene extends Phaser.Scene{
    constructor(){
        super('ForestLevelScene');
    }

    preload()
    {
        // Pili Idle
        this.load.image('piliIdle0', 'assets/Pili/idle_00.png');
        this.load.image('piliIdle1', 'assets/Pili/idle_01.png');
        this.load.image('piliIdle2', 'assets/Pili/idle_02.png');
        this.load.image('piliIdle3', 'assets/Pili/idle_03.png');
        this.load.image('piliIdle4', 'assets/Pili/idle_04.png');
        this.load.image('piliIdle5', 'assets/Pili/idle_05.png');
        this.load.image('piliIdle6', 'assets/Pili/idle_06.png');
        this.load.image('piliIdle7', 'assets/Pili/idle_07.png');
        this.load.image('piliIdle8', 'assets/Pili/idle_08.png');
        this.load.image('piliIdle9', 'assets/Pili/idle_09.png');
        this.load.image('piliIdle10', 'assets/Pili/idle_10.png');
        this.load.image('piliIdle11', 'assets/Pili/idle_11.png');
        this.load.image('piliIdle12', 'assets/Pili/idle_12.png');
        this.load.image('piliIdle13', 'assets/Pili/idle_13.png');
        this.load.image('piliIdle14', 'assets/Pili/idle_14.png');
        this.load.image('piliIdle15', 'assets/Pili/idle_15.png');
        this.load.image('piliIdle16', 'assets/Pili/idle_16.png');
        this.load.image('piliIdle17', 'assets/Pili/idle_17.png');
        this.load.image('piliIdle18', 'assets/Pili/idle_18.png');
        this.load.image('piliIdle19', 'assets/Pili/idle_19.png');

        // Pili Walk
    }

    // Start()
    create()
    {
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
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,4,0,5,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,3,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ]

        this.grid = new Grid(this, levelMatrix);
        
        // Personajes
        this.pili = new Pili(this, this.grid.piliSpawn.x, this.grid.piliSpawn.y);
        this.pili.sprite.y -= this.pili.sprite.body.height/2;

        this.mati = new Mati(this, this.grid.matiSpawn.x, this.grid.matiSpawn.y);
        this.mati.sprite.y -= this.mati.sprite.body.height / 2;
        
        this.physics.add.collider(this.mati.sprite, this.grid.platforms);
        this.physics.add.collider(this.pili.sprite, this.grid.platforms);

        this.grid.switch.update(this.mati);

        this.grid.door.update();

        //Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            A: 'A',
            D: 'D',
            W: 'W',
            SPACE: 'SPACE'
        });
    }

    // Update()
    update()
    {
        //----- MATI -----//
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

        //----- PILI -----//

        this.pili.sprite.setVelocityX(0);

        // Actualizar posicion del colliderTop de pili
        this.pili.update();

        // console.log(this.pili.isPlatform);

        // Movimiento solo si Mati no está encima
        if (!this.pili.isPlatform)
        {
            if(this.cursors.left.isDown) this.pili.sprite.setVelocityX(-this.pili.baseSpeed);
            if(this.cursors.right.isDown) this.pili.sprite.setVelocityX(this.pili.baseSpeed);
        
            if(this.cursors.up.isDown && this.pili.sprite.body.onFloor()){
                this.pili.sprite.setVelocityY(-this.pili.jumpStrength);
            }
        }
        
        //----- PUERTA -----//
        this.grid.door.update();

        //----- INTERRUPTOR -----//
        this.grid.switch.update(this.mati);

        //----- META -----//
        if(this.mati.sprite.y < 300 && this.mati.sprite.x > 760 &&
            this.pili.sprite.y < 300 && this.pili.sprite.x > 760){
                this.scene.start('WinScene');
        }
    }
}