import { SET_JOBS, ADD_JOB, REMOVE_JOB, EDIT_JOB } from '../actions/jobActions'

const initialState = {
  jobs: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_JOBS:
      return { 
        jobs: action.jobs 
      };
    case ADD_JOB:
      return {
        jobs: state.jobs.concat(action.job)
      }
    case REMOVE_JOB:
     let removeJobArray = state.jobs.slice();
     removeJobArray.splice(action.i, 1)
     return {
      jobs: removeJobArray
     }
    case EDIT_JOB:
      let editJobArray = state.jobs.slice(0);
      let find = editJobArray.find(job => job.id === action.job.id)
      editJobArray[editJobArray.indexOf(find)] = action.job;
     return {
      jobs: find
     }
    default:
      return state
  }
}

