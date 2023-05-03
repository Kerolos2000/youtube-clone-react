import React from "react";
import { Link } from "react-router-dom";
import style from "./CardX.module.css";
import { formatDistanceStrict } from "date-fns";
export default function CardX({
  dataX,
  loader,
  img,
  text,
  description,
  container,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceStrict(date, new Date(), { addSuffix: true });
  };

  return (
    <>
      {loader ? (
        <p>loading...</p>
      ) : (
        <div className={container}>
          {dataX.map((video, i) => (
            <div key={i} className="row my-3">
              <div className={`${style.divImg} pb-2 ${img}`}>
                <Link to={`/youtube-clone-react/video/${video.id.videoId}`}>
                  <div className={style.imgX}>
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                    />
                  </div>
                </Link>
              </div>
              <div className={`${style.divText} ${text}`}>
                <Link to={`/youtube-clone-react/video/${video.id.videoId}`}>
                  <h2>{video.snippet.title}</h2>
                </Link>
                <Link to={`/youtube-clone-react/video/${video.id.videoId}`}>
                  <p className="small">
                    {formatDate(video.snippet.publishedAt)}
                  </p>
                </Link>
                <Link
                  to={`/youtube-clone-react/channel/${video.snippet.channelId}`}
                >
                  <p className="small">{video.snippet.channelTitle}</p>
                </Link>
                {description && (
                  <Link to={`/youtube-clone-react/video/${video.id.videoId}`}>
                    <p>{video.snippet.description}</p>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
