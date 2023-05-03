import React, { useEffect, useState } from "react";
import VideoComponent from "../VideoComponent/VideoComponent";
import useAxios from "../../Hooks/useAxios";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardX from "../CardX/CardX";

export default function PlayListVideos() {
  let prams = useParams();
  let { details: playlistDetails } = useAxios(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=100&playlistId=${prams.id}&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
  );

  let [idX, setId] = useState("");

  useEffect(() => {
    if (playlistDetails?.items?.length > 0) {
      setId(playlistDetails.items[0].snippet.resourceId.videoId);
    }
  }, [playlistDetails]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [commentDetails, setCommentDetails] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);

  useEffect(() => {
    if (idX) {
      const fetchRelatedVideos = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${idX}&type=video&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
        );
        setRelatedVideos(response.data.items);
      };
      fetchRelatedVideos();

      const fetchcommentDetails = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${idX}&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
        );
        setCommentDetails(response.data);
      };
      fetchcommentDetails();

      const fetchVideoDetails = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${idX}&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
        );
        setVideoDetails(response.data);
      };
      fetchVideoDetails();
    }

    console.log(commentDetails);
  }, [idX]);

  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-lg-8">
            <VideoComponent
              prams={prams.id}
              iframeURL={`https://www.youtube.com/embed/${idX}`}
              commentDetails={commentDetails}
              videoDetails={videoDetails}
            />
          </div>
          <div className="col-lg-4 " id="mainMenu">
            <h3>Select Video</h3>
            <ul className="list-group" id="listGroup">
              {playlistDetails?.items?.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item"
                  onClick={() => setId(item.snippet.resourceId.videoId)}
                  id={item.snippet.position + 1}
                >
                  <span>{item.snippet.title}</span>
                  <img src={item.snippet.thumbnails.default.url} alt=".." />
                </li>
              ))}
            </ul>
            <CardX
              img={"col-md-6 col-lg-5"}
              text={"col-md-6 col-lg-7"}
              container={"noContainer"}
              dataX={relatedVideos}
            />
          </div>
        </div>
      </div>
    </>
  );
}
