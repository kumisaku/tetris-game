
const tetrominoSequence = []

const tetrominos = {
    'I':[
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ]
}

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

function getTetromino(){
    if(tetrominoSequence.length == 0){
        generateBlock();
    }

    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];
}
