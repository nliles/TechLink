import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux'

import './index.css';

import EditJobForm from './components/EditJobForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import App from './App';

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
	 <BrowserRouter>
		  <div>
		    <Route path='/' component={App}/>
		    <Route exact path='/jobs/:id/edit' component={EditJobForm}/>
		    <Route exact path='/login' component={LoginForm}/>
		    <Route exact path='/users/new' component={RegisterForm}/>
		  </div>
	</BrowserRouter>
  </Provider>,
  document.getElementById('main')
)

 