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
        for (let row = 0; row < this.matrix.length; row++)
            {
            for (let col = 0; col < this.matrix[row].length; col++)
                {

                const tile = this.matrix[row][col];
                const x = col * this.cellSize + this.cellSize / 2;
                const y = row * this.cellSize + this.cellSize / 2;

                if (this.debug) this.drawDebugCell(x, y);

                switch (tile)
                {
                    // Vacio
                    case 0:
                    {
                        break;
                    }

                    // Solido
                    case 1: 
                    {
                        const img = this.getAutotile(row, col);
                        const platform = new Platform(this.scene, x, y, img);

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
                        const trapdoor = new Trapdoor(this.scene, x, y, this.cellSize, this.cellSize, 2);
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
                        const plate = new PressurePlate(this.scene, x, y, 2);
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

    getAutotile(row, col)
    {
        const mask = this.getAutotileMask(row, col);

        const U  = 1;
        const D  = 2;
        const L  = 4;
        const R  = 8;
        const UL = 16;
        const UR = 32;
        const DL = 64;
        const DR = 128;

        const rows = this.matrix.length;
        const cols = this.matrix[0].length;

        const atTop    = (row === 0);
        const atBottom = (row === rows - 1);
        const atLeft   = (col === 0);
        const atRight  = (col === cols - 1);

        // Ejemplo MUY típico, ajusta a tu gusto:
        if (atTop && atLeft && mask === 0)        return 0; // esquina superior izquierda
        if (atTop && !atLeft && !atRight && ((mask === (L | R)) || (mask === (L | R | DL)) || (mask === (L | R | DR)))) return 1; // borde superior
        if (atTop && atRight && mask === L)       return 2; // esquina sup. derecha

            // Ejemplo MUY típico, ajusta a tu gusto:
        if (atTop && atLeft && mask === (R | D))        return 3; // esquina superior izquierda
        if (atTop && !atLeft && !atRight && (mask === (L | R | D))) return 4; // borde superior
        if (atTop && atRight && mask === (L | D))       return 5; // esquina sup. derecha

        // ---------- CASOS "PUROS" SEGÚN LO QUE HAS ESCRITO ----------
        switch (mask)
        {
            // 21: nada alrededor
            case 0:
                return 21;

            // 16: T plataforma
            case U:
                return 16;

            case (U | UR):
                return 16;

            case (U | UL):
                return 16;

            case (U | UR | UL):
                return 16;

            // 17: B plataforma
            case D:
                return 17;

            case (D | DR):
                return 17;

            case (D | DL):
                return 17;

            case (D | DL | DR):
                return 17;

            // 27: L plataforma
            case L:
                return 27;

            // 28 ó 15: R plataforma
            // OJO: en tu lista 15 y 28 son iguales ("R plataforma").
            // Me quedo con 28 y dejo 15 libre por si luego quieres diferenciar algo (diagonal, borde, etc.).
            case R:
                return 15;

            // 18: T y B plataforma
            case (U | D):
                return 18;
            case (U | D | DR):
                return 18;
            case (U | D | DL):
                return 18;
            case (U | D | UR):
                return 18;
            case (U | D | UL):
                return 18;
            case (U | D | DR | DL):
                return 18;
            case (U | D | DR | UL):
                return 18;
            case (U | D | DR | UR):
                return 18;
            case (U | D | DL | UR):
                return 18;
            case (U | D | DL | UL):
                return 18;
            case (U | D | UL | UR):
                return 18;
            case (U | D | UL | UR | DL):
                return 18;
            case (U | D | UL | UR | DR):
                return 18;
            case (U | D | UL | DL | DR):
                return 18;
            case (U | D | UR | DR | DL):
                return 18;
            case (U | D | UR | DR | DL | UL):
                return 18;

            // 24: L y R plataforma
            case (L | R):
                return 24;
            case (L | R | DR):
                return 24;
            case (L | R | DL):
                return 24;
            case (L | R | UR):
                return 24;
            case (L | R | UL):
                return 24;
            case (L | R | DR | DL):
                return 24;
            case (L | R | DR | UL):
                return 24;
            case (L | R | DL | UR):
                return 24;
            case (L | R | UL | UR):
                return 24;
            case (L | R | UL | UR | DL):
                return 24;
            case (L | R | UL | UR | DR):
                return 24;
            case (L | R | UL | DL | DR):
                return 24;
            case (L | R | UR | DR | DL):
                return 24;
            case (L | R | UR | DR | DL | UL):
                return 24;

            // 25: T y R plataforma
            case (U | R):
                return 25;
            case (U | R | UL):
                return 25;

            // 26: T y L plataforma
            case (U | L):
                return 26;
            case (U | L | UR):
                return 26;

            // 19: T, R, B plataforma
            case (U | R | D):
                return 19;

            // 20: T, L, B plataforma
            case (U | L | D):
                return 20;

            // 22: TR, R plataforma
            case (L | R | UR):
                return 22;
            case (L | R | DR):
                return 22;
            case (L | R | UR | DR):
                return 22;

            // 23: TL, L plataforma
            case (L | R | UL):
                return 23;
            case (L | R | DL):
                return 23;
            case (L | R | UL | DL):
                return 23;

            // ---------- BLOQUE “GORDO” DE ESQUINAS Y CRUCES ----------

            // 12: T, TR, R plataforma
            case (U | UR | R):
                return 12;

            // 14: L, TL, T plataforma
            case (L | UL | U):
                return 14;

            // 13: L, TL, T, TR, R plataforma
            case (L | UL | U | UR | R):
                return 13;

            // 8: L, BL, B plataforma
            case (L | DL | D):
                return 8;

            case (L | DL | D | U):
                return 8;

            // 7: L, BL, B, BR, R plataforma
            case (L | DL | D | DR | R):
                return 7;

            case (L | DL | D | DR | R | UL):
                return 7;

            case (L | DL | D | DR | R | UR):
                return 7;

            // 6: B, BR, R plataforma
            case (D | DR | R):
                return 6;

            case (D | DR | R | U):
                return 6;

            // 9: T, TR, R, BR, B plataforma
            case (U | UR | R | DR | D):
                return 9;

            // 11: T, TL, L, BL, B plataforma
            case (U | UL | L | DL | D):
                return 11;

            // 10: T, TR, R, BR, B, BL, L, TL plataforma (rodeado)
            case (U | UR | R | DR | D | DL | L | UL):
                return 10;

            // ---------- POR DEFECTO ----------
            default:
                // Fallback razonable: aislado
                return 21;
        }
    }

    getAutotileMask(row, col)
    {
        const t = this.matrix;
        const isP = (r, c) => t[r] && t[r][c] === 1;

        let mask = 0;

        if (isP(row - 1, col)) mask |= 1;      // up
        if (isP(row + 1, col)) mask |= 2;      // down
        if (isP(row, col - 1)) mask |= 4;      // left
        if (isP(row, col + 1)) mask |= 8;      // right

        if (isP(row - 1, col - 1)) mask |= 16; // up-left
        if (isP(row - 1, col + 1)) mask |= 32; // up-right
        if (isP(row + 1, col - 1)) mask |= 64; // down-left
        if (isP(row + 1, col + 1)) mask |= 128;// down-right

        return mask;
    }

    drawDebugCell(x, y)
    {
        const g = this.scene.add.graphics();
        g.lineStyle(2, 0xffffff, 0.2);
        g.strokeRect(
            x - this.cellSize / 2,
            y - this.cellSize / 2,
            this.cellSize,
            this.cellSize
        );
    }
}