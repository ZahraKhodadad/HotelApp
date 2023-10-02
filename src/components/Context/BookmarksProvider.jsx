import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  const { isLoading, data: bookmarks } = useFetch(
    "http://localhost:5000/bookmarks",
    ""
  );
  // console.log(data);
  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      // console.log(data);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
      setCurrentBookmark(null);
    } finally {
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        isLoadingCurrBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarksProvider;

export const useBookmark = () => useContext(BookmarkContext);
