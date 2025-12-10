export default class Button
{
    constructor(scene, x, y, id)
    {
        this.scene = scene;
        this.id = id;
        this.active = false;

        this.sprite = scene.physics.add.staticSprite(x, y, 'crystalOff');
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

            this.sprite.setTexture('crystalMid');

            this.scene.time.delayedCall(500, () =>
            {
                this.sprite.setTexture('crystalOn');

                this.scene.grid.interactives.forEach(obj =>
                {
                    if (obj.id === this.id)
                        obj.activate();
                });
            });
        }
    }
}