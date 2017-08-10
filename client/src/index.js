import React from 'react';
import { render } from 'react-dom';
import './index.css';
import NavBar from './components/NavBar';
import App from './App';

render(<NavBar/>, document.querySelector('#nav'));
render(<App/>, document.querySelector('#main'));
