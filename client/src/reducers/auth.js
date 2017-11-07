import { SET_CURRENT_USER } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      let value;
      Number.isInteger(parseInt(action.user)) ? value = true : value = false;
      console.log(value)
      return {
        isAuthenticated: value,
      };
    default:
      return state;
  }
}
