import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import App2 from './App';
import Home from './js/home.js';
import './css/index.css';
import {
  HashRouter
} from 'react-router-dom'


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
