export default class Platform{
    constructor(scene, x, y, width, height){
        const graphics = scene.add.graphics();
        
        graphics.fillStyle(0x34543a);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture(`platform-${x}-${y}`, width, height);
        graphics.destroy();

        let block = scene.physics.add.staticSprite(x, y, `platform-${x}-${y}`);
        block.setOrigin(0.5, 0.5);

        return block;
    }
}