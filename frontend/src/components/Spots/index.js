import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import './Spots.css';

function Spots() {
  const dispatch = useDispatch();
  // * STEP 2: Grab the state slice from the redux store and
  // * convert it into an array
  const spots = Object.values(useSelector(state => state.spots.allSpots));

  // * STEP 1: On mount this will grab all of our spot data and store it in
  // * the redux store
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch])


  return (
    <div className="all-spots">
      {/* STEP 3 Do whatever you need with the data! */}
      {spots.map(spot =>
        <NavLink to={`/spots/${spot.id}`} className='nav-link' key={spot.id}>
          <div className='all-spots-container'>
            <img title={`${spot.name}`} src={spot.previewImage} alt='https://www.beauflor.us/en/crafted-plank-and-tile/parkway-pro-click/-/media/sites/ideal/general/nophoto.ashx?as=1&rev=d7c55585b143492bb40a105c8a3554f2&hash=E3318B97D01C0BC7F91476129330E4C4&hash=E3318B97D01C0BC7F91476129330E4C4' className='all-spots-images' />
            <div className="spot-label">
              <p className='all-spots-desc'><strong>{spot.city}, {spot.state}</strong></p>
              <p>{spot.avgRating !== 'no rating available' ? <><i className="fa-solid fa-star"></i> {spot.avgRating % 1 !== 0 ? spot.avgRating : `${spot.avgRating}.0`}</> : 'New'}</p>
            </div>
            <p className='all-spots-desc'><strong>${spot.price}</strong> night</p>
          </div>
        </NavLink>)}
    </div>
  );
}

export default Spots;
