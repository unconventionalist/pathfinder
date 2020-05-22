import { observable, decorate } from 'mobx';
import { createContext } from 'react';
import { runBFS } from '../libs/algorithms/bfs'
import { runDFS } from '../libs/algorithms/dfs'
import { runBiSwarm } from '../libs/algorithms/bi-swarm'
import { clearBoard } from '../libs/board';

class CellStore {
    classType = 'defaultCell';
    grid = {};
    networkMap = {};
    sourceNode = null;
    targetNode = null;
    selectedNode = null;
    visitedNodes = null;
    visitedTargetNodes = null;
    animationQueue = [];
    animationProperties = {
        'isAnimationInProgress': false
    }
    row = null
    col = null
    activeAlgorithm = null;
    getGrid = () => {
        return this.grid;
    };
    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    clearBoard = (keepWalls) => {
        clearBoard(keepWalls, this.sourceNode, this.targetNode, this.visitedNodes, this.grid);
        this.visitedNodes = null;
    }
    runVisualizer = (enableAnimation=true) => {
        switch(this.activeAlgorithm) {
            case 'DFS':
                this.animationProperties['isAnimationInProgress'] = true;
                this.visitedNodes = runDFS(this.networkMap, this.sourceNode, this.targetNode, this.visitedNodes, this.grid, enableAnimation, this.animationProperties);
                break;
            case 'BFS':
                this.animationProperties['isAnimationInProgress'] = true;
                this.visitedNodes = runBFS(this.networkMap, this.sourceNode, this.targetNode, this.visitedNodes, this.grid, enableAnimation, this.animationProperties);
                break;
            case 'BiSwarm':
                this.animationProperties['isAnimationInProgress'] = true;
                this.visitedNodes = runBiSwarm(this.networkMap, this.sourceNode, this.targetNode, this.visitedNodes, this.visitedTargetNodes, this.grid, enableAnimation, this.animationProperties);
                break;
            default:
                return;
        }
    }
}

decorate( CellStore, {
    grid: observable,
    visitedNodes: observable
});

export const CellStoreContext = createContext( new CellStore());
