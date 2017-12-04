const directions = { 
    right: 0, 
    up: 1, 
    left: 2, 
    down: 3 
};
/*Solution 1*/
const input = 347991;
/*const array = generateArray(input);
const origin = getLocation(array, 1);
const final = getLocation(array, input);
const output = Math.abs(origin.x - final.x) + Math.abs(origin.y - final.y);
console.log(output);*/

/*Solution 2*/
const output = getFirstValLarger(input);
console.log(output);

function getLocation(array, num) {
    let result = null;
    let y = 0;
    while(y < array.length && result === null) {
        let x = 0;
        while(x < array[y].length && result === null) {
            if (array[y][x] === num) {
                result = {
                    x: x,
                    y: y
                };
            }
            x++;
        }
        y++;
    }
    return result;
}

function getFirstValLarger(num) {
    const arraySize = Math.floor(Math.sqrt(input)) + 1;
    const array = initArray(arraySize);
    let x = Math.floor(arraySize / 2);
    let y = x;
    let currentDirection = directions.right;
    let numToMoveInDirection = 0;
    let totalToMoveInDirection = 0;
    let val = 1;
    array[y][x] = val;
    x++;
    while(val <= num) {                         
        val = getSumOfSurroundings(array, x, y);
        array[y][x] = val;
        if (numToMoveInDirection !== 0) {
            numToMoveInDirection--;
        } else  {
            currentDirection = getNextDirection(currentDirection);
            totalToMoveInDirection += currentDirection % 2 === 0;
            numToMoveInDirection = totalToMoveInDirection;
        }
        x += currentDirection === directions.right;
        x -= currentDirection === directions.left;
        y += currentDirection === directions.down;
        y -= currentDirection === directions.up;        
    }
    
    return val;
}

function getSumOfSurroundings(array, x, y) {
    return  getVal(array[y-1][x+1]) +
        getVal(array[y][x+1]) + 
        getVal(array[y+1][x+1]) +
        getVal(array[y-1][x-1]) +
        getVal(array[y][x-1]) + 
        getVal(array[y+1][x-1]) +
        getVal(array[y-1][x]) + 
        getVal(array[y+1][x]);
}

function getVal(val) {
    return val === undefined ? 0 : val;
}

function generateArray(num) {
    const arraySize = Math.floor(Math.sqrt(input)) + 1;
    const array = initArray(arraySize);
    let x = Math.floor(arraySize / 2);
    let y = x;
    let currentDirection = directions.right;
    let numToMoveInDirection = 0;
    let totalToMoveInDirection = 0;
    array[y][x] = 1;
    x++;
    for(let i = 2; i <= num; i++) {                 
        array[y][x] = i;
        if (numToMoveInDirection !== 0) {
            numToMoveInDirection--;
        } else  {
            currentDirection = getNextDirection(currentDirection);
            totalToMoveInDirection += currentDirection % 2 === 0;
            numToMoveInDirection = totalToMoveInDirection;
        }
        x += currentDirection === directions.right;
        x -= currentDirection === directions.left;
        y += currentDirection === directions.down;
        y -= currentDirection === directions.up;        
    }
    
    return array;
}

function getNextDirection(currentDirection) {
    let direction = currentDirection + 1;
    if (direction > 3) {
        direction = 0;
    }
    return direction;
}

function initArray(number) {
    let x = new Array(number);
    for (let i = 0; i < number; i++) {
      x[i] = new Array(number);
    }
    return x;
}