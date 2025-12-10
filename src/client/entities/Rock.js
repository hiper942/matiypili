export default class Rock
{
    constructor(scene, x, y)
    {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'rock')
            .setScale(0.9);

        this.sprite.body.setBounce(0);
        this.sprite.body.setDrag(600, 0);
        this.sprite.body.setFriction(1, 1);
        this.sprite.body.setMass(30);
        this.sprite.body.setCollideWorldBounds(true);

        this.sprite.body.maxVelocity.x = 200;
    }
}