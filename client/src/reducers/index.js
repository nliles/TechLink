import { combineReducers } from 'redux';

import jobs from './jobs';
import auth from './auth';

export default combineReducers({
  jobs,
  auth,
});
