export default class Pili{
    constructor(scene, x, y){
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, null)
            .setDisplaySize(50, 60)
            .setTint(0x9fc5e8)
            .setCollideWorldBounds(true);

        this.baseSpeed = 150;
        this.jumpStrength = 320;
    }

    isIdle(){
        return Math.abs(this.sprite.body.velocity.x) < 5;
    }
}