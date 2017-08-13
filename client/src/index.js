import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux'
import './index.css';
import NavBar from './components/NavBar';
import App from './App';

render(<NavBar/>, document.querySelector('#nav'));


//Add dev tools
const initDevTools = () => (
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

const preloadedState = {}
const store = createStore(
  reducers,
  preloadedState, initDevTools()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)

