export default class Decoration
{
    constructor(scene, x, y, img)
    {
        this.scene = scene;
        this.sprite = scene.physics.add.staticSprite(x, y, img);
        this.sprite.setOrigin(0.5, 0.5);
    }
}