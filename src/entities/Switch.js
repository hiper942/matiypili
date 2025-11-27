export default class Switch {
    constructor(scene, x, y) {
        this.scene = scene;
        this.active = false;

        this.sprite = scene.add.rectangle(x, y, 40, 20, 0xcddc39);

        scene.physics.add.existing(this.sprite, true);

        this.sprite.body.setOffset(0, 0);
    }

    update(mati) {

        // Si Mati toca el switch
        if (this.scene.physics.overlap(mati.sprite, this.sprite)) {
            this.active = true;
            this.sprite.fillColor = 0xffeb3b;
        }
    }
}