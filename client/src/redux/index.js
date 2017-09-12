import { combineReducers } from 'redux'

import jobs from './jobs'
import auth from './auth'

//combine reducers here
export default combineReducers({
  jobs,
  auth
})
