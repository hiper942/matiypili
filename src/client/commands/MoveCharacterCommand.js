import { Command } from "./Command.js";

export class MoveCharacterCommand extends Command {
    constructor(character, vx){
        super();
        this.character = character;
        this.vx = vx;
    }

    execute(){
        this.character.setVelocityX(this.vx * this.character.baseSpeed);
    }
}