import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { formatDistanceStrict } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import style from "./Home.module.css";

function HomePage() {
  let { details, loader, setDetails } = useAxios(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=EG&maxResults=50&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceStrict(date, new Date(), { addSuffix: true });
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (selectedCategoryId) {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&videoCategoryId=${selectedCategoryId}&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`;
      axios
        .get(url)
        .then((response) => {
          setDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCategoryId, setDetails]);

  useEffect(() => {
    const url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=EG&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`;
    axios
      .get(url)
      .then((response) => {
        setCategories(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function handleCategoryClick(categoryId) {
    setSelectedCategoryId(categoryId);
  }
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row g-3 my-3">
            <Swiper
              navigation={true}
              freeMode={true}
              loop={true}
              modules={[FreeMode, Navigation]}
              className="mySwiper"
              breakpoints={{
                280: {
                  slidesPerView: 2,
                  spaceBetween: 2,
                },
                320: {
                  slidesPerView: 3,
                  spaceBetween: 2,
                },
                540: {
                  slidesPerView: 5,
                  spaceBetween: 2,
                },
                767: {
                  slidesPerView: 7,
                  spaceBetween: 2,
                },
                1250: {
                  slidesPerView: 9,
                  spaceBetween: 2,
                },
              }}
            >
              {categories.map((category, i) => (
                <SwiperSlide
                  key={i}
                  onClick={() => handleCategoryClick(category.id)}
                  className={style.swiperSlide}
                >
                  <Button color="error">{category.snippet.title}</Button>
                </SwiperSlide>
              ))}
            </Swiper>
            {details?.items?.map((video, i) => (
              <div
                className={`col-sm-6 col-md-4 col-lg-3 ${style.allCard}`}
                key={i}
              >
                <div className={style.card}>
                  <Link to={`/youtube-clone-react/video/${video.id}`}>
                    <img
                      src={
                        video.snippet.thumbnails.medium.url ||
                        video.snippet.thumbnails.standard.url ||
                        video.snippet.thumbnails.standard.url ||
                        video.snippet.thumbnails.default.url
                      }
                      alt={video.snippet.title}
                      className={`mb-2 w-100 ${style.img}`}
                    />
                  </Link>
                  <div className="d-flex">
                    <Avatar
                      className="me-3 mt-1"
                      sx={{ width: 32, height: 32 }}
                    >
                      
                    </Avatar>
                    <div>
                      <Link to={`/youtube-clone-react/video/${video.id}`}>
                        <h2 className="h6 mb-1 fw-bolder">
                          {video.snippet.title}
                        </h2>
                      </Link>
                      <Link
                        to={`/youtube-clone-react/channel/${video.snippet.channelId}`}
                      >
                        <p className={`small ${style.p}`}>
                          {video.snippet.channelTitle}
                        </p>
                      </Link>
                      <Link to={`/youtube-clone-react/video/${video.id}`}>
                        <p className={`small ${style.p}`}>
                          {formatDate(video.snippet.publishedAt)}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
