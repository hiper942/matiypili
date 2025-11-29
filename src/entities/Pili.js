import { Physics } from "phaser";

export default class Pili
{
    constructor(scene, x, y)
    {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, null)
            .setDisplaySize(128, 128)
            .setTint(0x9fc5e8)
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true);

        this.sprite.body.setOffset(0, 0);

        this.baseSpeed = 100;
        this.jumpStrength = 100;

        this.topCollider = scene.add.rectangle(x, y - this.sprite.displayHeight / 2 - 2, this.sprite.displayWidth, 4, 0x00ff00, 0);
        scene.physics.add.existing(this.topCollider, false);

        this.topCollider.body.allowGravity = false;
        this.topCollider.body.immovable = true;

        this.isPlatform = false;
    }

    update()
    {
        this.topCollider.x = this.sprite.x;
        this.topCollider.y = this.sprite.y - this.sprite.displayHeight / 2 - 2;
    }

    isIdle()
    {
        return Math.abs(this.sprite.body.velocity.x) < 5;
    }
}