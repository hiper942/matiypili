export default class Platform
{
    constructor(scene, x, y, img)
    {
        this.scene = scene;

        this.sprite = scene.add.sprite(x, y, 'platformTiles', img);
        scene.physics.add.existing(this.sprite, true);
        this.sprite.setOrigin(0.5, 0.5);
    }
}