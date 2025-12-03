export default class Bridge
{
    constructor(scene, x, y, id, img)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        this.sprite = scene.physics.add.staticSprite(x, y, img);
        this.sprite.setOrigin(0.5, 0.5);
        this.sprite.isInteractive = true;

        this.sprite.disableBody(true, true);
    }

    activate()
    {
        if (this.active) return;
        this.active = true;

        this.sprite.enableBody(false, this.sprite.x, this.sprite.y, true, true);
    }

    deactivate()
    {
        if (!this.active) return;
        this.active = false;

        this.sprite.disableBody(true, true);
    }
}