import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import { useBookmark } from "../Context/BookmarksProvider";

const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client";
// const BASE_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const AddNewBookmark = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  console.log(lat, lng);
  const { createBookmark, setBookmarks } = useBookmark();

  useEffect(() => {
    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
          // `${BASE_GEOCODING_URL}?latlng=${lat}, ${lng}`
        );
        console.log(data);

        if (!data.countryCode) {
          throw new Error(
            "this location is not a city, please click on somewhere else"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <strong>{geoCodingError}</strong>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="cityName">cityName</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" countryCode={countryCode} svg />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr;Back
          </button>
          <button type="submit" className="btn btn--primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
