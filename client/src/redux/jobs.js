export const ADD_JOB = 'techlink/jobs/ADD_JOB'
export const REMOVE_JOB = 'techlink/jobs/REMOVE_JOB'

export const addJob = job => ({
  type: ADD_JOB,
  job
})

export function removeJob(id, i){
  return {
    type: 'REMOVE_JOB',
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
      return {
        jobs: state.jobs.concat(action.job)
      }

    case REMOVE_JOB:
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ];
    default:
      return state
  }
}

