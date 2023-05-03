import React from "react";
import style from "./Channel.module.css";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
export default function Channel() {
  const { id: pramsId } = useParams();

  function calc(x) {
    if (x >= 1000000) {
      return (x = `${x / 1000000}M subscribers`);
    } else if (x >= 1000) {
      return (x = `${x / 100}K subscribers`);
    } else {
      return (x = `${x} subscribers`);
    }
  }

  let { details: detailsPlayList } = useAxios(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${pramsId}&maxResults=100&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
  );

  let { details: detailsChannel } = useAxios(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,contentDetails,statistics&id=${pramsId}&key=AIzaSyDxLg0QxECeZGluy1-7kaocA1m4Sm3RoTI`
  );

  return (
    <>
      {detailsChannel?.items?.map((item, i) => (
        <div key={i} className={style.right}>
          <div className={style.channelBanner}>
            {item.brandingSettings.image.bannerExternalUrl && (
              <img
                className="w-100"
                src={item.brandingSettings.image.bannerExternalUrl}
                alt=".."
              />
            )}
          </div>
          <div className="container">
            <div className={style.channelInfo}>
              <div className={style.card}>
                <div className={style.container}>
                  <div className={style.leftCard}>
                    <div className={`${style.img} me-3`}>
                      <img
                        className={style.smallImg}
                        src={
                          item.snippet.thumbnails.high.url ||
                          item.snippet.thumbnails.default.url ||
                          item.snippet.thumbnails.medium.url
                        }
                        alt=".."
                      />
                    </div>
                    <div className={style.text}>
                      <h3>{item.snippet.title}</h3>
                      <div className="d-flex">
                        <p className="small me-2 fw-bold">
                          {item.snippet.customUrl}
                        </p>
                        <p className="small me-2">
                          {calc(item.statistics.subscriberCount)}
                        </p>
                        <p className="small">
                          {item.statistics.videoCount} videos
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={style.rightCard}>
                    <button className="btn btn-dark my-3">subscribe</button>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className={style.links}>
                  <Swiper
                    navigation={true}
                    freeMode={true}
                    loop={false}
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
                        slidesPerView: 4,
                        spaceBetween: 2,
                      },
                      767: {
                        slidesPerView: 5,
                        spaceBetween: 2,
                      },
                      1250: {
                        slidesPerView: 7,
                        spaceBetween: 2,
                      },
                    }}
                  >
                    <SwiperSlide className={style.swiperSlide}>
                      Home
                    </SwiperSlide>
                    <SwiperSlide className={style.swiperSlide}>
                      Videos
                    </SwiperSlide>
                    <SwiperSlide className={style.swiperSlide}>
                      Live
                    </SwiperSlide>
                    <SwiperSlide className={style.swiperSlide}>
                      Playlists
                    </SwiperSlide>
                    <SwiperSlide className={style.swiperSlide}>
                      Community
                    </SwiperSlide>
                    <SwiperSlide className={style.swiperSlide}>
                      Channels
                    </SwiperSlide>
                    <SwiperSlide className={style.swiperSlide}>
                      About
                    </SwiperSlide>
                    <SwiperSlide className={style.swiperSlide}>
                      <SearchIcon />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>

              <div className={style.allPlatLists}>
                <div
                  className={`container-md container-fluid ${style.containerx}`}
                >
                  <div className={`row g-3 py-3 ${style.row}`}>
                    {detailsPlayList?.items?.map((item, i) => (
                      <div
                        key={i}
                        className={`${style.allCard} col-sm-6 col-md-6 col-lg-4 col-xl-3`}
                      >
                        <Link
                          to={`/youtube-clone-react/playListVideos/${item.id}`}
                        >
                          <div className={style.card}>
                            <div className={style.imgX}>
                              <img
                                className={style.img}
                                src={item.snippet.thumbnails.medium.url}
                                alt=".."
                              />
                              <div className={style.imgXAll}>
                                <PlayArrowOutlinedIcon className={style.i} />
                                <p className={style.p}>PLAY ALL</p>
                              </div>
                              <div className={style.imgXright}>
                                <p className={style.p}>
                                  {item.contentDetails.itemCount}
                                </p>
                                <PlaylistPlayOutlinedIcon className={style.i} />
                              </div>
                            </div>
                            <div className={style.cardBody}>
                              <h5 className={`${style.h5} fw-bold small mb-1`}>
                                {item.snippet.title}
                              </h5>
                              <p className={`${style.a} small`}>
                                View full playlist
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
