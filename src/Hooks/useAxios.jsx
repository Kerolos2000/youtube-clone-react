import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url) {
  const [details, setDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  function callApi() {
    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        setLoader(false);
        setDetails(res.data);
      })
  }

  useEffect(() => {
    callApi();
  }, []);

  return { details, setDetails, loader, setLoader, error, setError, callApi };
}
