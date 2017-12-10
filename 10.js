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
const inputRaw = `192,69,168,160,78,1,166,28,0,83,198,2,254,255,41,12`;

const hash = GetHash(inputRaw);
console.log(hash[0] * hash[1]);

function GetHash(inputRaw) {
    const input = inputRaw.split(',')
        .map(n => +n);
    const circularList = generateCircularList(256);
    let index = 0;
    let skipSize = 0;
    input.forEach(length => {
        circularList.reverseLength(index, length);
        index = (index + length + skipSize) % circularList.length;
        skipSize++;
    });
    return circularList;
}

function generateCircularList(length) {
    let result = [];
    for(let i = 0; i < length; i++) {
        result.push(i);
    }
    return result;
}
