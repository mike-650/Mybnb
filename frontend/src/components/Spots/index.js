import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots)

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch])


  return (
    <div>

    </div>
  );
}

export default Spots;
