import { getUserSpots, resetAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteFormModal from "../DeleteSpotModal";
import "./ManageSpots.css";

function ManageSpots() {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector(state => state.spots.allSpots))

  useEffect(() => {
    dispatch(resetAllSpots());
    dispatch(getUserSpots());

    return () => {
      dispatch(resetAllSpots());
    }
  }, [dispatch]);

  return (
    <div className="manage-spot-container">
      <div className="manage-spot-header">
        <h2 style={{ marginBottom: '4px' }}>Manage Your Spots</h2>
       { !spots.length ? <NavLink to='/spots/new'>
          <button id='create-spot-btn'>Create a New Spot</button>
        </NavLink> : null }
      </div>
      <div className="all-spots manage-spots">
        {spots.map(spot =>
          <div key={spot.id} className='all-spots-container'>
            <NavLink to={`/spots/${spot.id}`} className='nav-link'>
              <img
                title={`${spot.name}`}
                src={spot.previewImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.clipartmax.com/png/middle/155-1550474_image-is-not-available-home-button-transparent-background.png';
                }}
                alt='Not Available'
                className='all-spots-images' />
            </NavLink>
            <div className="spot-label">
              <p className='all-spots-desc'><strong>{spot.city}, {spot.state}</strong></p>
              <p>{spot.avgRating !== 'no rating available' ? <><i className="fa-solid fa-star"></i> {spot.avgRating ? spot.avgRating?.toFixed(1) : 'New'}</> : 'New'}</p>
            </div>
            <p className='all-spots-desc'><strong>${Number(spot.price).toFixed(2)}</strong> night</p>
            <div className="update-delete-buttons">
              <NavLink to={`/spots/${spot.id}/edit`}>
                <button id='update-spot-button'>Update</button>
              </NavLink>
              <div></div>
              <div id='delete-spot-button'>
                <OpenModalMenuItem
                  itemText="Delete a Spot"
                  modalComponent={<DeleteFormModal spotId={spot.id}
                  />}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}

export default ManageSpots;
