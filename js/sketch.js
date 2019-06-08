let grid;
let state = false;
let undoArray = [];
let score = 0;
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
    const content = createCanvas(400, 400);
    content.parent('content');
    grid = blankGrid();
    //Add number into table 
    addNumber(); //one number
    addNumber(); //two number
    updateGUI();
    pushToList();
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
function pushToList() {
    if (undoArray.length > 0 && state === true) {
        state = false;
        undoArray = [[copyGrid(grid), score]];
    }
        undoArray.push([copyGrid(grid), score]);
}
function Undo() {
    if (state === false) {
        state = true;
        undoArray.pop();
    }
    if (undoArray.length == 0) {
        return;
    }
    [grid, score] = undoArray.pop();
    updateGUI();
}
function updateGUI() {
    background(255);
    draw();
    document.getElementById('score').innerHTML = score;
}
//Draw it
function draw() {
    background(220);
    let w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            // noFill();
            strokeWeight(15);
            stroke('#bbada0');

            let value = grid[i][j];
            let s = value.toString();
            if (value != 0) {
                // stroke(0);
                fill(colors[s].color);
            } else {
                // noFill();
                fill(colors[0].color);
            }
            rect(i * w, j * w, w, w); // Draw a rectangle at location (i*w, j*w) with a width and height of w.
            if (grid[i][j] !== 0) {
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(colors[s].size);
                text(value, i * w + w / 2, j * w + w / 2); //center of textbox
            }
        }
    }
}
//Slide function
function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}
//Copy
function copyGrid(grid) {
    let extra = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            extra[i][j] = grid[i][j];
        }
    }
    return extra;
}
//Compare
function compare(a, b) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (a[i][j] !== b[i][j]) {
                return true;
            }
        }
    }
    return false;
}
function flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid;
}
function rotateGrid(grid) {
    let newGrid = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }
    return newGrid;
}
//One move
function keyPressed() {
    let flipped = false;
    let rotated = false;
    if (keyCode === DOWN_ARROW) {
        //DO NOTHING
    } else if (keyCode === UP_ARROW) {
        grid = flipGrid(grid);
        flipped = true;
    } else if (keyCode === RIGHT_ARROW) {
        grid = rotateGrid(grid);
        rotated = true;
    } else if (keyCode === LEFT_ARROW) {
        grid = rotateGrid(grid);
        grid = flipGrid(grid);
        rotated = true;
        flipped = true;
    }
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
        grid = flipGrid(grid);
    }
    if (rotated) {
        grid = rotateGrid(grid);
        // grid = rotateGrid(grid);
        // grid = rotateGrid(grid);
    }
    if (changed) {
        addNumber();
        pushToList();
    }
    updateGUI();
    
    let win = isGameWon();
    if (win) {
        Swal.fire({
            title: 'Sweet!',
            text: 'YOU DID IT!.',
            imageUrl: 'https://sweetalert2.github.io/images/nyan-cat.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            animation: false
          })
       newGame();
    }
    let lose = isGameOver();
    if (lose) {
        Swal.fire({
            title: 'Game Over :(((((((',
            width: 600,
            padding: '3em',
            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              center left
              no-repeat
            `
          })
          newGame();
    }

}

//Combine function
function combine(row) {
    for (let i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            score += row[i];
            row[i - 1] = 0;
        }
    }
    return row;
}
//Operate 
function operate(row) {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
}
//New game
function newGame() {
    undoArray = [];
    score = 0;
    setup();

}
