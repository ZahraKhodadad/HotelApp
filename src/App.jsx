import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";
import useFetch from "./components/hooks/useFetch";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/Hotels/SingleHotel";
import HotelsProvider from "./components/Context/HotelsProvider";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarksProvider from "./components/Context/BookmarksProvider";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/Bookmark/SingleBookmark";
import AddNewBookmark from "./components/Bookmark/AddNewBookmark";

function App() {
  const [count, setCount] = useState(0);
  // const { isLoading, data } = useFetch("http://localhost:5000/hotels", "");
  return (
    <BookmarksProvider>
      <HotelsProvider>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmarks" element={<BookmarkLayout />}>
            <Route index element={<Bookmark />} />
            <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarksProvider>
  );
}

export default App;
