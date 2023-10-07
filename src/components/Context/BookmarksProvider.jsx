import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();

const initialState = {
  isLoading: false,
  bookmarks: [],
  currentBookmark: null,
  error: null,
};
const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        currentBookmark: null,
        bookmarks: state.bookmarks.filter((s) => s.id !== action.payload),
      };
    default:
      throw new Error(error.message);
  }
};
const BookmarksProvider = ({ children }) => {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get("http://localhost:5000/bookmarks");
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast(error.message);
        dispatch({ type: "rejected", payload: error.message });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
      // setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
      // setCurrentBookmark(null);
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/bookmarks`,
        newBookmark
      );

      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function deleteBookmark(id) {
    console.log(id);
    dispatch({ type: "loading" });
    try {
      await axios.delete(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
      // setBookmarks((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
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
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarksProvider;

export const useBookmark = () => useContext(BookmarkContext);
