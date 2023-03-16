import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_SPOTS = 'ALL_SPOTS';
const ONE_SPOT = 'ONE_SPOT';
const CREATE_SPOT = 'CREATE_SPOT';

// ! ACTION CREATORS
export const allSpots = (spots) => {
  return { type: ALL_SPOTS, spots };
}

export const oneSpot = (spotId) => {
  return { type: ONE_SPOT, spotId };
}

export const createSpot = (spot) => {
  return { type: CREATE_SPOT, spot };
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
  const response = await csrfFetch(`/api/spots/${spot}`);
  if (response.ok) {
    const spotData = await response.json();
    const normalize = normalizeOneSpot(spotData);
    dispatch(oneSpot(normalize));
    return normalize;
  }
};

export const createNewSpot = (spot, previewImage, imgArray) => async dispatch => {
  const response = await csrfFetch('/api/spots',
    {
      method: 'POST',
      body: JSON.stringify(spot)
    });

  if (response.ok) {
    const spot = await response.json();
    await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: 'POST',
      body: JSON.stringify(previewImage)
    })
    for (const img of imgArray) {
      if (img.url) {
        await csrfFetch(`/api/spots/${spot.id}/images`, {
          method: 'POST',
          body: JSON.stringify(img)
        });
      };
    };
    return spot;
  };
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
      return { ...state, allSpots: action.spots };
    case ONE_SPOT:
      return {
        ...state,
        singleSpot: {
          ...action.spotId,
          SpotImages: [...action.spotId.SpotImages],
          Owner: { ...action.spotId.Owner }
        }
      }
    default: return state
  }
};

export default spotsReducer;
