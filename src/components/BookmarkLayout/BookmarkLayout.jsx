import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

const BookmarkLayout = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map />
    </div>
  );
};

export default BookmarkLayout;
// import { createContext, useContext, useState } from "react";
// import useFetch from "../hooks/useFetch";
// const BookmarkContext = createContext();

// const BookmarkLayout = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [bookMark, setBookMark] = useState([]);
//   useFetch(`http://localhost:5000/${bookMark}/?lat=`)
//   return (
//     <BookmarkContext.Provider value={(isLoading, bookMark)}>
//       {children}
//     </BookmarkContext.Provider>
//   );
// };

// export default BookmarkLayout;

// export const useBookmark = () => useContext(BookmarkContext);
