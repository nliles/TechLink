import { SET_CURRENT_USER } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      const value = action.user && action.user.length > 0;
      return {
        isAuthenticated: value,
      };
    default:
      return state;
  }
}
