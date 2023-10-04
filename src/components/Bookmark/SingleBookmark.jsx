import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarksProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

const SingleBookmark = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentBookmark, isLoading, getBookmark } = useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <Loader />;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr;Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className={`bookmarkItem`}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
