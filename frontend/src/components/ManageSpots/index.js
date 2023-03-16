import { getUserSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
// import DeleteFormModal from "../DeleteFormModal";
import "../Spots/Spots.css";

function ManageSpots() {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector(state => state.spots.allSpots))

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);

  return (
    <div>
      <div style={{ paddingLeft: '75px' }}>
        <h2>Mange Your Spots</h2>
        <NavLink to='/spots/new'>
          <button>Create a New Spot</button>
        </NavLink>
      </div>
      <div className="all-spots">
        {spots.map(spot =>
          <NavLink to={`/spots/${spot.id}`} className='nav-link' key={spot.id}>
            <div className='all-spots-container'>
              <img title={`${spot.name}`} src={spot.previewImage} alt='Not Available' className='all-spots-images' />
              <div className="spot-label">
                <p className='all-spots-desc'><strong>{spot.city}, {spot.state}</strong></p>
                <p>{spot.avgRating !== 'no rating available' ? <><i className="fa-solid fa-star"></i> {spot.avgRating % 1 !== 0 ? spot.avgRating : `${spot.avgRating}.0`}</> : 'New'}</p>
              </div>
              <p className='all-spots-desc'><strong>${spot.price}</strong> night</p>
              <div>
                <NavLink to={`/spots/${spot.id}/edit`}>
                  <button>Update</button>
                </NavLink>

                <button>Delete</button>

              </div>
            </div>
          </NavLink>)}
      </div>
    </div>
  )
}

export default ManageSpots;
