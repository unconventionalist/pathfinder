export function animate(timeoutOffset, nodeId, source, target, nodeToParent, grid, animationProperties) {
        
    setTimeout(() => {
        if(nodeId !== source && !(nodeId[0] === target[0] && nodeId[1] === target[1])){
            grid[nodeId] = "discoveredCell";
        } else if (nodeId[0] === target[0] && nodeId[1] === target[1]) {
            let shortestPathTimeoutOffset = 0;
            let shortestPath = [];
            shortestPath.push(nodeId);
            while (nodeId != null){
                let parentId = nodeToParent[nodeId];
                if (parentId) {
                    shortestPath.push(parentId);
                }
                nodeId = parentId;
            }
            
            while (shortestPath.length > 0){
                shortestPathTimeoutOffset+=35;
                let nodeId = []
                nodeId = shortestPath.pop();
                let nodeClass = "";
                if (nodeId.toString() === source.toString() || nodeId.toString() === target.toString()) {
                    nodeClass = "shortestPath " + grid[nodeId].replace('discoveredCell','');
                } else {
                    nodeClass = "shortestPath";
                }
                setTimeout(() => {  
                    grid[nodeId] = nodeClass;
                }, shortestPathTimeoutOffset);
            }

            setTimeout(() => {  
                animationProperties['isAnimationInProgress'] = false;
            }, shortestPathTimeoutOffset);
        } else {
            grid[nodeId] += " discoveredCell";
        }
    }, timeoutOffset);
}