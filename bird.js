function Bird() {
    
    this.y = height/2;
    this.x = 25;
    this.size = 32;

    this.gravity = 0.6;
    this.velocity = 0;

    this.lift = -20.0;
    this.air_resistence = 0.9;

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);    
    }

    this.update = function() {

        this.velocity += this.gravity;
        this.velocity *= this.air_resistence;

        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    this.up = function() {
        
        this.velocity += this.lift;
        //console.log(this.velocity);
    }
}