export default class Switch 
{
    constructor(scene, x, y) 
    {
        this.scene = scene;
        this.active = false;
        this.isMoving = false;

        this.sprite = scene.add.sprite(x, y, 'switchActivation');
        this.sprite.setOrigin(0.5, 0.575);

        scene.physics.add.existing(this.sprite, true);

        this.eventSent = false;
    }

    update(mati) 
    {
        if (this.isMoving || this.active) return;

        // Si Matiah toca el switch
        if (this.scene.physics.overlap(mati.sprite, this.sprite))
        {
            this.isMoving = true;  
            this.sprite.play('switchActivation');

            if (this.scene.isOnline && !this.hasSentEvent)
            {
                this.scene.socket.send(JSON.stringify(
                {
                    type: 'switchActivated',
                    roomId: this.scene.roomId
                }
                ));

                this.hasSentEvent = true;
            }

            this.sprite.on("animationcomplete", () => {
                this.active = true;
            });
        }
    }

    forceActivate()
    {
        if (this.active || this.isMoving) return;

        this.isMoving = true;
        this.sprite.play('switchActivation');

        this.sprite.once('animationcomplete', () =>
        {
            this.active = true;
        });
    }
}