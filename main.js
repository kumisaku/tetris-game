
// set the tetromino position
// https://stackoverflow.com/a/1527820/2124254
function generatePosition(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max-min + 1)) + min;
}


// generate tetromino block
// https://tetris.fandom.com/wiki/Random_Generator
function generateBlock(){
    const sequence = ['I','J','L','O','S','T','Z'];

    while(sequence.length){
        const rand = generatePosition(0,sequence.length-1);
        const name = sequence.splice(rand,1)[0];
        tetrominoSequence.push(name);
    }
}

function spawnNextTetro(){
    if(tetrominoSequence.length == 0){
        generateBlock();
    }

    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];

    // I & O starts at the middle
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length/2);

    //I start on row 21(-1) and others start at row 22(-2)
    const row = name === 'I' ? -1 : -2;

    return{
        name: name, //current piece name
        matrix: matrix, //current matrix
        row: row,   //current row
        col: col    //current column
    };
}

//90degree rotate
//https://codereview.stackexchange.com/questions/186805/rotate-an-n-%c3%97-n-matrix-90-degrees-clockwise/186834#186834
function rotate(matrix){
    const N = matrix.length-1;
    const result = matrix.map((row,i) => row.map((val,j) => matrix[N-j][i]));

    return result;
}

// checking if valid
function isValidMove(matrix,cellRow,cellCol){
    for(let row = 0; row < matrix.length;row++){
        for(let col = 0; col < matrix[row].length;col++){
            if(matrix[row][col] && (

                //outisde game bounds
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= playfield.length ||

                //collide with other pieces
                playfield[cellRow + row][cellCol + col])
            ){
                return false;
            }
        }
    }
    return true;
}

function placeTetromino(){
    for(let row = 0; row < tetromino.matrix.length;row++){
        for(let col = 0; col < tetromino.matrix[row].length; col++){
            if(tetromino.matrix[row][col]){

                //game over if piece offscreen
                if(tetromino.row + row < 0){
                    return showGameOver();
                }

                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    // check clear line
    for(let row = playfield.length-1; row >= 0;){
        if(playfield[row].every(cell => !!cell)){
            for(let r = row; r >= 0;r--){
                for(let c = 0; c < playfield[r].length;c++){
                    playfield[r][c] = playfield[r-1][c]; 
                }
            }
        }
        else{
            row--;
        }
    }

    tetromino = spawnNextTetro();
}

function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;
  
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];

//keeping track of what is the cell in the game
//tetris playfield is 10x20
const playfield = [];

//making empty state
for(let row = -2; row < 20;row++){
    playfield[row] = [];
    for(let col = 0;col < 10;col++){
        playfield[row][col] = 0;
    }
}

const tetrominos = {
    'I':[
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    'J':[
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    'L':[
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
    'O':[
        [1,1],
        [1,1],
    ],
    'S':[
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    'Z':[
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    'T':[
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ]
};

const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

let count = 0;
let tetromino = spawnNextTetro();
let rAF = null;
let gameOver = false;