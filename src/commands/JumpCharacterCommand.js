import { Command } from "./Command.js";

export class JumpCharacterCommand extends Command{
    constructor(character){
        super();
        this.character = character;
    }

    execute(){
        if(this.character.body.onFloor()){
            this.character.setVelocityY(-this.character.jumpStrength);
        }
    }
}