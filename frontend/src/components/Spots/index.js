import { useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";

function Spots() {
  const dispatch = useDispatch();

  async function lol() {
    const spots = getAllSpots();
    const data = await spots();

    console.log(data);
  }

  lol();


  return (
    <div>
      Test
    </div>
  );
}

export default Spots;
