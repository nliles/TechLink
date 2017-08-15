export const ADD_JOB = 'techlink/jobs/ADD_JOB'
export const REMOVE_JOB = 'techlink/jobs/REMOVE_JOB'

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



const initialState = {
  jobs: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_JOB:
      let newArray2 = state.jobs.concat(action.job)
      console.log(newArray2)
      return {
        jobs: newArray2
      }
    case REMOVE_JOB:
     let newArray = state.jobs.slice();
     newArray.splice(action.i, 1)
     return {
      jobs: newArray
     }
    default:
      return state
  }
}

