import { Link } from "react-router-dom";
import { useHotels } from "../Context/HotelsProvider";

const hotels = () => {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <p>...isLoading</p>;
  return (
    <div className="searchList">
      <h2>Search Results:{hotels.length}</h2>
      {hotels.map((item) => (
        <Link
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          key={item.id}
        >
          <div
            className={`searchItem ${
              currentHotel?.id === item.id ? "current-hotel" : ""
            }`}
          >
            <img src={item.picture_url.url} alt={item.name} />
            <div className="searchItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default hotels;
