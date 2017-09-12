export const SET_CURRENT_USER = 'techlink/jobs/SET_CURRENT_USER'

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

const initialState = {
  isAuthenticated: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
    const value = action.user && action.user.length > 0;
      return {
        isAuthenticated: value
      }
    default:
      return state
  }
}