export function clearBoard(keepWalls, sourceNode, targetNode, visitedNodes, grid) {
    let source = sourceNode;
    let target = targetNode;
    Object.keys(grid).forEach((node) => {
        if (node.toString() === source.toString()){
            grid[node] = 'startCell';
        } else if (node.toString() === target.toString()) {
            grid[node] = 'targetCell';
        } else if(node.toString() !== source.toString() && node.toString() !== target.toString()) {
            if(!keepWalls) {
                grid[node] = 'defaultCell';
            } else if (grid[node] !== 'wallCell') {
                grid[node] = 'defaultCell';
            }
        } 
    })
}