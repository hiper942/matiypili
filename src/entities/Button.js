export default class Button
{
    constructor(scene, x, y, id)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        this.sprite = scene.add.rectangle(x, y, 48, 24, 0xff4a4a);
        scene.physics.add.existing(this.sprite, true);

        this.sprite.isButton = true;
        this.sprite.interactiveID = id;
    }

    update(mati)
    {
        if (this.active) return;

        const pressed = this.scene.physics.overlap(mati.sprite, this.sprite);

        if (pressed)
        {
            this.active = true;
            this.sprite.fillColor = 0xff0000;

            this.scene.grid.interactives.forEach(obj =>
            {
                if (obj.id === this.id)
                    obj.activate();
            });

            console.log("Is active!");
        }
    }
}