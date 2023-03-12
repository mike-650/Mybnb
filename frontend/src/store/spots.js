import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_SPOTS = 'ALL_SPOTS';
const ONE_SPOT = 'ONE_SPOT';

// ! ACTION CREATORS
export const allSpots = () => {
  return { type: ALL_SPOTS };
}

export const oneSpot = (spotId) => {
  return { type: ONE_SPOT, spotId };
}

// ! NORMALIZE DATA
const normalizeAllSpots = (data) => {
  console.log({data})
  return data.reduce((acc, spot) => {
    acc[spot.id] = spot;
    return acc;
  })
};

// ! THUNK ACs'
export const getAllSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots')

  if (response.ok) {
    const spots = await response.json();
    console.log('BEFORE :  ',spots);
    const normalized = normalizeAllSpots(spots.Spots);
    console.log({normalized})
    // TODO:
    // dispatch(allSpots(normalized));
    return normalized;
  }
}


// ! INITIAL SLICE STATE
const initialState = {
  allSpots: {},
  singleSpot: {}
};

// ! REDUCER

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SPOTS:
      // ? NEED TO TEST
      return { ...state, allSpots: action.normalized}
    default: return state
  }
};

export default spotsReducer;
