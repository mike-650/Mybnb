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
  console.log({spot})
  if (Object.keys(spot).length === 0) {
    return <div>Loading...</div>
  }
  console.log(spot)

  return (
    <>
      <div className="spot-details">
        <h3>{spot.name}</h3>
        <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
        <div className="spot-images-div">
        {spot.SpotImages.map(image => <img src={image.url} key={image.id} className='spot-images'/>)}
        </div>
        <div>
        <h3>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h3>
        <p>{spot.description}</p>
        </div>
      </div>
    </>
  );
};

export default SpotDetails;
