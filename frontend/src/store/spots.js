import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_SPOTS = 'ALL_SPOTS';
const ONE_SPOT = 'ONE_SPOT';

// ! ACTION CREATORS
export const allSpots = (spots) => {
  return { type: ALL_SPOTS, spots };
}

export const oneSpot = (spotId) => {
  return { type: ONE_SPOT, spotId };
}

// ! NORMALIZE DATA
const normalizeAllSpots = (data) => {
  let normalize = {};
  data.forEach(spot => {
    normalize[spot.id] = spot;
  })
  return normalize;
};

const normalizeOneSpot = (data) => {
  let normalize = { ...data };
  normalize.SpotImages = [...data.SpotImages]
  normalize.Owner = { ...data.Owner }
  return normalize;
};

// ! THUNK ACs'
export const getAllSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const spots = await response.json();
    const normalized = normalizeAllSpots(spots.Spots);
    dispatch(allSpots(normalized));
    return normalized;
  };
};

export const getOneSpot = (spot) => async dispatch => {
  const response = await csrfFetch(`/api/spots/2`);
  if (response.ok) {
    const spotData = await response.json();
    // TODO:
    const normalize = normalizeOneSpot(spotData);
    dispatch(oneSpot(normalize));
    return normalize;
  }
};


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
      return { ...state, allSpots: action.spots };
    case ONE_SPOT:
      console.log(action.spotId);
      return { ...state, singleSpot: { ...action.spotId,
        SpotImages: [ ...action.spotId.SpotImages ],
        Owner: { ...action.spotId.Owner }}}
    default: return state
  }
};

export default spotsReducer;
