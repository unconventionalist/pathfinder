import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Graph from './components/Graph';
import Header from './components/Header';
import * as serviceWorker from './serviceWorker';
import './App.scss';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <br/>
    <Graph row={Math.floor(window.innerHeight/30)} col={Math.floor(window.innerWidth/25)}/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
