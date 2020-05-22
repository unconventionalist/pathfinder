import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CellStoreContext } from '../stores/store';
import { generateMaze } from '../libs/maze'

const Header = () => {
    const cellStore = useContext( CellStoreContext );
    const defaultTitle = "Select Algorithm"
    const [title, setTitle] = useState(defaultTitle);
    const [visualizeTitle, setVisualizeTitle] = useState("Pick an Algorithm!");
  return (
    <header>
        <div className="header">
            <Navbar bg="dark-navy" expand="lg">
                <Navbar.Brand style={{margin: '0 3vh'}} className="navbar-text">Pathfinder Algorithm Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-text"/>
                <Navbar.Collapse id="basic-navbar-nav" className="navbar-text">
                <Nav className="mr-auto" style={{margin: '0 2vh'}}>
                    <NavDropdown title={title} id="basic-nav-dropdown">
                        <NavDropdown.Item className="navbar-text" onClick={ () => {
                                cellStore.activeAlgorithm='BFS';
                                setTitle("Breadth-first Search (BFS)");
                                setVisualizeTitle("Visualize Breadth-first Search (BFS)");
                            } } >Breadth-first Search (BFS)
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-text" onClick={ () => {
                                cellStore.activeAlgorithm='DFS';
                                setTitle("Depth-first Search (DFS)");
                                setVisualizeTitle("Visualize Depth-first Search (DFS)");
                            } } >Depth-first Search (DFS)
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-text" onClick={ () => {
                                cellStore.activeAlgorithm='BiSwarm';
                                setTitle("BiSwarm Search Algorithm");
                                setVisualizeTitle("Visualize BiSwarm Search Algorithm");
                            } } >BiSwarm Search Algorithm
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link style={{margin: '0 2vh'}} className="navbar-text" onClick={ () => !cellStore.animationProperties["isAnimationInProgress"] && cellStore.clearBoard(false) } >Clear Board</Nav.Link>
                    <Nav.Link style={{margin: '0 2vh'}} className="navbar-text" onClick={ () => {
                            if (cellStore.animationProperties["isAnimationInProgress"]) return;
                            cellStore.clearBoard(false); 
                            generateMaze(cellStore.row, cellStore.col, cellStore.sourceNode, cellStore.targetNode, cellStore.animationQueue, cellStore.grid, cellStore.animationProperties);
                        } } >Create Maze</Nav.Link>
                    <Nav.Link style={{margin: '0 2vh'}} className="navbar-text-red" onClick={ () => !cellStore.animationProperties["isAnimationInProgress"] && cellStore.runVisualizer() } >{visualizeTitle}</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    </header>
  );
};

export default Header;
