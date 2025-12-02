export default class PressurePlate
{
    constructor(scene, x, y, id)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        this.sprite = scene.physics.add.staticSprite(x, y, 'pressureOff');
        this.sprite.isPressurePlate = true;
        this.sprite.interactiveID;

        this.sensor = scene.add.rectangle(x, y, 64, 32, 0x00ff00, 0);
        scene.physics.add.existing(this.sensor, false);
        this.sensor.body.allowGravity = false;
        this.sensor.body.immovable = true;
    }

    update(objOnTop)
    {
        let somethingOnTop = false;

        objOnTop.forEach(obj =>
        {
            if (this.scene.physics.overlap(obj.sprite, this.sensor))
            {
                somethingOnTop = true;
            }
        });

        if(somethingOnTop && !this.active)
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
        this.sprite.setTexture('pressureOn');

        this.scene.grid.interactives.forEach(obj =>
        {
            if (obj.id === this.id) obj.activate();
        });
    }

    off()
    {
        this.active = false;
        this.sprite.setTexture('pressureOff');

        this.scene.grid.interactives.forEach(obj =>
        {
            if (obj.id === this.id && obj.deactivate)
            {
                obj.deactivate();
            }
        });
    }
}