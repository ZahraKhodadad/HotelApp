import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetch = (url, query = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data)
      } catch (error) {
       
          setData([]);
          toast.error(error?.message);
       
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, url]);
  return { isLoading, data };
};

export default useFetch;
