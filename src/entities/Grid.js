import Platform from "./Platform.js";
import Switch from "./Switch.js";
import Door from "./Door.js";
import Rock from "./Rock.js";
import Button from "./Button.js";
import Trapdoor from "./Trapdoor.js";
import Bridge from "./Bridge.js";
import Spike from "./Spike.js";
import PressurePlate from "./PressurePlate.js";
import Decoration from "./Decoration.js";

export default class Grid
{
    constructor(scene, matrix, cellSize = 64)
    {
        this.scene = scene;
        this.matrix = matrix;
        this.cellSize = cellSize;

        this.platforms = this.scene.physics.add.staticGroup();
        this.switch = null;
        this.door = null;
        this.rocks = [];
        this.interactives = [];
        this.buttons = [];
        this.spikes = [];
        this.pressurePlates = [];
        this.decoPos = [];

        this.matiSpawn = null;
        this.piliSpawn = null;

        // Esto poner false en la entrega
        this.debug = true;

        this.build();
    }

    build()
    {
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {

                const tile = this.matrix[row][col];
                const x = col * this.cellSize + this.cellSize / 2;
                const y = row * this.cellSize + this.cellSize / 2;

                if (this.debug) this.drawDebugCell(x, y);

                switch (tile) {

                    // Vacio
                    case 0:
                        break;

                    // Solido
                    case 1: 
                    {
                        const platform = new Platform(
                            this.scene,
                            x,
                            y,
                            this.cellSize,
                            this.cellSize
                        );

                        this.platforms.add(platform.sprite);
                        break;
                    }
                    
                    // Interruptor
                    case 2: 
                    { 
                        const sw = new Switch(this.scene, x, y);
                        this.switch = sw;
                        break;
                    }
                    
                    // Puerta
                    case 3: 
                    { 
                        this.doorpos = { x, y };
                        
                        /*
                        const d = new Door(this.scene, x, y);
                        this.door = d;
                        */
                        break;
                    }

                    // Spawn Mati
                    case 4: 
                    {
                        this.matiSpawn = { x, y };
                        break;
                    }

                    // Spawn Pili
                    case 5: 
                    {
                        this.piliSpawn = { x, y };
                        break;
                    }

                    // Roca
                    case 6:
                    {
                        const rock = new Rock(this.scene, x, y);
                        this.rocks.push(rock);
                        break;
                    }

                    // Boton
                    case 7:
                    {
                        const btn = new Button(this.scene, x, y, 1);
                        this.buttons.push(btn);
                        break;
                    }

                    // Puente
                    case 8:
                    {
                        const img = this.bridge(row,col);
                        const bridge = new Bridge(this.scene, x, y, 1, img);
                        this.interactives.push(bridge);

                        this.platforms.add(bridge.sprite);
                        break;
                    }

                    // Trampilla
                    case 9:
                    {
                        const trapdoor = new Trapdoor(this.scene, x, y, this.cellSize, this.cellSize, 1);
                        this.interactives.push(trapdoor);

                        this.platforms.add(trapdoor.sprite);
                        break;
                    }

                    // Pinchos
                    case 10:
                    {
                        const spike = new Spike(this.scene, x, y, this.cellSize, this.cellSize, (who) => this.scene.onSpikeTouched(who));
                        this.spikes.push(spike);
                        break;
                    }

                    // Placa de presión
                    case 11:
                    {
                        const plate = new PressurePlate(this.scene, x, y, 1);
                        this.pressurePlates.push(plate);
                        break;
                    }

                    // Decoración
                    case 12:
                    {
                        const temp = {x, y, row, col};
                        this.decoPos.push(temp);
                        break;
                    }

                    default:
                        console.warn("Grid: Tile unknown: ", tile);
                        break;
                }
            }
        }
    }

    grass(x, y)
    {
        const isGrass = (tile) => tile === 12;
        const left = isGrass (this.matrix [x][y - 1]);
        const right = isGrass (this.matrix [x][y + 1]);

        if (!left && right) return 'grassL';
        if (left && right) return 'grassM';
        if (left && !right) return 'grassR';
    }

    bridge(row, col)
    {
        const isBridge = (tile) => tile === 8;
        const left = this.matrix[row][col - 1] === 8;
        const right = this.matrix[row][col + 1] === 8;

        if (!left && right) return 'bridgeL';
        if (left && right) return 'bridgeM';
        if (left && !right) return 'bridgeR';
    }

    drawDebugCell(x, y)
    {
        const g = this.scene.add.graphics();
        g.lineStyle(2, 0xffffff, 0.2);   // Blanco con transparencia
        g.strokeRect(
            x - this.cellSize / 2,
            y - this.cellSize / 2,
            this.cellSize,
            this.cellSize
        );
    }
}