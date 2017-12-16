const input = `0: 3
1: 2
2: 4
4: 4
6: 5
8: 6
10: 8
12: 8
14: 6
16: 6
18: 8
20: 8
22: 6
24: 12
26: 9
28: 12
30: 8
32: 14
34: 12
36: 8
38: 14
40: 12
42: 12
44: 12
46: 14
48: 12
50: 14
52: 12
54: 10
56: 14
58: 12
60: 14
62: 14
66: 10
68: 14
74: 14
76: 12
78: 14
80: 20
86: 18
92: 14
94: 20
96: 18
98: 17`;

/*const input = `0: 3
1: 2
4: 4
6: 4`;*/

const severity = getSeverity(input);
console.log(severity);
const delay = getDelay(input);
console.log(`Delay ${delay}`);

function getDelay(rawInput) {
    let delay = 0;
    while (getSeverity(rawInput, delay).collided) {
        delay++;
        /*console.clear();
        console.log(delay);*/
    }
    return delay;
}

function getSeverity(rawInput, delay = 0) {
    const input = getInput(rawInput);
    let frame = input;
    let severity = 0;
    let packetPos = 0;
    let hasCollided = false;
    for (let i = 0; i <= input[input.length-1].depth + delay; i++) {
        if (i >= delay) {
            const layer = frame.find(l => l.depth === packetPos);                
            if (layer && layer.scannerPos === 0) {
                hasCollided = true;
                severity += layer.depth * layer.range;
            }
            packetPos++;      
        }
        frame = getNextFrame(frame);    
    }
    return { 
        severity: severity,
        collided: hasCollided
    };
}

function getNextFrame(currentFrame) {
    return currentFrame.map(l => ({
        depth: l.depth,
        range: l.range,
        scannerPos: l.down ? l.scannerPos + 1 : l.scannerPos - 1,
        down : (l.scannerPos === l.range - 2) && l.down ? false : (l.scannerPos === 1) && !l.down ? true : l.down
    }));
}

function getInput(rawInput) {
    return rawInput.split('\n')
        .map(i => i.split(':'))
        .map(l => ({
            depth: +l[0],
            range: +l[1],
            scannerPos: 0,
            down: true
        }));
}
