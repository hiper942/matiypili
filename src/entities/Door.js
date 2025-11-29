export default class Door 
{
    constructor(scene, x, y) 
    {
        this.scene = scene;
        this.open = false;

        // Sprite estático de colisión
        this.sprite = scene.physics.add.staticSprite(x, y, null)
            .setDisplaySize(64, 96)
            .setTint(0x5d4037)
            .setOrigin(0.5, 0.675);

        this.sprite.body.setSize(64, 96);
        this.sprite.body.setOffset(-16, -48);

        this.trigger = scene.add.rectangle(x, y - 16, 64, 96, 0xffffff, 0);
        scene.physics.add.existing(this.trigger, false);

        this.trigger.body.allowGravity = false;
        this.trigger.body.immovable = true;
    }

    update(mati, pili) 
    {
        if (!this.open) return;

        const matiInDoor = this.scene.physics.overlap(mati.sprite, this.trigger);
        const piliInDoor = this.scene.physics.overlap(pili.sprite, this.trigger);

        if (matiInDoor && piliInDoor) this.scene.scene.start('WinScene');
    }

    openDoor()
    {
        this.open = true;

        this.sprite.setTint(0xffff88);

        this.sprite.body.enable = false;
    }
}