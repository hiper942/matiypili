import { Command } from "./Command";

export class MovePaddleCommand extends Command {

    constructor(paddle, direction) {
        super();
        this.paddle = paddle;
        this.direction = direction; // 'up' or 'down'
    }
    
    execute() {
        if (this.direction === 'up') {
            this.paddle.sprite.setVelocityY(-this.paddle.baseSpeed);
        } else if (this.direction === 'down') {
            this.paddle.sprite.setVelocityY(+this.paddle.baseSpeed);
        } else {
            this.paddle.sprite.setVelocityY(0);
        }
    }
}