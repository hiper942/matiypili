export default class Trapdoor
{
    constructor(scene, x, y, w, h, id)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        const g = scene.add.graphics();
        g.fillStyle(0x3f51b5);
        g.fillRect(0, 0, w, h);
        g.generateTexture(`trapdoor-${x}-${y}`, w, h);
        g.destroy();

        this.sprite = scene.physics.add.staticSprite(x, y, `trapdoor-${x}-${y}`);
        this.sprite.isInteractive = true;
    }

    activate()
    {
        if (this.active) return;
        this.active = true;

        this.sprite.disableBody(true, true);
    }
}