export const ADD_JOB = 'techlink/jobs/ADD_JOB'
export const ADD_FORM_JOB = 'techlink/jobs/ADD_FORM_JOB'
export const REMOVE_JOB = 'techlink/jobs/REMOVE_JOB'

export const addJob = job => ({
  type: ADD_JOB,
  job
})

export const addFormJob = job => ({
  type: ADD_FORM_JOB,
  job
})

export const removeJob = id => ({
  type: REMOVE_JOB,
  id
})

const initialState = {
  jobs: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_JOB:
      return {
        jobs: state.jobs.concat(action.job)
      }
    case ADD_FORM_JOB:
      return {
        jobs: state.jobs.unshift(action.job)
      }
    case REMOVE_JOB:
      return {
        jobs: state.jobs.filter(id => action.id !== id)
      }
    default:
      return state
  }
}

