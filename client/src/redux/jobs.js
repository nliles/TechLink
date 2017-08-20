export const ADD_JOB = 'techlink/jobs/ADD_JOB'
export const REMOVE_JOB = 'techlink/jobs/REMOVE_JOB'
export const EDIT_JOB = 'techlink/jobs/EDIT_JOB'


//Action Creators
export const addJob = job => ({
  type: ADD_JOB,
  job
})

export function removeJob(id, i){
  return {
    type: REMOVE_JOB,
    id,
    i
  };
}

export function editJob(job) {
  return {
    type: EDIT_JOB,
    job
  };
}

const initialState = {
  jobs: [],
}

//Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_JOB:
      let addJobArray = state.jobs.slice(0)
      return {
        jobs: addJobArray.concat(action.job)
      }
    case REMOVE_JOB:
     let removeJobArray = state.jobs.slice(0);
     removeJobArray.splice(action.i, 1)
     return {
      jobs: removeJobArray
     }
    case EDIT_JOB:
      let editJobArray = state.jobs.slice(0);
      let find = editJobArray.find(job => job.id === action.job.id)
      editJobArray[editJobArray.indexOf(find)] = action.job;
     return {
      jobs: ''
     }
    default:
      return state
  }
}

