import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_SPOTS = 'ALL_SPOTS';
const ALL_USER_SPOTS = 'ALL_USER_SPOTS';
const ONE_SPOT = 'ONE_SPOT';
const CREATE_SPOT = 'CREATE_SPOT';
const UPDATE_SPOT = 'UPDATE_SPOT';
const DELETE_SPOT = 'DELETE_SPOT';
const RESET_ALL_SPOTS = 'RESET_ALL_SPOTS';
const RESET_SPOT = 'RESET_SPOT';

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

export const userSpots = (data) => {
  return { type: ALL_USER_SPOTS, data }
}

export const editSpot = (data) => {
  return { type: UPDATE_SPOT, data }
}

export const removeSpot = (data) => {
  return { type: DELETE_SPOT, data }
}

export const removeAllSpots = (reset) => {
  return { type: RESET_ALL_SPOTS, reset }
}

export const resetSpot = (reset) => {
  return { type: RESET_SPOT, reset }
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

export const getOneSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spotData = await response.json();
    const normalize = normalizeOneSpot(spotData);
    dispatch(oneSpot(normalize));
    return normalize;
  }
};

export const getUserSpots = () => async dispatch => {
  try {
    const response = await csrfFetch(`/api/spots/current`);

    const data = await response.json();
    const normalize = normalizeAllSpots(data.Spots)
    dispatch(userSpots(normalize));
    return normalize

  } catch (err) {
    const data = await err.json()
    return data;
  }

};

export const updateSpot = (updatedSpot, id, imageArray) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    header: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedSpot)
  });

  if (response.ok) {
    const data = await response.json();
    for (let image of imageArray) {
      if (image.url) {
        await csrfFetch(`/api/spots/${id}/images`, {
          method: 'POST',
          header: { 'Content-Type': 'application/json' },
          body: JSON.stringify(image)
        });
      }
    };
    return data;
  }
}

export const deleteSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, { method: 'DELETE' })

  if (response.ok) {
    dispatch(removeSpot(spotId));
    return;
  }
}

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

export const resetAllSpots = () => async dispatch => {
  dispatch(removeAllSpots(initialState));
  return;
}

export const resetSingleSpot = () => async dispatch => {
  dispatch(resetSpot(initialState));
  return;
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
      return { ...state, allSpots: { ...action.spots } };
    case ONE_SPOT:
      return {
        ...state,
        singleSpot: {
          ...action.spotId,
          SpotImages: [...action.spotId.SpotImages],
          Owner: { ...action.spotId.Owner }
        }
      }
    case ALL_USER_SPOTS:
      return { ...state, allSpots: { ...action.data } }
    case DELETE_SPOT:
      const newState = { ...state, allSpots: { ...state.allSpots } }
      delete newState.allSpots[action.data]
      return newState;
    case RESET_SPOT:
      return action.reset;
    case RESET_ALL_SPOTS:
      return action.reset;
    default: return { ...state }
  }
};

export default spotsReducer;
