import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../Context/BookmarksProvider";


const BookmarkLayout = () => {
  const { bookmarks } = useBookmark();
  // console.log(useBookmark());
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
};

export default BookmarkLayout;
