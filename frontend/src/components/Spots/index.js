import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllReviews } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import './Spots.css';

function Spots() {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector(state => state.spots.allSpots));

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  return (
    <div className="all-spots">
      {/* STEP 3 Do whatever you need with the data! */}
      {spots.map(spot =>
        <NavLink to={`/spots/${spot.id}`} className='nav-link' key={spot.id}>
          <div className='all-spots-container'>
            <img
            title={`${spot.name}`}
            src={spot.previewImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.clipartmax.com/png/middle/155-1550474_image-is-not-available-home-button-transparent-background.png';
            }}
            alt='Not Available'
            className='all-spots-images' />
            <div className="spot-label">
              <p className='all-spots-desc'><strong>{spot.city}, {spot.state}</strong></p>
              <p>{spot.avgRating !== 'no rating available' ? <><i className="fa-solid fa-star"></i> {spot.avgRating % 1 !== 0 ? spot.avgRating : `${spot.avgRating}.0`}</> : 'New'}</p>
            </div>
            <p className='all-spots-desc'><strong>${spot.price.toFixed(2)}</strong> night</p>
          </div>
        </NavLink>)}
    </div>
  );
}

export default Spots;
