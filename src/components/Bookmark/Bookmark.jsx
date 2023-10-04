import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarksProvider";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const Bookmark = () => {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  if (isLoading && !currentBookmark) return <Loader />;
  return (
    <div>
      <h2>BookMark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bookmarkItem ${
                currentBookmark?.id === item.id ? "current-bookmark" : ""
              }`}
            >
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp;<strong>{item.cityName}</strong>&nbsp;
              <span>{item.country}</span>
              <button onClick={(e) => handleDelete(e, item.id)}>
                <HiTrash className="trash" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
