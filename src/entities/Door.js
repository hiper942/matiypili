export default class Door 
{
    constructor(scene, x, y) 
    {
        this.scene = scene;
        this.open = false;

        // Sprite estático de colisión
        this.sprite = scene.physics.add.staticSprite(x, y, null)
            .setDisplaySize(50, 80)
            .setTint(0x5d4037)
            .setOrigin(0.5, 0.5);

        this.sprite.body.setOffset(0, 0);
    }

    update() 
    {
        // Abrir puerta
        if (this.open) {
            this.sprite.disableBody(true, true); 
        }
    }
}