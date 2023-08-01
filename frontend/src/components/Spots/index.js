import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetAllReviews } from "../../store/reviews";
import { getAllSpots, resetSingleSpot } from "../../store/spots";
import './Spots.css';
import ToolTip from "./ToolTip";

function Spots() {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector(state => state.spots.allSpots));

  useEffect(() => {
    dispatch(getAllSpots());

    return () => {
      dispatch(resetSingleSpot());
      dispatch(resetAllReviews());
    }
  }, [dispatch])

  if (!spots.length) return (
    <h1>Loading...</h1>
  );

  return (
    <div className="all-spots">
      {/* STEP 3 Do whatever you need with the data! */}
      {spots.map(spot =>
      <div key={spot.id}>
          <div className='all-spots-container'>
        <NavLink to={`/spots/${spot.id}`} className='nav-link'>
            {/* <img
            title={spot.name}
            src={spot.previewImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.clipartmax.com/png/middle/155-1550474_image-is-not-available-home-button-transparent-background.png';
            }}
            alt='Not Available'
            className='all-spots-images'
            /> */}
            <ToolTip name={spot.name} previewImage={spot.previewImage} />
        </NavLink>
            <div className="spot-label">
              <p className='all-spots-desc'><strong>{spot.city}, {spot.state}</strong></p>
              <p>{spot.avgRating !== 'no rating available' ? <><i className="fa-solid fa-star"></i> {spot.avgRating % 1 !== 0 ? spot.avgRating.toFixed(1) : `${spot.avgRating?.toFixed(1)}`}</> : 'New'}</p>
            </div>
            <p className='all-spots-desc'><strong>${Number(spot.price).toFixed(2)}</strong> night</p>
          </div>
        </div>) }
    </div>
  );
}

export default Spots;
