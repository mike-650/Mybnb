import { getOneSpot } from "../../store/spots";
import { getAllReviews, getSessionUserReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from "../DeleteReviewModal";
import ReviewFormModal from "../ReviewFormModal";
import './SpotDetails.css';
import LoginFormModal from "../LoginFormModal";


const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function SpotDetails() {
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  const sessionUser = useSelector(state => state.session.user);
  const spotReviews = useSelector(state => state.reviews.spot);
  const userReviews = useSelector(state => Object.values(state.reviews.user).map(review => review.spotId));
  const userReviewsSTATE = useSelector(state => state.reviews);
  const [showReviewModal, setReviewModal] = useState(false);
  const { spotId } = useParams();


  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getAllReviews(spotId));
    dispatch(getSessionUserReviews());
  }, [dispatch, spotId]);


  // * Conditionally render this until the data is loaded from the redux store
  if (Object.keys(spot).length === 0) {
    return <div>Loading...</div>
  };

  function handleClick() {
    alert('Feature Coming Soon...');
  };

  function reviewDelete() {
    // TODO
    // setShowMenu(true);
  }

  function openReviewModal() {
    console.log('Open review modal')
    setReviewModal(true);
  }

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
            <h3>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h3>
            <p>{spot.description}</p>
          </div>
          <div className="spot-reserve-feature">
            <div className="spot-reserve-info">
              <p>${spot.price} night</p>
              <p>
                <i className="fa-solid fa-star"></i>
                {spot.numReviews ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} reviews` : " New"}
              </p>
            </div>
            <div className="spot-reserve-button">
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>
        </div>
        <p><i className="fa-solid fa-star"></i>{spot.numReviews ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} reviews` : " New"}</p>
        {/* POST YOUR REVIEW CONDITIONAL RENDER */}
        {sessionUser && spot.Owner.id !== sessionUser.id && !userReviews.includes(spotId) ?
        <div className="post-review-button">
          <OpenModalMenuItem
            itemText='Post Your Review'
            // onItemClick={closeMenu}
            modalComponent={<ReviewFormModal spotId={spotId}
            />}
          />
          </div> :
          null
        }


        {Object.values(spotReviews).map(review =>
          <div key={review.id} className='user-review'>
            <p>{review.User.firstName}</p>
            <p>{months[review.createdAt.substring(5, 7) - 1]} {review.createdAt.substr(0, 4)}</p>
            <p>{review.review}</p>
            { review.User.id === sessionUser.id ?
            <OpenModalMenuItem
            itemText='Delete'
            modalComponent={<DeleteReviewModal reviewId={review.id}/>}
            /> : null }
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
