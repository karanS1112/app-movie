import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { videoTrailer } from "../api/movieApiList";
import { setVideoData } from "../store/reducer/movieReducer";
import { fetchVideoData } from "../commonFunction/movieApiFunction";
import { MutatingDots } from "react-loader-spinner";
import Slider from "react-slick";

function VideoSlickSlider() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.id;
  const videoData = useSelector((state) => state.movieSlice.videoData);
  const thumbImgUri = "";
  // const videoThumbImage = `https://img.youtube.com/vi/${item.key}/0.jpg`;
  const video = `https://www.youtube.com/watch?v=`;
  // const video = 'https://www.youtube.com/watch?key='
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const displayedVideoData = videoData?.results
    ? [...videoData.results.slice(0, 6), { id: "view-more" }]
    : [];

  useEffect(() => {
    fetchVideoData(videoTrailer, setVideoData, dispatch, id, setLoading);
  }, []);
  // console.log(displayedVideoData);
  const handleViewMoreClick = () => {
    // navigate(`/movie/cast-crew/${id}`);
  };

  var videoSettings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    padding: 20,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      <div className="mt-4">
        <h4>Video's</h4>
        {loading ? (
          <div className="justify-content-center min-vh-100">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#fd7e14"
              secondaryColor="#ffc107"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass="text-center-loader"
            />
          </div>
        ) : (
          <Slider {...videoSettings}>
            {displayedVideoData.length > 0 ? (
              displayedVideoData.map((videoData, index) =>
                // console.log(videoData.key)
                videoData.id === "view-more" ? (
                  <div
                    key="view-more"
                    className="view-more-button"
                    // onClick={handleViewMoreClick}
                  >
                    <h5>View More</h5>
                  </div>
                ) : (
                  <div
                    key={videoData.id}
                    className="home-cards-wrap slick-track"
                  >
                    <div className="card text-white bg-white mb-3 shadow-card-box ">
                      <video
                        controls
                        width="100%"
                        height="auto"
                        className="video-player"
                        // onError={(e) =>
                        //   console.error("Error loading video:", e)
                        // }
                        // onLoadedData={() =>
                        //   console.log("Video loaded successfully")
                        // }
                      >
                        <source src={`https://www.youtube.com/watch?v=RGhTO0ihiLo.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="card mb-2 no-data-card">
                <p>No Data Found</p>
              </div>
            )}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default VideoSlickSlider;
