import { clearBoard } from '../board.js'
import { animate } from '../animate.js'

export function runBiSwarm(networkMap, sourceNodeId, targetNodeId, sourceVisitedNodes, targetVisitedNodes, grid, enableAnimation, animationProperties){
    clearBoard(true, sourceNodeId, targetNodeId, sourceVisitedNodes, grid);

    let sourceQueue = [];
    let targetQueue = [];
    let sourceNodeToParent = {};
    let targetNodeToParent = {};
    sourceVisitedNodes = new Set();
    targetVisitedNodes = new Set();
    let sourceNodesToVisit = new Set();
    let targetNodesToVisit = new Set();
    let timeoutOffset = 0;
    sourceQueue.push({
        'parentId': null,
        'nodeId': sourceNodeId
    });
    targetQueue.push({
        'parentId': null,
        'nodeId': targetNodeId
    });
    
    while(sourceQueue.length > 0 && targetQueue.length > 0 ) {
        timeoutOffset+=15;

        if (sourceQueue.length > 0) {
            sourceQueue = searchForTarget(sourceQueue, sourceNodeToParent, sourceVisitedNodes, sourceNodesToVisit, targetNodeToParent, targetVisitedNodes, enableAnimation, sourceNodeId, targetNodeId, grid, timeoutOffset, networkMap, animationProperties)
        }
        if (targetQueue.length > 0) {
            targetQueue = searchForTarget(targetQueue, targetNodeToParent, targetVisitedNodes, targetNodesToVisit, sourceNodeToParent, sourceVisitedNodes, enableAnimation, targetNodeId, sourceNodeId, grid, timeoutOffset, networkMap, animationProperties)
        }
    }
    return sourceVisitedNodes;
}

function searchForTarget(sourceQueue, sourceNodeToParent, sourceVisitedNodes, sourceNodesToVisit, targetNodeToParent, targetVisitedNodes, enableAnimation, sourceNodeId, targetNodeId, grid, timeoutOffset, networkMap, animationProperties) {
    let [nodeId, parentId] = dequeueNode(sourceQueue);
    sourceNodeToParent[nodeId] = parentId;

    let sourceSetHashKey = getNodeSetHashKey(nodeId);
    sourceVisitedNodes.add(sourceSetHashKey);


    if (!enableAnimation){
        if(nodeId !== sourceNodeId && !targetVisitedNodes.has(sourceSetHashKey)){
            grid[nodeId] = "discoveredCellNoAnimate";
        }
    } else {
        animate(timeoutOffset, nodeId, sourceNodeId, targetNodeId, sourceNodeToParent, grid, animationProperties);
    }
    
    if (targetVisitedNodes.has(sourceSetHashKey)) {
        let destinationNode = nodeId;
        if (!enableAnimation) {
            while (nodeId != null){
                grid[nodeId] = "shortestPathNoAnimate " + grid[nodeId].replace('discoveredCell','').replace('defaultCell','');
                let sourceParentId = sourceNodeToParent[nodeId];
                if (sourceParentId) {
                    grid[sourceParentId] = "shortestPathNoAnimate " + grid[sourceParentId].replace('discoveredCell','');
                }
                nodeId = sourceParentId;
            }
            grid[destinationNode] = "shortestPathNoAnimate";
            while (destinationNode != null){
                grid[destinationNode] = "shortestPathNoAnimate " + grid[destinationNode].replace('discoveredCell','').replace('defaultCell','');
                let sourceParentId = targetNodeToParent[destinationNode];
                if (sourceParentId && sourceParentId.toString() !== targetNodeId.toString()) {
                    grid[sourceParentId] = "shortestPathNoAnimate " + grid[sourceParentId].replace('discoveredCell','');
                }
                destinationNode = sourceParentId;
            }
        } else {
            animate(timeoutOffset, nodeId, sourceNodeId, nodeId, sourceNodeToParent, grid, animationProperties);
            animate(timeoutOffset, nodeId, targetNodeId, nodeId, targetNodeToParent, grid, animationProperties);
        }
        sourceQueue = [];
        return [];
        
    } else {
        for (let i=0; i < networkMap[nodeId].length; i++) {
            let sourceNeighbor = networkMap[nodeId][i];
            sourceSetHashKey = getNodeSetHashKey(sourceNeighbor);
            if (isNodeUndiscovered(sourceNeighbor, sourceSetHashKey, sourceVisitedNodes, sourceNodesToVisit, targetVisitedNodes, grid)) {
                sourceNodesToVisit.add(sourceSetHashKey);
                sourceQueue.push({
                    'parentId': nodeId,
                    'nodeId': sourceNeighbor
                });
            }
        }
    }
    return sourceQueue;
}

function getNodeSetHashKey(nodeId){
    return nodeId[0] + "-" + nodeId[1];
}

function isNodeUndiscovered(node, nodeSetHashKey, sourceVisitedNodes, sourceNodesToVisit, targetVisitedNodes, grid){
    return !sourceVisitedNodes.has(nodeSetHashKey) && !sourceNodesToVisit.has(nodeSetHashKey) && grid[node] !== 'wallCell' && !targetVisitedNodes.has(nodeSetHashKey)
}

function dequeueNode(queue) {
    let node = queue.shift();
    let nodeId = node['nodeId'];
    let parentId = node['parentId'];
    return [nodeId, parentId];
}
