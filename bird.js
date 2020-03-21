
class Bird {
    
    constructor(brain) {
        this.y = height / 2;
        this.x = 25;
        this.size = 32;
        this.gravity = 0.6;
        this.velocity = 0;
        this.lift = -20.0;
        this.air_resistence = 0.9;

        this.score = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain.copy();
        } else { 
            this.brain = new TFNeuralNetwork(5, 8, 2);
        }
    }

    show() {
        
        //stroke(255);
        //fill(255, 50);
        //ellipse(this.x, this.y, this.size, this.size);
        
    }
    
    think(pipes) {
        
        // figure out which is the closest pipe
        // only the pipe right in front of bird matters for decision making 
        // pipes farther away, or those we have already passed don't matter

        let closest = null;
        let closestDist = Infinity;

        for (let i = 0; i < pipes.length; i++) {
            let d = (pipes[i].x + pipes[i].w) - this.x;
            if ( d < closestDist && d > 0) {
                closest = pipes[i];
                closestDist = d;
            }
        }

        let inputs = [];

        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / height;
        inputs[4] = this.velocity / 10;

        let output = this.brain.predict(inputs);

        if (output[0] > 0.5) {
            this.up();
        }
    }

    update() {
        
        // the longer the birds survives, the higher score it should get
        // so we give it 1 score for every incremental correct step
        this.score++;

        this.velocity += this.gravity;
        this.velocity *= this.air_resistence;
        this.y += this.velocity;
        // if (this.y > height) {
        //     this.y = height;
        //     this.velocity = 0;
        // }
    }
    
    up() {
            
        this.velocity += this.lift;
        //console.log(this.velocity);
    }

    dispose() {
        this.brain.dispose();
    }
    offscreen() {
        return this.y > height || this.y < 0;
    }

    mutate(rate) {
        this.brain.mutate(rate);
    }
}