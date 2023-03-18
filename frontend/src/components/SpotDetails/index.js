import { getOneSpot } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from "../DeleteReviewModal";
import ReviewFormModal from "../ReviewFormModal";
import './SpotDetails.css';


const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function SpotDetails() {
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  const sessionUser = useSelector(state => state.session.user);
  const spotReviews = useSelector(state => state.reviews.spot);


  const usersReviewIds = Object.values(spotReviews).map(review => review.User.id)
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);



  // * Conditionally render this until the data is loaded from the redux store
  if (Object.keys(spot).length === 0) {
    return <div>Loading...</div>
  };

  function handleClick() {
    alert('Feature Coming Soon...');
  };

  // ! BUG 1
  /*
  *FIXED*
    BUG SITUATION:
    Currently when we are logged out, we aren't able to render the page
    because of a 401 error from the database, this is due to our dispatch call
    to get the reviews of the current user, this request has a middleware that
    requires authentication.

    CAUSE OF BUG:
    We are using the logic of getting the current users reviews and creating an
    array of the spotIds of their individual reviews and using that array to check
    if the review belongs to our current user to render our 'Post Your Review' button

    BUG FIX SOLUTION:
    What we can do is, instead of requesting for the current user reviews from the db, we can
    just use the reviews we get from all reviews (which doesn't require authentication) and all
    the data that is provided from the store is more than enough to perform the actions we need
    without having to make a fetch call for the current user reviews (which requires authentication)

    NOTES:
    Post Your Review Button
    - It should be hidden if we aren't logged in
      - This can be solved by checking if we have a sessionUser in
          our slice state

          - IMPLEMENTED

    - It should be hidden if the current user owns the spot
      - This can be solved by checking the 'Owner' slice state
        within our store and if our sessionUser.id === Owner.id

          - IMPLEMENTED

    - It should be hidden if the current user has a review for the spot
      - This can be solved by checking the 'User' slice of state within the
        spot reviews and checking if our sessionUser.id === spot.[reviewId].User.id

          - IMPLEMENTED

  */
  // ! BUG 2
  /*
    ?WIP?
    BUG SITUATION:
    When we post a review for a spot, we run into an error

    CAUSE OF BUG:
    UNKNOWN

    BUG FIX SOLUTION:
    PENDING
  */

  return (
    <div className="spot-container">
      <div className="spot-details">
        <h3>{spot.name}</h3>
        <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
        <div className="spot-images-div">
          {spot.SpotImages.map(image =>
            <img
              src={image.url}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://www.clipartmax.com/png/middle/155-1550474_image-is-not-available-home-button-transparent-background.png';
              }}
              key={image.id}
              className='spot-images'
              alt='Unavaiable'
            />)}
        </div>
        <div className="spot-descrip-reserve-grid">
          <div className="spot-description-area">
            <h4>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h4>
            <p>{spot.description}</p>
          </div>
          <div className="spot-reserve-feature">
            <div className="spot-reserve-info">
              <p style={{fontWeight:'bold'}}>${Number(spot.price).toFixed(2)} night</p>
              <p>
                <i className="fa-solid fa-star"></i>
                {spot.numReviews ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} review(s)` : " New"}
              </p>
            </div>
            <div className="spot-reserve-button">
              <button onClick={handleClick} id='reserve-button'>Reserve</button>
            </div>
          </div>
        </div>
        <p id='rating-review'><i className="fa-solid fa-star"></i>{spot.numReviews ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} review(s)` : " New"}</p>

        {sessionUser && spot.Owner.id !== sessionUser.id && !usersReviewIds.includes(sessionUser.id) && (
          <div className="post-review-button">
            <OpenModalMenuItem
              itemText='Post Your Review'
              modalComponent={<ReviewFormModal spotId={spotId}
              />}
            /></div>)}
        {Object.values(spotReviews).map(review =>
          <div key={review.id} className='user-review'>
            <p>{review.User.firstName}</p>
            <p>{months[review.createdAt.substring(5, 7) - 1]} {review.createdAt.substr(0, 4)}</p>
            <p>{review.review}</p>
            {/* FIXED WITH OPTIONAL CHAINING, HOOORAY! */}
            {review.User.id === sessionUser?.id ?
              <OpenModalMenuItem
                itemText='Delete'
                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}/>
                : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
