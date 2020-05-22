import React, { useContext, useState } from 'react';
import '../Cell.css';
import { CellStoreContext } from '../stores/store';
import { observer } from 'mobx-react';
import { runBFS } from '../libs/algorithms/bfs'
import { runBiSwarm } from '../libs/algorithms/bi-swarm'
import { runDFS } from '../libs/algorithms/dfs'

const Cell =  observer((props) => {
    const cellStore = useContext( CellStoreContext );
    const [classType, setClassType] = useState(cellStore.grid[props.id]);
    const newClassType = cellStore.grid[props.id];

    if (newClassType !== classType) {
        setClassType(newClassType);
    }

    const onMouseDownHandler = () => {
        if (props.id[0] === cellStore.sourceNode[0] && props.id[1] === cellStore.sourceNode[1]) {
            cellStore.selectedNode = 'source';
        } else if (props.id[0] === cellStore.targetNode[0] && props.id[1] === cellStore.targetNode[1]) {
            cellStore.selectedNode = 'target';
        } else {
            cellStore.selectedNode = 'default';
            if (cellStore.grid[props.id] === 'wallCell') {
                cellStore.grid[props.id] = 'defaultCell';
            } else {
                cellStore.grid[props.id] = 'wallCell';
            }

        }

    }

    const onMouseOverHandler = () => {
        if (cellStore.selectedNode && props.id.toString() !== cellStore.targetNode.toString() && props.id.toString() !== cellStore.sourceNode.toString()) {

            if(cellStore.selectedNode === 'source'){
                cellStore.grid[cellStore.sourceNode] = 'defaultCell';
                cellStore.sourceNode = props.id;
                cellStore.grid[cellStore.sourceNode] = 'startCell';
            } else if (cellStore.selectedNode === 'target') {
                cellStore.grid[cellStore.targetNode] = 'defaultCell';
                cellStore.targetNode = props.id;
                cellStore.grid[cellStore.targetNode] = 'targetCell';
            } else if (cellStore.selectedNode === 'default') {
                if (cellStore.grid[props.id] === 'wallCell') {
                    cellStore.grid[props.id] = 'defaultCell';
                } else {
                    cellStore.grid[props.id] = 'wallCell';
                }
                cellStore.grid[props.id] = 'wallCell';
            }
            if(cellStore.visitedNodes){
                if (cellStore.activeAlgorithm === 'BFS'){
                    cellStore.visitedNodes = runBFS(cellStore.networkMap, cellStore.sourceNode, cellStore.targetNode, cellStore.visitedNodes, cellStore.grid, false)
                } else if (cellStore.activeAlgorithm === 'DFS') {
                    cellStore.visitedNodes = runDFS(cellStore.networkMap, cellStore.sourceNode, cellStore.targetNode, cellStore.visitedNodes, cellStore.grid, false)
                } else if (cellStore.activeAlgorithm === 'BiSwarm') {
                    cellStore.visitedNodes = runBiSwarm(cellStore.networkMap, cellStore.sourceNode, cellStore.targetNode, cellStore.visitedNodes, cellStore.visitedTargetNodes, cellStore.grid, false)
                }
            }
            
        }
    }

  return (
    <div draggable='False' className={"defaultCell " + classType} 
        onMouseDown={ () => !cellStore.animationProperties['isAnimationInProgress'] && onMouseDownHandler() } 
        onMouseOver={ () => !cellStore.animationProperties['isAnimationInProgress'] && onMouseOverHandler() }
        onMouseUp={() => cellStore.selectedNode = null}

    />
  );
});

export default Cell;
