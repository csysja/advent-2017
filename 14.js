var knotHash = require('./shared/knot-hash');

//const input = 'flqrgnkx';
const input = 'jxqlasbh';
run();

async function run() {
    const usedSquares = getUsedSquares(input);
    console.log(usedSquares);
    const numRegions = await getNumRegions(input);
    console.log(numRegions);
}

async function getNumRegions(input) {
    const array = getBinaryArray(input);
    let regions = [];
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array.length; x++) {
            const isUsed = array[y][x] === 1;
            if (isUsed) {
                const upRegionIndex = regions.findIndex(r => r.some(p => p.x === x && p.y === y-1));
                const isUpRegion = upRegionIndex > -1;
                const leftRegionIndex = regions.findIndex(r => r.some(p => p.x === x-1 && p.y === y));
                const isLeftRegion = leftRegionIndex > -1;
                if (isUpRegion && isLeftRegion && upRegionIndex !== leftRegionIndex) {
                    regions[leftRegionIndex] = regions[upRegionIndex].concat(regions[leftRegionIndex]).concat({x:x,y:y});
                    regions.splice(upRegionIndex, 1);
                } else if (isUpRegion) {
                    regions[upRegionIndex] = regions[upRegionIndex].concat({x:x,y:y});
                } else if (isLeftRegion) {
                    regions[leftRegionIndex] = regions[leftRegionIndex].concat({x:x,y:y});
                } else {
                    regions.push([{x:x,y:y}]);
                }
            }
        }
    }
    return regions.length;
}

function drawArray(array) {
    for (let y = 0; y < 8; y++) {
        let line = '';
        for (let x = 0; x < 8; x++) {
            if (array[y][x] === 1) {
                line += 'X';
            } else {
                line += '.'
            }
        }
        console.log(line);
    }
}

function drawRegions(regions) {
    let applicableRegions = [];
    for (let y = 0; y < 8; y++) {
        let line = '';
        for (let x = 0; x < 8; x++) {
            const regionIndex = regions.findIndex(r => r.some(p => p.x === x && p.y === y));

            if (regionIndex > -1) {
                let apIndex = applicableRegions.findIndex(ap => ap === regionIndex);
                if (apIndex < 0) {
                    apIndex = applicableRegions.length;
                    applicableRegions.push(regionIndex);
                }
                line += String.fromCharCode(65 + apIndex);
            } else { 
                line += '.';
            }
        }
        console.log(line);
    }
}

function getUsedSquares(input) {
    return getBinaryArray(input)
        .reduce((a, b) => a.concat(b), [])
        .reduce((a, b) => a + b);
}

function getBinaryArray(input) {
    const hashInputs = getHashInputs(input);
    return hashInputs.map(hashInput => knotHash.getHash(hashInput))
        .map(hash => getBinary(hash))
        .map(words => words.reduce((a, b ) => a.concat(b)))
        .map(b => b.split(''))
        .map(b => b.map(bit => +bit));
}

function getBinary(input) {
    return input.split('')
        .map(h => parseInt(h, 16))
        .map(i => i.toString(2))
        .map(b => b.padStart(4, '0'));
}

function getHashInputs(input) {
    let result = [];
    for(let i = 0; i < 128; i++) {
        result.push(`${input}-${i}`);
    }
    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
