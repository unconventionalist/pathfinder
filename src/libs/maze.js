
export function generateMaze(row, col, sourceNode, targetNode, animationQueue, grid, animationProperties) {
    animationProperties['isAnimationInProgress'] = true;
    addOuterWalls(row, col, sourceNode, targetNode, animationQueue);
    addInnerWalls(true, 1, col - 2, 1, row - 2, sourceNode, targetNode, animationQueue);
    animateMaze(animationQueue, grid, animationProperties);
}

function animateMaze(animationQueue, grid, animationProperties) {
    let shortestPathTimeoutOffset = 0;

    while (animationQueue.length > 0){
        let node = animationQueue.shift();
        shortestPathTimeoutOffset+=10;
        setTimeout(() => {  
            grid[node['nodeId']] = node['value'];
        }, shortestPathTimeoutOffset);
    }
    setTimeout(() => {  
        animationProperties['isAnimationInProgress'] = false;
    }, shortestPathTimeoutOffset);
}

function addOuterWalls(row, col, sourceNode, targetNode, animationQueue) {
    for (let i = 0; i < row; i++) {
        if (i === 0 || i === (row - 1)) {
            for (let j = 0; j < col; j++) {
                if ([i,j].toString() !== sourceNode.toString() && [i,j].toString() !== targetNode.toString()) {
                    animationQueue.push({
                        'nodeId': [i,j],
                        'value': 'wallCell'
                    });
                }
            }
        } else if ([i, 0].toString() !== sourceNode.toString() && [i, 0].toString() !== targetNode.toString() && [i, col - 1].toString() !== sourceNode.toString() && [i, col - 1].toString() !== targetNode.toString()) {
            animationQueue.push({
                'nodeId': [i,0],
                'value': 'wallCell'
            });
            animationQueue.push({
                'nodeId': [i, col - 1],
                'value': 'wallCell'
            });
        }
    }
}

function addInnerWalls(h, minX, maxX, minY, maxY, sourceNode, targetNode, animationQueue) {
    if (h) {

        if (maxX - minX < 2) {
            return;
        }

        let y = Math.floor(randomNumber(minY, maxY)/2)*2;
        addHWall(minX, maxX, y, sourceNode, targetNode, animationQueue);
        addInnerWalls(!h, minX, maxX, minY, y-1, sourceNode, targetNode, animationQueue);
        addInnerWalls(!h, minX, maxX, y + 1, maxY, sourceNode, targetNode, animationQueue);
    } else {
        if (maxY - minY < 2) {
            return;
        }

        let x = Math.floor(randomNumber(minX, maxX)/2)*2;
        addVWall(minY, maxY, x, sourceNode, targetNode, animationQueue);
        addInnerWalls(!h, minX, x-1, minY, maxY, sourceNode, targetNode, animationQueue);
        addInnerWalls(!h, x + 1, maxX, minY, maxY, sourceNode, targetNode, animationQueue);
    }
}
function addHWall(minX, maxX, y, sourceNode, targetNode, animationQueue) {
    let hole = Math.floor(randomNumber(minX, maxX)/2)*2+1;
    for (let i = minX; i <= maxX; i++) {
        if ([y, i].toString() !== sourceNode.toString() && [y, i].toString() !== targetNode.toString()) {
            if (i === hole) {
                animationQueue.push({
                    'nodeId': [y,i],
                    'value': 'defaultCell'
                });
            }
            else {
                animationQueue.push({
                    'nodeId': [y,i],
                    'value': 'wallCell'
                });
            }
        }
    }
}

function addVWall(minY, maxY, x, sourceNode, targetNode, animationQueue) {
    var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1;
    for (let i = minY; i <= maxY; i++) {
        if ([i, x].toString() !== sourceNode.toString() && [i, x].toString() !== targetNode.toString()) {
            if (i === hole) {
                animationQueue.push({
                    'nodeId': [i,x],
                    'value': 'defaultCell'
                });
            }
            else {
                animationQueue.push({
                    'nodeId': [i,x],
                    'value': 'wallCell'
                });
            }
        } 
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}