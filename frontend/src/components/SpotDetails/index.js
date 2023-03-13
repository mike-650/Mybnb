import { getOneSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function SpotDetails() {
  const dispatch = useDispatch();
  const {spotId} = useParams();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [])
  return (
    <h1>Spot details</h1>
  );
};

export default SpotDetails;
