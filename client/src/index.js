import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux'

import './index.css';

import NavBar from './components/NavBar';
import EditJob from './components/EditJob';
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

const Root = () => {
  return (
	<BrowserRouter>
		  <div>
		    <Route path='/' component={App} />
		    <Route path='/jobs/:id/edit' component={EditJob} />
		  </div>
	</BrowserRouter>
  )
}




render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)

