const TOTAL = 250;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let cycles = 100;
let slider;
let bgImage;
var birdImage;
var pipeFaceUpImg;
var pipeFaceDownImg;
var pipeBodyImg;

function preload() {
    bgImage = loadImage('assets/bg2.jpg');
    birdImage = loadImage('assets/bird2.png');
    pipeFaceUpImg = loadImage('assets/pipe-face-small.png');
    pipeFaceDownImg = loadImage('assets/pipe-face-small-down.png');
    pipeBodyImg = loadImage('assets/pipe-body-small.png');
}

function setup() {
    createCanvas(640, 480);
    tf.setBackend('cpu');
    slider = createSlider(1, 100, 1);
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
    // Here, we use a callback to display the image after loading
    // loadImage('assets/bg.jpg', img => {
    //     image(img, 0, 0, 640, 480);
    // });
}

function draw() {
   
    // evolution logic
    for(let n = 0; n < slider.value(); n++) {

        // add a new pipe every 75 draw calls
        if (counter % 75 == 0) {
            pipes.push(new Pipe());    
        } 
        counter++;
        
        for(var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();

            // remove any birds that have hit a pipe
            for (let j = birds.length - 1; j >= 0; j-- ){
                if (pipes[i].hits(birds[j])) {
                    savedBirds.push(birds.splice(j,1)[0]);
                }
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i,1);
            }
        }

        // if a bird has gone off screen, remove it from active pool
        for (let j = birds.length - 1; j >= 0; j-- ){
            if (birds[j].offscreen()) {
                savedBirds.push(birds.splice(j,1)[0]);
            }
        }
        
        for (let bird of birds) {
            bird.think(pipes);
            bird.update();
            bird.show();   
        }

        if (birds.length == 0) {
            counter = 0;
            nextGeneration();
            pipes = [];
        }
    }

    // drawing logic
    background(bgImage);

    for (let bird of birds) { 
        bird.show(birdImage);
        image(birdImage, bird.x - bird.size/2, bird.y - bird.size/2, bird.size, bird.size);   
    }

    for (let pipe of pipes) { 
        pipe.show();

        image(pipeFaceDownImg, pipe.x, pipe.top - 20, pipe.w, 20);
        image(pipeBodyImg, pipe.x, 0, pipe.w, pipe.top - 20);

        image(pipeFaceUpImg, pipe.x, height - pipe.bottom, pipe.w, 20);
        image(pipeBodyImg, pipe.x, height - pipe.bottom + 20, pipe.w, pipe.bottom - 20);
    }
}


function keyPressed() {
    if (key == ' ') {
        bird.up();
        //console.log(key);
    }

}