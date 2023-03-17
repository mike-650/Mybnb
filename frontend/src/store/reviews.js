import { csrfFetch } from "./csrf";

// ! CONSTANTS
const ALL_REVIEWS = 'ALL_REVIEWS';
const USER_REVIEWS = 'USER_REVIEWS';
const ADD_REVIEW = 'CREATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';


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

export const deleteReview = (reviewId) => {
  return { type: DELETE_REVIEW, reviewId }
}


// ! NORMALIZE DATA
const normalizeAllReviews = (reviews) => {
  let normalized = {};
  reviews.forEach(review => normalized[review.id] = review)
  return normalized;
};


// ! THUNK ACs'
export const getAllReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  // ? I Believe the error is here, When I fetch for reviews, if the response is
  // ? fufilled we run the dispatch which will update the spots with reviews
  // ! But because the fetch 404'd meaning there were no reviews
  // ! our dispatch doesn't execute and our state still persists
  // ! causing the old reviews to be populated

  if (response.ok) {
    const reviews = await response.json();
    const normalized = normalizeAllReviews(reviews.Reviews);
    dispatch(allReviews(normalized));
    return normalized;
  };

  // * When we hard refresh our component runs all its dispatches,
  // * meaning all the reducers run and anything that didn't match
  // * the action type will default to its original state
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
  } catch (error) {
    const data = await error.json();
    return { data, error: data.message }
  }
};

export const deleteUserReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`,
    { method: 'DELETE' })

  if (response.ok) {
    const data = await response.json();
    console.log({ data })
    dispatch(deleteReview(reviewId));
    return data;
  }
}

// ! INITIAL SLICE STATE
const initialState = {
  spot: {},
  user: {}
};

// ! REDUCER
const reviewReducer = (state = initialState, action) => {
  console.log('ADD_REVIEW   :  ', action)
  switch (action.type) {
    case ALL_REVIEWS:
      return { ...state, spot: action.reviews }
    case USER_REVIEWS:
      return { ...state, user: { ...action.reviews } }
    case ADD_REVIEW:
      return {
        ...state,
        spot: { ...state.spot, [action.review.id]: action.review },
        user: { ...state.user, [action.review.id]: action.review }
      }
    case DELETE_REVIEW:
      // * PERFECT
      const newState = {
        ...state,
        spot: {
          ...state.spot,
          ...state.user
        }
      };
      delete newState.spot[action.reviewId]
      delete newState.user[action.reviewId]
      return newState;
    default: return { ...state }
  };
};

export default reviewReducer;
