import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_REVIEWS = 'ALL_REVIEWS';
const USER_REVIEWS = 'USER_REVIEWS';
const ADD_REVIEW = 'CREATE_REVIEW';


// ! ACTION CREATORS
export const allReviews = (reviews) => {
  return { type: ALL_REVIEWS, reviews };
};

export const userReviews = (reviews) => {
  return { type: USER_REVIEWS, reviews };
};

export const addReview = (review) => {
  return { type: ADD_REVIEW, review };
};


// ! NORMALIZE DATA
const normalizeAllReviews = (reviews) => {
  let normalized = {};
  reviews.forEach(review => normalized[review.id] = review)
  return normalized;
};


// ! THUNK ACs'
export const getAllReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    const normalized = normalizeAllReviews(reviews.Reviews);
    dispatch(allReviews(normalized));
    return normalized;
  };
};

export const getSessionUserReviews = () => async dispatch => {
  const response = await csrfFetch(`/api/reviews/current`);
  if (response.ok) {
    const reviews = await response.json()
    const normalized = normalizeAllReviews(reviews.Reviews)
    dispatch(userReviews(normalized));
    return normalized;
  }
}

export const createNewReview = (newReview, spotId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });

    const data = await response.json();
    dispatch(addReview(data));
    return { data, error: null };
  } catch(error) {
    const data = await error.json();
    return { data, error: data.message }
  }
}


// ! INITIAL SLICE STATE
const initialState = {
  spot: {},
  user: {}
};

// ! REDUCER
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_REVIEWS:
      return { ...state, spot: { ...action.reviews } }
    case USER_REVIEWS:
      return { ...state, user: { ...action.reviews } }
    case ADD_REVIEW:
      return { ...state }
    default: return { ...state }
  };
};

export default reviewReducer;
