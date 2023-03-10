import { csrfFetch } from "./csrf";

// ! CONSTANTS
const SET_USER = 'set/user';
const REMOVE_USER = 'remove/user';

// ! ACTION CREATORS
export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

export const removeUser = (user) => {
  return {
    type: REMOVE_USER
  };
};

// ! THUNK ACs'
export const loginUser = (user) => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      credential,
      password
    })
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return data;
};

const initialState = { user: null };

// ! REDUCER
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      // TODO:
      return {};
    default:
      return state;
  }
};

export default sessionReducer;
