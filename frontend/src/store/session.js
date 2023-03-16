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

export const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

// ! THUNK ACs'
export const login = (user) => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return data;
};

export const logout = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });

  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async dispatch => {
  const {
    username, firstName,
    lastName, email, password
  } = user;

  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, firstName, lastName, email, password })
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return data;
}


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
      return { user: null };
    default:
      return { ...state };
  }
};

export default sessionReducer;
