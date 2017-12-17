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

var cache = [];
run();

async function run() {
    const severity = await getSeverity(input);
    console.log(severity);
    const delay = await getDelay(input);
    console.log(`Delay ${delay}`);
}

async function getDelay(rawInput) {
    let delay = 0;
    const input = getInput(rawInput);
    const maxRange = getMaxRange(input);
    let collidedResult = await getHasCollided(input, delay, maxRange);
    while (collidedResult.hasCollided) {
        delay++;
        collidedResult = await getHasCollided(collidedResult.nextStartFrame, delay, maxRange);
    }
    return delay;
}

async function getHasCollided(input, delay, maxRange) {
    let frame = input;
    let packetPos = 0;
    let hasCollided = false;
    const maxDepth = input[input.length-1].depth;
    const numFrames = maxDepth + delay;
    let i = delay;
    let nextStartFrame = null;
    while (i <= numFrames && !hasCollided) {
        const layer = frame.find(l => l.depth === packetPos);                
        if (layer && layer.scannerPos === 0) {
            hasCollided = true;
        }  
        //await drawFrame(frame, maxDepth, maxRange, delay, i, packetPos, hasCollided);
        packetPos++;  
        frame = getNextFrame(frame, i);
        if (!nextStartFrame) {
            nextStartFrame = frame;
        }
        i++;
    }
    return { 
        hasCollided: hasCollided,
        nextStartFrame: nextStartFrame
    };
}

async function getSeverity(rawInput) {
    const input = getInput(rawInput);
    let frame = input;
    let severity = 0;
    let hasCollided = false;
    const maxDepth = input[input.length-1].depth;
    const numFrames = maxDepth;
    const maxRange = getMaxRange(input);
    for (let i = 0; i <= numFrames; i++) {
        const layer = frame.find(l => l.depth === i);                
        if (layer && layer.scannerPos === 0) {
            hasCollided = true;
            severity += layer.depth * layer.range;
        }  
        //await drawFrame(frame, maxDepth, maxRange, delay, i, packetPos, hasCollided);
        frame = getNextFrame(frame, i);    
    }
    return { 
        severity: severity,
        collided: hasCollided
    };
}

function getMaxRange(input) {
    return input
        .map(a => a)
        .sort((a, b) => b.range - a.range)[0].range;
}

async function drawFrame(frame, maxDepth, maxRange, delay, frameNo, packetPos, hasCollided) {    
    console.clear();
    console.log(`Delay ${delay} frame ${frameNo} hasCollided ${hasCollided}`);
    drawHeader(maxDepth);
    for (let i = 0; i < maxRange; i++) {
        let line = '';
        for (let j = 0; j <= maxDepth; j++) {
            const layer = frame.find(l => l.depth === j);
            let txt = `    `;
            const isPacketHere = packetPos === j && i === 0;
            if (layer && i < layer.range) {
                txt = `[ ] `;
                if (layer.scannerPos === i && isPacketHere) {
                    txt = `[X] `;
                } else if (layer.scannerPos === i) {
                    txt = `[S] `;
                } else if (isPacketHere) {
                    txt = `[P] `;
                }
            } else if (i === 0) {
                txt = isPacketHere ? `.P. ` : `... `;
            }
            line += txt;            
        }
        console.log(line);
    }
    await sleep(500);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawHeader(maxDepth) {
    let header = '';
    for (let i = 0; i <= maxDepth; i++) {
        header += ` ${i}  `;
    }
    console.log(header);
}

function getNextFrame(currentFrame, frameNo) {
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
