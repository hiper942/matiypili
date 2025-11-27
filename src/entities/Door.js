export default class Door{
    constructor(scene, x, y){
        this.scene = scene;
        this.open = false;

        this.sprite = scene.physics.add.staticSprite(x, y, null)
            .setDisplaySize(50, 80)
            .setTint(0x5d4037)
            .setOrigin(0, 0);
    }

    update(){
        if(this.open){
            this.sprite.setVisible(false);
            this.sprite.body.enable = false;
        }
    }
}