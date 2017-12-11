Array.prototype.reverseLength = function(index, length) {
    let currentIndex = index;
    let items = [];
    for(let i = 0; i < length; i++) {
        items.push({i:i, currentIndex: currentIndex, value: this[currentIndex]});
        currentIndex = (currentIndex + 1) % this.length;
    }
    items.reverse();
    items.forEach(item => {
        this[items[item.i].currentIndex] = item.value;
    });
}

//const inputRaw = `3,4,1,5`;
//const inputRaw = `1,2,4`;
const inputRaw = `192,69,168,160,78,1,166,28,0,83,198,2,254,255,41,12`;

const hash = GetHash2(inputRaw);
console.log(hash);

function GetHash2(inputRaw) {
    const input = getLengths(inputRaw);
    const circularList = generateCircularList(256);
    let index = 0;
    let skipSize = 0;
    for (let i = 0; i < 64; i++) {
        ({ index, skipSize } = reverseLengths(input, circularList, index, skipSize));
    }
    const xord = getXor16Blocks(circularList);
    const hex = getHexValue(xord);
    return hex;    
}

function getHexValue(numArray) {
    return numArray.map(n => n.toString(16))
        .map(h => h.length === 1 ? `0${h}` : h)
        .reduce((a, b) => a + b);
}

function getXor16Blocks(numArray) {
    let result = [];
    let val = 0;
    for(let i = 0; i < numArray.length; i++)  {
        if (i % 16 === 0) {
            if (i !== 0) {
                result.push(val);                
            }
            val = numArray[i];
        } else {
            val = val ^ numArray[i];
        }
    }
    result.push(val);
    return result;
}

function GetHash1(inputRaw) {
    const input = inputRaw.split(',')
        .map(n => +n);
    const circularList = generateCircularList(256);
    let index = 0;
    let skipSize = 0;
    ({ index, skipSize } = reverseLengths(input, circularList, index, skipSize));
    return circularList;
}

function reverseLengths(input, circularList, index, skipSize) {
    input.forEach(length => {
        circularList.reverseLength(index, length);
        index = (index + length + skipSize) % circularList.length;
        skipSize++;
    });
    return { index, skipSize };
}

function getLengths(inputRaw) {
    let result = getAsciiValues(inputRaw);
    result.push(17);
    result.push(31);
    result.push(73);
    result.push(47);
    result.push(23);
    return result;
}

function getAsciiValues(inputRaw) {
    return inputRaw.split('')
        .map(c => c.charCodeAt(0));
}

function generateCircularList(length) {
    let result = [];
    for(let i = 0; i < length; i++) {
        result.push(i);
    }
    return result;
}
