run();

function run() {
    const buffer = getCircularBuffer(349, 2017);
    const index2017 = buffer.findIndex(b => b === 2017);
    const nextIndex2017 = (index2017 + 1) % buffer.length;
    console.log(`Part 1 : ${buffer[nextIndex2017]}`);

    const numAfter0 = getNumberAfter0(349, 50000000);
    console.log(`Part 2 : ${numAfter0}`);
}

function getNumberAfter0(skips, iterations) {
    let index = 1;
    let currentIncrement = 1;
    let numbersBefore0 = 0;
    let numbersAfter0 = 0;
    let index0 = 0;
    let numberAfter0 = 1;
    let length = 1;
    for (let i = 0; i < iterations; i++) {
        if (index <= index0) {
            index0++;
            numbersBefore0++;
        } else if (index > index0) {
            numbersAfter0++;
            if (index === index0 + 1) {
                numberAfter0 = currentIncrement;
            }
        }
        length++;
        index = ((index + skips) % length) + 1;
        currentIncrement++;
    }
    return numberAfter0;
}

function getCircularBuffer(skips, iterations) {
    let buffer = [0];
    let index = 1;
    let currentIncrement = 1;
    for (let i = 0; i < iterations; i++) {
        buffer = buffer.slice(0, index).concat(currentIncrement).concat(buffer.slice(index));
        index = ((index + skips) % buffer.length) + 1;
        currentIncrement++;
    }
    return buffer;
}