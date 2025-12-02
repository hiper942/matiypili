export default class Bridge
{
    constructor(scene, x, y, w, h, id)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        const g = scene.add.graphics();
        g.fillStyle(0x009688);
        g.fillRect(0, 0, w, h);
        g.generateTexture(`bridge-${x}-${y}`, w, h);
        g.destroy();

        this.sprite = scene.physics.add.staticSprite(x, y, `bridge-${x}-${y}`);
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