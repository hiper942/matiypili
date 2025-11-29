import { Physics } from "phaser";

export default class Mati
{
    constructor(scene, x, y)
    {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, null)
            .setDisplaySize(48, 64)
            .setTint(0xffb347)
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true);
            
        // Base
        this.baseSpeed = 200;
        this.jumpStrength = 500;

        // Dash
        this.isDashing = false;
        this.dashSpeed = 500;
        this.dashDuration = 200; // ms
        this.dashCooldown = 1000; // ms
        this.canDash = true;
    }

    dash(direction)
    {
        if (!this.canDash || this.isDashing) return;

        this.isDashing = true;
        this.canDash = false;

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