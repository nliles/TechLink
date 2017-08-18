import React from 'react';
import { render } from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux'

import './index.css';

import EditJobForm from './components/EditJobForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ShowJob from './components/ShowJob';
import App from './App';
import NavBar from './components/NavBar';



const preloadedState = {}

const store = createStore(
  reducers,
  preloadedState
)

render(
  <Provider store={store}>
	 <HashRouter>
	 <div>
	 <NavBar/>
		  <Switch>
		    <Route exact path='/' component={App}/>
		    <Route exact path='/jobs/:id/edit/:position/:company/:location/:description/:salary' component={EditJobForm}/>
		    <Route exact path='/login' component={LoginForm}/>
		    <Route exact path='/users/new' component={RegisterForm}/>
		    <Route exact path='/jobs/:id/:position/:company/:location/:description/:salary' component={ShowJob}/>
		  </Switch>
		   </div>
	</HashRouter>
  </Provider>,
  document.getElementById('main')
)

export default store;

 