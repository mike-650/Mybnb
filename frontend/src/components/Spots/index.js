import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

function Spots() {
  const dispatch = useDispatch();
  // * Grab allSpots state slice and convert into an array
  const spots = Object.values(useSelector(state => state.spots.allSpots));

  // * Runs on mount
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch])


  return (
    <div>
      {spots.map(spot => <div key={spot.id}>{`${spot.state}, ${spot.city}`}</div>)}
    </div>
  );
}

export default Spots;
