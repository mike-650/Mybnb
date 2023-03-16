import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_REVIEWS = 'ALL_REVIEWS';
const USER_REVIEWS = 'USER_REVIEWS';


// ! ACTION CREATORS
export const allReviews = (reviews) => {
  return { type: ALL_REVIEWS, reviews };
};

export const userReviews = (reviews) => {
  return { type: USER_REVIEWS, reviews };
};


// ! NORMALIZE DATA
const normalizeAllReviews = (reviews) => {
  let normalized = {};
  reviews.forEach(review =>  normalized[review.id] = review)
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

export const getSessionUserReviews = () =>  async dispatch => {
  const response = await csrfFetch(`/api/reviews/current`);
  if (response.ok) {
    const reviews = await response.json()
    const normalized = normalizeAllReviews(reviews.Reviews)
    dispatch(userReviews(normalized));
    return normalized;
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
    default: return state
  };
};

export default reviewReducer;
