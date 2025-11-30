export default class Spike
{
    constructor(scene, x, y, w, h, onTouch)
    {
        this.scene = scene;
        this.onTouch = onTouch;   // callback

        // Crear sprite del pincho
        const g = scene.add.graphics();
        g.fillStyle(0xff4444); // rojo agresivo
        g.fillRect(0, 0, w, h);
        g.generateTexture(`spike-${x}-${y}`, w, h);
        g.destroy();

        this.sprite = scene.physics.add.staticSprite(x, y, `spike-${x}-${y}`);
        this.sprite.setOrigin(0.5, 0.5);

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