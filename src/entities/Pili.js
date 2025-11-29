import { Physics } from "phaser";

export default class Pili
{
    constructor(scene, x, y)
    {
        this.scene = scene;

        // Carga sprite
        this.sprite = scene.physics.add.sprite(x, y, 'piliIdle')
            .setOrigin(0.55, 1)
            .setCollideWorldBounds(true);

        // Reescala a 128x128
        this.sprite.setScale(0.8);

        // Collider
        this.sprite.body.setSize(128 * 1.25, 128 * 1.25);
        this.sprite.body.setOffset(50, 80);

        // Stats
        this.baseSpeed = 100;
        this.jumpStrength = 100;

        // topCollider
        this.topCollider = scene.add.rectangle(x, y - this.sprite.displayHeight / 2 - 10, this.sprite.displayWidth * 0.5, 6, 0x00ff00, 0);
        scene.physics.add.existing(this.topCollider, false);

        this.topCollider.body.allowGravity = false;
        this.topCollider.body.immovable = true;

        this.isPlatform = false;
    }

    update()
    {
        this.topCollider.x = this.sprite.x - 12;
        this.topCollider.y = this.sprite.body.top - 4;
    }

    isIdle()
    {
        return Math.abs(this.sprite.body.velocity.x) < 5;
    }
}