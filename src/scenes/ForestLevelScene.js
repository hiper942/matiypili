import Mati from '../entities/Mati.js';
import Pili from '../entities/Pili.js';
import Platform from '../entities/Platform.js';
import Switch from '../entities/Switch.js';
import Door from '../entities/Door.js';

import { MoveCharacterCommand } from '../commands/MoveCharacterCommand.js';
import { JumpCharacterCommand } from '../commands/JumpCharacterCommand.js';

export default class ForestLevelScene extends Phaser.Scene{
    constructor(){
        super('ForestLevelScene');
    }

    // Start()
    create()
    {
        //Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.add(new Platform(this, 0, 480, 1200, 60));
        this.platforms.add(new Platform(this, 350, 380, 120, 20));
        this.platforms.add(new Platform(this, 550, 340, 80, 20));
        this.platforms.add(new Platform(this, 750, 260, 120, 20));

        //Personajes
        this.mati = new Mati(this, 50, 400);
        this.pili = new Pili(this, 150, 400);

        this.physics.add.collider(this.mati.sprite, this.platforms);
        this.physics.add.collider(this.pili.sprite, this.platforms);
        // this.physics.add.collider(this.mati.collider, this.pili.collider);

        //Switch y Puerta
        this.switchObj = new Switch(this, 360, 350);
        this.door = new Door(this, 640, 430);

        this.physics.add.collider(this.mati.sprite, this.door.sprite);
        this.physics.add.collider(this.pili.sprite, this.door.sprite);

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
        //Movimiento Mati
        this.mati.sprite.setVelocityX(0);

        if(this.keys.A.isDown) this.mati.sprite.setVelocityX(-this.mati.baseSpeed);
        if(this.keys.D.isDown) this.mati.sprite.setVelocityX(this.mati.baseSpeed);

        // Deteccion de pili
        const isTouchingPili = this.physics.overlap(this.mati.sprite, this.pili.topCollider) && this.mati.sprite.body.velocity.y > 0 && this.mati.sprite.body.bottom <= this.pili.sprite.body.top + 8;

        if (isTouchingPili)
        {
            this.pili.isPlatform = true;
        }

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

        if
        (
            (this.keys.W.isDown || this.keys.SPACE.isDown) && 
            (this.mati.sprite.body.onFloor() || this.pili.isPlatform)
        ) 
        {
            this.mati.sprite.setVelocityY(-this.mati.jumpStrength);
            this.pili.isPlatform = false;
        }

        //Movimiento Pili
        this.pili.update();

        this.pili.sprite.setVelocityX(0);

        console.log(this.pili.isPlatform);
        if (this.pili.isPlatform)
        {
            this.pili.sprite.setVelocityX(0);
        }
        else
        {
            if(this.cursors.left.isDown) this.pili.sprite.setVelocityX(-this.pili.baseSpeed);
            if(this.cursors.right.isDown) this.pili.sprite.setVelocityX(this.pili.baseSpeed);
        
            if(this.cursors.up.isDown && this.pili.sprite.body.onFloor()){
                this.pili.sprite.setVelocityY(-this.pili.jumpStrength);
            }
        }
        // 

        //Interruptor
        this.switchObj.update(this.mati);

        //Puerta
        if(this.switchObj.active){
            this.door.open = true;
        }
        this.door.update();

        //META
        if(this.mati.sprite.y < 300 && this.mati.sprite.x > 760 &&
            this.pili.sprite.y < 300 && this.pili.sprite.x > 760){
                this.scene.start('WinScene');
        }
    }
}