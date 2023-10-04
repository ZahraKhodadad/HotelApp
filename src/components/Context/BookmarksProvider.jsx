import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 
  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/bookmarks");
        setBookmarks(data);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
      setCurrentBookmark(null);
    } finally {
      setIsLoading(false);
    }
  }
  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/bookmarks`,
        newBookmark
      );
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
      setCurrentBookmark(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        createBookmark,
        currentBookmark,
        setBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarksProvider;

export const useBookmark = () => useContext(BookmarkContext);
