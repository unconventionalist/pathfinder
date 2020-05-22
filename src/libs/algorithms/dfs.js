
import { clearBoard } from '../board.js'
import { animate } from '../animate.js'

export function runDFS(networkMap, sourceNode, targetNode, visitedNodes, grid, enableAnimation, animationProperties) {
    let source = sourceNode;
    let target = targetNode;
    
    clearBoard(true, sourceNode, targetNode, visitedNodes, grid);
    
    let stack = [];
    let nodeToParent = {};
    visitedNodes = new Set();
    let nodesToVisit = new Set();
    let timeoutOffset = 0;
    stack.push({
        'parentId': null,
        'nodeId': source
    });
    while(stack.length > 0) {
        let node = stack.pop();
        let nodeId = node['nodeId'];
        let parentId = node['parentId'];
    
        nodeToParent[nodeId] = parentId;
    
        let setHashKey = nodeId[0] + "-" + nodeId[1];
        timeoutOffset+=15;
        
        visitedNodes.add(setHashKey);
        if (!enableAnimation){
            if(nodeId !== source && !(nodeId[0] === target[0] && nodeId[1] === target[1])){
                grid[nodeId] = "discoveredCellNoAnimate";
            } else if (nodeId[0] === target[0] && nodeId[1] === target[1]) {
            }
        } else {
            animate(timeoutOffset, nodeId, source, target, nodeToParent, grid, animationProperties);
        }
        
        if (nodeId[0] === target[0] && nodeId[1] === target[1]) {
            if (!enableAnimation) {
                while (nodeId != null){
                    let parentId = nodeToParent[nodeId];
                    if (parentId && parentId.toString() !== source.toString()) {
                        grid[parentId] = "shortestPathNoAnimate";
                    }
                    nodeId = parentId;
                }
    
            }
    
            break;
        } else {
            for (let i=0; i < networkMap[nodeId].length; i++) {
                let neighbor = networkMap[nodeId][i];
                setHashKey = neighbor[0] + "-" + neighbor[1];
                if (!visitedNodes.has(setHashKey) && !nodesToVisit.has(setHashKey) && grid[neighbor] !== 'wallCell') {
                    stack.push({
                        'parentId': nodeId,
                        'nodeId': neighbor
                    });
            
                }
            }
        }
    }
    return visitedNodes;
}

