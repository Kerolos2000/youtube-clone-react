import axios from "axios";
import { createContext, useState } from "react";
export const search = createContext();

export function SearchProvider(props) {
  const key = "AIzaSyBVApomqeduLVm7DxeWO9_HPNpyb1v7gDw";
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [prams, setPrams] = useState("");

  function callApi(query) {
    setLoader(true);
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          maxResults: 50,
          q: query,
          type: "video",
          key: key,
        },
      })
      .then((res) => {
        setVideos(res.data.items);
        setLoader(false);
      });
  }
  function handleSubmit(e) {}

  // useEffect(() => {
  //   callApi();
  // }, []);

  return (
    <search.Provider
      value={{
        videos,
        setVideos,
        prams,
        setPrams,
        loader,
        setLoader,
        handleSubmit,
        callApi,
      }}
    >
      {props.children}
    </search.Provider>
  );
}
