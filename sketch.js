
var bird;
var pipes = [];

function setup() {
    
    createCanvas(400, 600);
    bird = new Bird();

    pipes.push(new Pipe());
}

function draw() {


    background(0);
    bird.update();
    bird.show();   
    
    //rect(-10, 10, 100, 100);

    if (frameCount % 50 == 0) {
        pipes.push(new Pipe());
    } 

    for(var i = pipes.length - 1; i >= 0; i--) {
        console.log(pipes.length);
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(bird)) {
            console.log('hit');
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i,1);
        }
    }
}


function keyPressed() {
    if (key == ' ') {
        bird.up();
        //console.log(key);
    }

}