import { useState } from "react";

const useGeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [err, setErr] = useState(null);
  function getPosition() {
    setIsLoading(true);
    if (navigator.geolocation)
      setErr("your browser does not support geoLocation!");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        setErr(err.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, position, err, getPosition };
};

export default useGeoLocation;
