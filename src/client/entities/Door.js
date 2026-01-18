export default class Door 
{
    constructor(scene, x, y) 
    {
        this.scene = scene;
        this.open = false;

        // Sprite estático de colisión
        this.sprite = scene.physics.add.sprite(x, y, 'doorOpen', 0)
            .setDisplaySize(256, 256)
            .setOrigin(0.325, 0.85)
            .setDepth(-2);

        this.sprite.body.setSize(64, 96);
        this.sprite.body.setOffset(48, 128);
        this.sprite.body.immovable = true;
        this.sprite.body.allowGravity = false;
        
        this.trigger = scene.add.rectangle(x, y - 24, 64, 96, 0xffffff, 0);
        scene.physics.add.existing(this.trigger, false);

        this.trigger.body.allowGravity = false;
        this.trigger.body.immovable = true;
    }

    update(mati, pili, nextLevel) 
    {
        if (!this.open) return;

        const matiInDoor = this.scene.physics.overlap(mati.sprite, this.trigger);
        const piliInDoor = this.scene.physics.overlap(pili.sprite, this.trigger);
        if (this.scene.isOnline)
        {
            if (matiInDoor && piliInDoor && this.scene.localPlayer.isLocal)
            {
                this.scene.socket.send(JSON.stringify({
                    type: 'levelCompleted',
                    roomId: this.scene.roomId
                }));

                /*this.scene.scene.start(nextLevel,
                {
                    socket: this.scene.socket,
                    playerIndex: this.scene.playerIndex,
                    character: this.scene.character,
                    roomId: this.scene.roomId
                });*/
            }
        }
        else if (matiInDoor && piliInDoor && !this.scene.isOnline)
        {
            this.scene.scene.start(nextLevel);
        }
    }

    openDoor()
    {
        if (this.open) return;

        this.open = true;
        this.sprite.play('doorOpen');

        this.sprite.once("animationcomplete", () =>
        {
            this.sprite.body.enable = false;
        });

        if (this.scene.isOnline)
        {
            this.scene.socket.send(JSON.stringify({
                type: 'doorOpened',
                roomId: this.scene.roomId
            }));
        }
    }

    forceOpen()
    {
        if (this.open) return;

        this.open = true;
        this.sprite.play('doorOpen');

        this.sprite.once("animationcomplete", () =>
        {
            this.sprite.body.enable = false;
        });
    }
}