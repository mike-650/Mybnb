import { getOneSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import './SpotDetails.css';

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  const spot = useSelector(state => state.spots.singleSpot);

  // * Conditionally render this until the data is loaded from the redux store
  if (Object.keys(spot).length === 0) {
    return <div>Loading...</div>
  };

  function handleClick() {
    alert('Feature Coming Soon...');
  }

  return (
    <div className="spot-container">
      <div className="spot-details">
        <h3>{spot.name}</h3>
        <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
        <div className="spot-images-div">
          {spot.SpotImages.map(image => <img src={image.url} alt='Spot' key={image.id} className='spot-images' />)}
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
      </div>
    </div>
  );
};

export default SpotDetails;
