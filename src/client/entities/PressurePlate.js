export default class PressurePlate
{
    constructor(scene, x, y, id)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        this.sprite = scene.physics.add.staticSprite(x, y, 'pressure');
        this.sprite.setImmovable(true);
        this.sprite.isPressurePlate = true;

        this.sensor = scene.add.rectangle(x, y, 64, 32, 0x00ff00, 0);
        scene.physics.add.existing(this.sensor, false);
        this.sensor.body.allowGravity = false;
        this.sensor.body.immovable = true;
    }

    update(objectsOnTop)
    {
        if (!objectsOnTop || objectsOnTop.length === 0) return;

        let somethingOnTop = false;

        objectsOnTop.forEach(obj =>
        {
            if (!obj || !obj.sprite) return;

            if (this.scene.physics.overlap(obj.sprite, this.sensor))
                somethingOnTop = true;
        });

        if (somethingOnTop && !this.active)
        {
            this.on();
        }
        else if (!somethingOnTop && this.active)
        {
            this.off();
        }
    }

    on()
    {
        this.active = true;
        this.sprite.play('pressOn');

        this.scene.grid.interactives.forEach(obj =>
        {
            if (obj.id === this.id && obj.activate)
            {
                obj.activate();
            }
        });
    }

    off()
    {
        this.active = false;
        this.sprite.play('pressOff');

        this.scene.grid.interactives.forEach(obj =>
        {
            if (obj.id === this.id && obj.deactivate)
            {
                obj.deactivate();
            }
        });
    }
}