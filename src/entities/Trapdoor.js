export default class Trapdoor
{
    constructor(scene, x, y, id)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        this.sprite = scene.physics.add.staticSprite(x, y, 'bridgeM');
        this.sprite.setOrigin(0.5, 0.5);
        this.sprite.isInteractive = true;
    }

    activate()
    {
        if (this.active) return;
        this.active = true;

        this.sprite.disableBody(true, true);
    }

    deactivate()
    {
        if (!this.active) return;
        this.active = false;

        this.sprite.enableBodyody(false, this.sprite.x, this.sprite.y, true, true);
    }
}