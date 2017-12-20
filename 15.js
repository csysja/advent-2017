const generatorA = generator(16807, 4);
const generatorB = generator(48271, 8);

console.log(getFinalCount(277, 349));

function getFinalCount(a, b) {
    let aPrevNumber = a;
    let bPrevNumber = b;
    let count = 0;
    for(let i = 0; i < 5000000; i++) {
        aPrevNumber = generatorA(aPrevNumber);
        bPrevNumber = generatorB(bPrevNumber);
        const a16bit = getBinaryLowest16Bits(aPrevNumber);
        const b16bit = getBinaryLowest16Bits(bPrevNumber);
        if (a16bit === b16bit) {
            count++;
        }
    }
    return count;
}

function generator(factor, multiple) {
    return (prevNumber) => {
        let pNumber = prevNumber;
        do {
            pNumber = ((factor * pNumber) % 2147483647);
        } while (pNumber % multiple !== 0);
        return pNumber;
    }
}

function getBinaryLowest16Bits(number) {
    const binary = number.toString(2);
    return binary.substr(binary.length - 16);
}
