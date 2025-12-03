export default class Spike
{
    constructor(scene, x, y, onTouch)
    {
        this.scene = scene;
        this.onTouch = onTouch;        

        this.sprite = scene.physics.add.staticSprite(x, y, 'spike');
        this.sprite.setOrigin(0.5, 0.5);
        this.sprite.setOffset(20,0);

        // Marcar para debug si quieres
        this.sprite.isSpike = true;
    }

    update(mati, pili)
    {
        if (this.scene.physics.overlap(mati.sprite, this.sprite))
        {
            this.onTouch("Mati");
        }

        if (this.scene.physics.overlap(pili.sprite, this.sprite))
        {
            this.onTouch("Pili");
        }
    }
}