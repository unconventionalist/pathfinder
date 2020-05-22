import React, { useContext } from 'react';
import Cell from './Cell';
import { CellStoreContext } from '../stores/store';

function Graph(props) {

    const cellStore = useContext( CellStoreContext );

    const createNetworkMap = (row, col) => {
        const network = {};
        for(let i=0; i < row; i++){
            for(let j=0; j < col; j++) {
                let key = [i, j];

                network[key] = [];
                if (j + 1 < col) {
                    network[key].push([i, j + 1]);
                }
                
                if (i + 1 < row) {
                    network[key].push([i + 1, j]);
                }

                if (j - 1 >= 0) {
                    network[key].push([i, j - 1]);
                }

                if (i - 1 >= 0) {
                    network[key].push([i - 1, j]);
                }
            }
        }
        return network;
    }

    cellStore.networkMap = createNetworkMap(props.row, props.col);

    const createGrid = (row, col) => {
        cellStore.row = row;
        cellStore.col = col;
        let rowsInGrid = [];
        let map = {};
        for(let i=0; i < row; i++) {
            let cellsInRow = [];
            for(let j=0; j < col; j++) {
                let cellId = [i, j];
                cellsInRow.push(
                    <td key={cellId} className="cell">
                        <Cell id={cellId} />
                    </td>
                );
                map[cellId] = 'defaultCell';
            }

            rowsInGrid.push(
                <tr key={i}>
                    {cellsInRow}
                </tr>
            )
            
        }

        cellStore.grid = map;

        cellStore.sourceNode = [Math.floor(row/2) - 1, Math.floor(col/4) - 1];
        cellStore.grid[cellStore.sourceNode] = 'startCell';

        cellStore.targetNode = [Math.floor(row/2) - 1, Math.floor((3 * col)/4) + 1];
        cellStore.grid[cellStore.targetNode] = 'targetCell';

        return rowsInGrid;
    }



  return (
    <div className="App">
        <table className="grid" cellSpacing="0" align="center" 
        onMouseLeave={() => cellStore.selectedNode = null}
        onMouseUp={() => cellStore.selectedNode = null}
        >
            <tbody>
                {createGrid(props.row, props.col)}
            </tbody>
        </table>
    </div>
  );
}

export default Graph;
