import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  console.log(destination);
  const room = JSON.parse(searchParams.get("options"))?.room;
  console.log(room);
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  if (isLoading) return <p>...isLoading</p>;
  return (
    <div className="searchList">
      <h2>Search Results:{data.length}</h2>
      {data.map((item) => (
        <div className="searchItem">
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
      ))}
    </div>
  );
};

export default hotels;
