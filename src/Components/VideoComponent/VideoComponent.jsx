import React, { useState } from "react";
import { Link } from "react-router-dom";

import ContentCutIcon from "@mui/icons-material/ContentCut";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShareIcon from "@mui/icons-material/Share";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Avatar, Button, ButtonGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { formatDistanceStrict } from "date-fns";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./VideoComponent.module.css";

export default function VideoComponent({
  videoDetails,
  commentDetails,
  prams,
  iframeURL,
}) {
  // show more text
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const descriptionStyle = showMore
    ? { overflow: "visible" }
    : { maxHeight: "85px", overflow: "hidden" };
  const buttonText = showMore ? "Read Less ..." : "Read More ...";

  // return (from 1 day ago)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceStrict(date, new Date(), { addSuffix: true });
  };
  return (
    <>
      <iframe src={iframeURL} title="YouTube video player"/>
      {videoDetails?.items?.map((item, i) => (
        <div key={i}>
          <h5 className="my-2 fw-bold">{item.snippet.title}</h5>
          <div className={style.details}>
            <div className={style.chanalDetails}>
              <Avatar className="me-2" sx={{ width: 40, height: 40 }}></Avatar>
              <Link
                to={`/youtube-clone-react/channel/${item.snippet.channelId}`}
              >
                <p className="m-0">{item.snippet.channelTitle}</p>
              </Link>
            </div>
            <div className={style.chanalDetails} style={{ overflow: "auto" }}>
              <Swiper
                freeMode={true}
                loop={true}
                modules={[FreeMode]}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 2,
                  },
                  540: {
                    slidesPerView: 2,
                    spaceBetween: 2,
                  },
                  767: {
                    slidesPerView: 3,
                    spaceBetween: 2,
                  },
                  1250: {
                    slidesPerView: 5,
                    spaceBetween: 2,
                  },
                }}
              >
                <SwiperSlide>
                  <ButtonGroup
                    className="w-100 me-1"
                    color="inherit"
                    variant="contained"
                  >
                    <Button className="w-100" color="inherit">
                      <ThumbUpOutlinedIcon />
                    </Button>
                    <Button className="w-100" color="inherit">
                      <ThumbDownOutlinedIcon />
                    </Button>
                  </ButtonGroup>
                </SwiperSlide>

                <SwiperSlide>
                  <Button className="w-100" variant="contained" color="inherit">
                    <ShareIcon /> Share
                  </Button>
                </SwiperSlide>
                <SwiperSlide>
                  <Button className="w-100" variant="contained" color="inherit">
                    <ContentCutIcon /> Clip
                  </Button>
                </SwiperSlide>
                <SwiperSlide>
                  <Button className="w-100" variant="contained" color="inherit">
                    <PlaylistAddIcon /> save
                  </Button>
                </SwiperSlide>
                <SwiperSlide>
                  <Button className="w-100" variant="contained" color="inherit">
                    <MoreHorizIcon />
                  </Button>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          {item.snippet.description && (
            <div className="my-2 bg-light p-2">
              <div className="description" style={descriptionStyle}>
                <p className="small">{formatDate(item.snippet.publishedAt)}</p>
                <p className={style.p}>{item.snippet.description}</p>
              </div>
              {item.snippet.description.length > 85 && (
                <button className="read-more-btn" onClick={toggleShowMore}>
                  {buttonText}
                </button>
              )}
            </div>
          )}
          <div className={style.yourComment}>
            <Avatar className="me-3" sx={{ width: 40, height: 40 }}></Avatar>

            <TextField
              className={`${style.input} w-100`}
              id="fullWidth"
              label="Add a comment..."
              variant="standard"
              color="error"
            />
            <Button variant="text" color="error">
              add
            </Button>
          </div>

          {commentDetails?.items?.map((el, i) => (
            <div key={i} className={`${style.otherComment} my-3`}>
              <Avatar className="me-3" sx={{ width: 40, height: 40 }}></Avatar>
              <div className={style.commentDetails}>
                <div className={style.userName}>
                  <p className="small fw-bold me-2">
                    {el.snippet.topLevelComment.snippet.authorDisplayName}
                  </p>
                  <p className="small text-muted">
                    {formatDate(el.snippet.topLevelComment.snippet.publishedAt)}
                  </p>
                </div>
                <p className="small">
                  {el.snippet.topLevelComment.snippet.textOriginal ||
                    el.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <Button color="inherit">
                  <ThumbUpOutlinedIcon />
                </Button>
                <Button color="inherit">
                  <ThumbDownOutlinedIcon />
                </Button>
                <Button color="inherit">Replay...</Button>
              </div>
            </div>
            // console.log(commentDetails)
          ))}
        </div>
      ))}
    </>
  );
}
