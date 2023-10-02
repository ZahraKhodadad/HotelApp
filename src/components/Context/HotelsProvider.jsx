import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";
const HotelContext = createContext();

const HotelsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/hotels/${id}`);
      // console.log(data);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
      setCurrentHotel(null);
    } finally {
      setIsLoadingCurrHotel(false);
    }
  }
  // getHotel(id);
  return (
    <HotelContext.Provider
      value={{ isLoading, hotels, getHotel, currentHotel, isLoadingCurrHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelsProvider;

export const useHotels = () => useContext(HotelContext);
