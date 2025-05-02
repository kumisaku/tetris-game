
// https://stackoverflow.com/a/1527820/2124254
function generatePosition(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max-min + 1)) + min;
}

// https://tetris.fandom.com/wiki/Random_Generator
function generateBlock(){
    const sequence = ['I','J','L','O','S','T','Z'];

    while(sequence.length){
        const rad = generatePosition(0,sequence.length-1);
        const name = sequence.splice(rand,1)[0];
    }
}