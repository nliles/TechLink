import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';


/*
  Store
  Redux apps have a single store made up of:
  1. Reducers
  2. Optional starting state
*/

const store = createStore(rootReducer, defaultState);

// export history to feed into <Router>
export const history = syncHistoryWithStore(browserHistory, store);


export default store;
