var knotHash = require('./shared/knot-hash');

//const inputRaw = `3,4,1,5`;
//const inputRaw = `1,2,4`;
const inputRaw = `192,69,168,160,78,1,166,28,0,83,198,2,254,255,41,12`;

const hash = knotHash.getHash(inputRaw);
console.log(hash);

function GetHash1(inputRaw) {
    const input = inputRaw.split(',')
        .map(n => +n);
    const circularList = knotHash.generateCircularList(256);
    let index = 0;
    let skipSize = 0;
    ({ index, skipSize } = knotHash.reverseLengths(input, circularList, index, skipSize));
    return circularList;
}
