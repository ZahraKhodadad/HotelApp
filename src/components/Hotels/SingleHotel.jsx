import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useHotels } from "../Context/HotelsProvider";
import { useEffect } from "react";

const SingleHotel = () => {
  const { id } = useParams();
  console.log(id);
  const { getHotel, currentHotel, isLoadingCurrHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <p>loading...</p>;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviewes &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
};

export default SingleHotel;
