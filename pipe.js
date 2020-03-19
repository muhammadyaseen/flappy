
class Pipe {
    
    constructor() {
        this.top = random(height / 2);
        this.bottom = random(height / 2);
        this.x = width;
        this.w = 80;
        this.speed = 5;
        this.highlight = false;
    }

    show() {
        //fill(255);
        if (this.highlight) {
            fill(255, 0, 0);
        }
        else {
            fill(255);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }
    
    update() {
        this.x -= this.speed;
    }
    
    offscreen() {
            return this.x < -this.w;
    }
    
    hits(bird) {
        if (bird.y < this.top || bird.y > (height - this.bottom)) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        return false;
    }
}