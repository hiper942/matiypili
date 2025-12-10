import { Physics } from "phaser";

export default class Mati {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'matiIdle')
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true);

        // Escala 64x64
        this.sprite.setScale(0.35);

        // Collider
        this.sprite.body.setSize(48 * 2.5, 64 * 2.5);
        this.sprite.body.setOffset(42, 90);

        // Base
        this.baseSpeed = 200;
        this.jumpStrength = 500;

        this.count = 0;
        // Dash
        this.isDashing = false;
        this.dashSpeed = 800;
        this.dashDuration = 200; // ms
        this.dashCooldown = 1000; // ms
        this.canDash = true;
    }

    update(pili) {
        if (this.isDashing) return;

        this.sprite.setVelocityX(0);

        // = DETECCION PILI = //
        const isTouchingPili = this.scene.physics.overlap(this.sprite, pili.topCollider) && this.sprite.body.velocity.y > 0 && this.sprite.body.bottom <= pili.sprite.body.top + 8;

        if (isTouchingPili)
        {
            pili.isPlatform = true;
        }

        // Mantener a Mati encima de Pili si Mati está encima
        if (pili.isPlatform)
        {
            this.sprite.body.y = pili.sprite.body.top - this.sprite.body.height;

            this.sprite.body.setVelocityY(0);

            const stillOverlapping = this.scene.physics.overlap(this.sprite, pili.topCollider);

            if (!stillOverlapping)
            {
                pili.isPlatform = false;
            }

            if (this.sprite.body.bottom < pili.sprite.body.top - 4)
            {
                pili.isPlatform = false;
            }
        }

        // = HORIZONTAL = //
        let moving = false;

        if (this.scene.keys.A.isDown)
        {
            this.sprite.flipX = true;
            this.sprite.setVelocityX(-this.baseSpeed);
            moving = true;
        }
        else if (this.scene.keys.D.isDown)
        {
            this.sprite.flipX = false;
            this.sprite.setVelocityX(this.baseSpeed);
            moving = true;
        }

        // = SALTO = //
        const onGround = this.sprite.body.onFloor() || pili.isPlatform;

        if ((this.scene.keys.W.isDown || this.scene.keys.SPACE.isDown) && onGround)
        {
            this.sprite.setVelocityY(-this.jumpStrength);
            pili.isPlatform = false;
        }

        // = ANIMACIONES = //
        const vy = this.sprite.body.velocity.y;

        if (!onGround)
        {
            if (vy < -50)
            {
                this.sprite.play('matiJump', true);
            }
            else if (vy > 50)
            {
                this.sprite.play('matiFall', true);
            }
        }
        else
        {
            if (moving)
            {
                this.sprite.play('matiWalk', true);
            }
            else
            {
                this.sprite.play('matiIdle', true);
            }
        }

        // = DASH = //
        if (this.scene.keys.SHIFT.isDown)
        {
            const dir = this.scene.keys.D.isDown ? 1 : (this.scene.keys.A.isDown ? -1 : 0);
            if (dir !== 0)
            {
                this.dash(dir);
            }
        }
    }

    dash(direction)
    {
        if (!this.canDash || this.isDashing) return;

        this.isDashing = true;
        this.canDash = false;

        this.sprite.flipX = direction < 0;

        this.sprite.anims.restart();
        this.sprite.play('matiDash');

        this.sprite.setVelocityX(direction * this.dashSpeed);
        this.sprite.setVelocityY(0);

        this.sprite.body.allowGravity = false;

        this.scene.time.delayedCall(this.dashDuration, () =>
        {
            this.isDashing = false;

            this.sprite.body.allowGravity = true;
        });

        this.scene.time.delayedCall(this.dashCooldown, () =>
        {
            this.canDash = true;
        });
    }
}