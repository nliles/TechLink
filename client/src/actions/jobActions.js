export const ADD_JOB = 'techlink/jobs/ADD_JOB';
export const REMOVE_JOB = 'techlink/jobs/REMOVE_JOB';
export const EDIT_JOB = 'techlink/jobs/EDIT_JOB';
export const SET_JOBS = 'techlink/SET_JOBS';

export const setJobs = jobs => ({
  type: SET_JOBS,
  jobs,
});

// Action Creators
export const addJob = job => ({
  type: ADD_JOB,
  job,
});

export function removeJob(id, i) {
  return {
    type: REMOVE_JOB,
    id,
    i,
  };
}

export function editJob(job) {
  return {
    type: EDIT_JOB,
    job,
  };
}

