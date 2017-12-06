const input = `11	11	13	7	0	15	5	5	4	4	1	1	7	1	15	11`;

Array.prototype.clone = function() {
	return this.slice(0);
};
    

const banks = input.split('\t')
    .map(b => +b);
//const output = getMoves(banks); //solution 1
const output = getInfiniteLoopCycles(banks);
console.log(output);

function getMoves(initialBanks) {
    let move = initialBanks.clone();
    let moves = [move];
    let inifiteLoop = false;
    while (!inifiteLoop) {
        move = getNextMove(move);
        if (!alreadyMadeMove(moves, move)) {
            moves.push(move);
        } else {
            inifiteLoop = true;
        }
    };
    return moves.length;
}

function getInfiniteLoopCycles(initialBanks) {
    let move = initialBanks.clone();
    let moves = [move];
    let inifiteLoop = false;
    while (!inifiteLoop) {
        move = getNextMove(move);
        if (!alreadyMadeMove(moves, move)) {
            moves.push(move);
        } else {
            inifiteLoop = true;
        }
    };
    const infiniteIndex = moves.findIndex(m => banksMatch(m, move));
    return moves.length - infiniteIndex;
}

function getNextMove(currentMove) {
    let nextMove = currentMove.clone();
    const maxIndex = getMaxBlocksIndex(currentMove);
    let blocksToAdd = nextMove[maxIndex];
    nextMove[maxIndex] = 0;
    let index = inc(maxIndex, nextMove);
    while(blocksToAdd > 0) {
        nextMove[index]++;
        index = inc(index, nextMove);
        blocksToAdd--;
    }
    return nextMove;
}

function inc(index, array) {
    let result = index + 1;
    if (result >= array.length) {
        result = 0;
    }
    return result;
}

function alreadyMadeMove(moves, move) {
    return moves.some(m => banksMatch(m, move));
}

function banksMatch(move1, move2) {
    return move1.every((m1, i) => move2[i] === m1);
}

function getMaxBlocksIndex(banks) {
    const result = banks.map((b, i) => ({ block: b, index: i}))
        .sort(mostBlocksCompare);
    return result[0].index;
}

function mostBlocksCompare(a, b) {
    let result = b.block - a.block;
    if (result === 0) {
        result = a.index - b.index;
    }
    return result;
}