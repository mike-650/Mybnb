import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
        <div key={spot.id} className='spot-container'>
          <img src={spot.previewImage} className='spot-images' />
          <div className="spot-label">
          <p>{spot.city}, {spot.state}</p>
          <p><i class="fa-solid fa-star"></i> {spot.avgRating}</p>
          </div>
          <p>${spot.price} <span>night</span></p>
        </div>)}
    </div>
  );
}

export default Spots;
