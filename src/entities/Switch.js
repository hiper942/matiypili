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
    }

    update(mati) 
    {
        if (this.isMoving) return;

        // Si Matiah toca el switch
        if (this.scene.physics.overlap(mati.sprite, this.sprite)){
            this.isMoving = true;  
            this.sprite.play('switchActivation');

            this.sprite.on("animationcomplete", () => {
                this.active = true;
            });
        }
    }
}