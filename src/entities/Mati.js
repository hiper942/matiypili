import { Physics } from "phaser";

export default class Mati{
    constructor(scene, x, y){
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, null)
            .setDisplaySize(30, 50)
            .setTint(0xffb347)
            .setOrigin(0, 5)
            .setCollideWorldBounds(true);
            

        this.baseSpeed = 200;
        this.jumpStrength = 450;
    }
}