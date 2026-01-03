export default class Rock
{
    constructor(scene, x, y, id)
    {
        this.scene = scene;
        this.id = id;

        this.sprite = scene.physics.add.sprite(x, y, 'rock')
            .setScale(0.9);

        this.sprite.body.setBounce(0);
        this.sprite.body.setDrag(600, 0);
        this.sprite.body.setFriction(1, 1);
        this.sprite.body.setMass(30);
        this.sprite.body.setCollideWorldBounds(true);

        this.sprite.body.maxVelocity.x = 200;

        // --- ONLINE ---
        this.lastNetSend = 0;
        this.NET_RATE = 100; // 10 veces/segundo

        if (scene.isOnline && scene.character !== 'pili')
        {
            this.sprite.body.moves = false;
        }
    }

    update()
    {
        // local
        if (!this.scene.isOnline) return;

        // SOLO el cliente que controla a PILI manda estado
        if (this.scene.character !== 'pili') return;

        const now = Date.now();
        if (now - this.lastNetSend < this.NET_RATE) return;

        this.lastNetSend = now;

        const b = this.sprite.body;

        // solo mandar si se está moviendo
        if (Math.abs(b.velocity.x) < 1 && Math.abs(b.velocity.y) < 1) return;

        this.scene.socket.send(JSON.stringify({
            type: 'rockState',
            roomId: this.scene.roomId,
            id: this.id,
            x: this.sprite.x,
            y: this.sprite.y,
            vx: b.velocity.x,
            vy: b.velocity.y
        }));
    }

    // remoto
    applyRemoteState(data)
    {
        this.sprite.x = Phaser.Math.Linear(this.sprite.x, data.x, 0.5);
        this.sprite.y = Phaser.Math.Linear(this.sprite.y, data.y, 0.5);

        this.sprite.body.setVelocity(data.vx, data.vy);
    }
}
