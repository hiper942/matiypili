export default class Platform
{
    constructor(scene, x, y, width, height)
    {
        const graphic = scene.add.graphics();
        graphic.fillStyle(0x34543a);
        graphic.fillRect(0, 0, width, height);
        graphic.generateTexture(`platform-${x}-${y}`, width, height);
        graphic.destroy();

        this.sprite = scene.physics.add.staticSprite(x, y, `platform-${x}-${y}`);

        this.sprite.setOrigin(0.5, 0.5);

    }
}