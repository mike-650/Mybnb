import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_SPOTS = 'ALL_SPOTS';
const ALL_USER_SPOTS = 'ALL_USER_SPOTS';
const ONE_SPOT = 'ONE_SPOT';
const CREATE_SPOT = 'CREATE_SPOT';
const UPDATE_SPOT = 'UPDATE_SPOT';
const DELETE_SPOT = 'DELETE_SPOT';

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

export const getUserSpots = () => async dispatch => {

  try {
    const response = await csrfFetch(`/api/spots/current`);

    const data = await response.json();
    const normalize = normalizeAllSpots(data.Spots)
    console.log('here')
    console.log({ normalize })
    dispatch(userSpots(normalize));
    return normalize

  } catch (err) {
    const data = await err.json()
    return data;
  }



};

export const updateSpot = (updatedSpot, spotId, imageArray) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    header: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedSpot)
  });

  if (response.ok) {
    const data = await response.json();
    // console.log('HERE   :    ', data)
    for (let image of imageArray) {
      await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
      });
    };

    return data;
    // TODO: NORMALIZE DATA
  }
}

export const deleteSpot = (spotId) => async dispatch => {
  console.log('spotID', spotId)
  const response = await csrfFetch(`/api/spots/${spotId}`, { method: 'DELETE' })

  if (response.ok) {
    const data = await response.json();
    console.log({ data })
    // dispatch(removeSpot());
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


// ! INITIAL SLICE STATE
const initialState = {
  allSpots: {},
  singleSpot: {}
};


// ! REDUCER
const spotsReducer = (state = initialState, action) => {
  console.log('USER SPOTS:   ', { action })
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
    case ALL_USER_SPOTS:
      return { ...state, allSpots: { ...action.data } }
    default: return { ...state }
  }
};

export default spotsReducer;
