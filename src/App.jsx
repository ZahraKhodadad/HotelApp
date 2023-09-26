import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "./components/hooks/useFetch";
import LocationList from "./components/locationList/LocationList";
function App() {
  const [count, setCount] = useState(0);
  // const { isLoading, data } = useFetch("http://localhost:5000/hotels", "");
  return (
    <>
      <Header />
      <Toaster />
      <LocationList/>
    </>
  );
}

export default App;
