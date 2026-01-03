import { Physics } from "phaser";

export default class Pili
{
    constructor(scene, x, y, isLocal = false)
    {
        this.scene = scene;
        this.isLocal = isLocal;

        // Carga sprite
        this.sprite = scene.physics.add.sprite(x, y, 'piliIdle')
            .setOrigin(0.5)
            .setCollideWorldBounds(true)
            .setDepth(-1);

        // Reescala a 128x128
        this.sprite.setScale(0.9);

        // Collider
        this.sprite.body.setSize(128 * 1.1, 128 * 1.1);
        this.sprite.body.setOffset(56, 92);

        // Stats
        this.baseSpeed = 100;
        this.jumpStrength = 100;

        // topCollider
        this.topCollider = scene.add.rectangle(x, y - this.sprite.displayHeight / 2, this.sprite.displayWidth * 0.5 - 4, 6, 0x00ff00, 0);
        scene.physics.add.existing(this.topCollider, false);

        this.topCollider.body.allowGravity = false;
        this.topCollider.body.immovable = true;

        this.isPlatform = false;
    }

    update()
    {
        if (!this.isLocal) return;

        this.sprite.setVelocityX(0);

        this.topCollider.x = this.sprite.x;
        this.topCollider.y = this.sprite.body.top - 4;

        // ===== INPUT =====
        if (this.scene.isOnline)
        {
            // ONLINE → WASD
            if (this.scene.keys.A.isDown)
            {
                this.sprite.flipX = true;
                this.sprite.setVelocityX(-this.baseSpeed);
                this.sprite.play('piliWalk', true);
            }
            else if (this.scene.keys.D.isDown)
            {
                this.sprite.flipX = false;
                this.sprite.setVelocityX(this.baseSpeed);
                this.sprite.play('piliWalk', true);
            }
            else
            {
                this.sprite.play('piliIdle', true);
            }

            if (this.scene.keys.W.isDown && this.sprite.body.onFloor())
            {
                this.sprite.setVelocityY(-this.jumpStrength);
            }
        }
        else
        {
            // LOCAL → FLECHAS
            if (this.scene.cursors.left.isDown)
            {
                this.sprite.flipX = true;
                this.sprite.setVelocityX(-this.baseSpeed);
                this.sprite.play('piliWalk', true);
            }
            else if (this.scene.cursors.right.isDown)
            {
                this.sprite.flipX = false;
                this.sprite.setVelocityX(this.baseSpeed);
                this.sprite.play('piliWalk', true);
            }
            else
            {
                this.sprite.play('piliIdle', true);
            }

            if (this.scene.cursors.up.isDown && this.sprite.body.onFloor())
            {
                this.sprite.setVelocityY(-this.jumpStrength);
            }
        }
    }
}