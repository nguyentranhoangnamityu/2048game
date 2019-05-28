let grid;

//BlankGrid
function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

//Create 4 arrays
function setup() {
    createCanvas(400, 400);
    grid = blankGrid();
    //Add number into table 
    addNumber(); //one number
    addNumber(); //two number
    console.table(grid);
}
//Add random number 2 or 4 into table
function addNumber() {
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                options.push({
                    x: i,
                    y: j
                })
            }
        }
    }

    if (options.length > 0);

    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
}
//Draw it
function draw() {
    background(187,173,161); 
    let w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(5);
            stroke(50);
            rect(i * w, j * w, w, w); // Draw a rectangle at location (i*w, j*w) with a width and height of w.
            let value = grid[i][j];
            if (grid[i][j] !== 0) {
                textAlign(CENTER, CENTER);
                textSize(64);
                fill(0);
                text(value, i * w + w / 2, j * w + w / 2); //center of textbox
            }
        }
    }
}
