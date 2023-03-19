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
  const array = Object.values(spotReviews).reverse();


  const usersReviewIds = Object.values(spotReviews).map(review => review.User.id)
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);


  if (Object.keys(spot).length === 0) {
    return <div>Loading...</div>
  };

  function handleClick() {
    alert('Feature Coming Soon...');
  };

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
            <div style={{display:'flex', flexWrap:'wrap'}}>
            <p>{spot.description}</p>
            </div>
          </div>
          <div className="spot-reserve-container">
            <div className="spot-reserve-feature">
              <div className="spot-reserve-info">
                <p style={{ fontWeight: 'bold' }}>${Number(spot.price).toFixed(2)} night</p>
                <p>
                  <i className="fa-solid fa-star"></i>
                  {spot.numReviews > 1 ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} reviews` : null}
                  {spot.numReviews === 1 ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} review` : null}
                  {!spot.numReviews ? ` New` : null}
                </p>
              </div>
              <div className="spot-reserve-button">
                <button onClick={handleClick} id='reserve-button'>Reserve</button>
              </div>
            </div>
          </div>
        </div>
        <p id='rating-review'><i className="fa-solid fa-star"></i>
          {spot.numReviews > 1 ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} reviews` : null}
          {spot.numReviews === 1 ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} review` : null}
          {!spot.numReviews ? ` New` : null}
        </p>

        {sessionUser && spot.Owner.id !== sessionUser.id && !usersReviewIds.includes(sessionUser.id) && (
          <div className="post-review-button">
            <OpenModalMenuItem
              itemText='Post Your Review'
              modalComponent={<ReviewFormModal spotId={spotId}
              />}
            /></div>)}
        {array.map(review =>
          <div key={review.id} className='user-review'>
            <p>{review.User.firstName}</p>
            <p>{months[review.createdAt.substring(5, 7) - 1]} {review.createdAt.substr(0, 4)}</p>
            <p>{review.review}</p>

            {review.User.id === sessionUser?.id ?
              <>
                <div className="delete-review-button">
                  <OpenModalMenuItem
                    itemText='Delete'
                    modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />} /></div></>
              : null}
            <div style={{ borderBottom: '1px solid black', marginBottom: '4px' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
