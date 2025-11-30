import Platform from "./Platform.js";
import Switch from "./Switch.js";
import Door from "./Door.js";
import Rock from "./Rock.js";
import Button from "./Button.js";
import Trapdoor from "./Trapdoor.js";
import Bridge from "./Bridge.js";
import Spike from "./Spike.js";

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

        this.matiSpawn = null;
        this.piliSpawn = null;

        // Esto poner false en la entrega
        this.debug = false;

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
                        const d = new Door(this.scene, x, y);
                        this.door = d;
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
                        const bridge = new Bridge(this.scene, x, y, this.cellSize, this.cellSize, 1);
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

                    default:
                        console.warn("Grid: Tile unknown: ", tile);
                        break;
                }
            }
        }
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