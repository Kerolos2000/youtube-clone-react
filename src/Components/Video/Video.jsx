import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { search } from "../../Context/search";
import CardX from "../CardX/CardX";
import useAxios from "../../Hooks/useAxios";

import Loader from "../Loader/Loader";
// Import Swiper styles
import "swiper/css";
import axios from "axios";
import VideoComponent from "../VideoComponent/VideoComponent";

export default function Video() {
  let prams = useParams();
  const { id: pramsId } = useParams();
  const searchX = useContext(search);
  const {
    details: videoDetails,
    loader: videoLoader,
    callApi: callVideoApi,
  } = useAxios(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${pramsId}&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
  );
  const { details: commentDetails, callApi: callCommentApi } = useAxios(
    `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${pramsId}&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
  );

  let [dataSearch, setDataSearch] = useState([]);
  function x(channelId) {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&q=%22%22&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
      )
      .then((res) => {
        setDataSearch(res.data.items);
      });
  }

  useEffect(() => {
    if (videoDetails && videoDetails.items && videoDetails.items.length > 0) {
      const v = videoDetails.items[0].snippet.channelId;
      x(v);
    }
  }, [videoDetails]);

  useEffect(() => {
    callVideoApi();
    callCommentApi();
  }, [pramsId]);

  return (
    <>
      {videoLoader ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row my-3">
            <div className="col-lg-8">
              <VideoComponent
                videoDetails={videoDetails}
                commentDetails={commentDetails}
                prams={prams.id}
                iframeURL={`https://www.youtube.com/embed/${prams.id}`}
              />
            </div>
            <div className="col-lg-4">
              <CardX
                img={"col-md-6 col-lg-5"}
                text={"col-md-6 col-lg-7"}
                container={"noContainer"}
                dataX={dataSearch}
                loader={searchX.loader}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
