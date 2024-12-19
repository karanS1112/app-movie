import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { videoTrailer } from "../api/movieApiList";
import { setVideoData } from "../store/reducer/movieReducer";
import { fetchVideoData } from "../commonFunction/movieApiFunction";
import { MutatingDots } from "react-loader-spinner";
import Slider from "react-slick";
import { FaPlayCircle } from "react-icons/fa";
import Modal from "react-modal";
import ReactPlayer from "react-player";

function VideoSlickSlider() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.id;
  const videoData = useSelector((state) => state.movieSlice.videoData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const displayedVideoData = videoData?.results
  ? [
      ...videoData.results
        .filter(
          (video) =>
            video.type?.toLowerCase() === "trailer" ||
            video.type?.toLowerCase() === "teaser"
        )
        .slice(0, 6), 
      { id: "view-more" }, ]
  : [];


  useEffect(() => {
    fetchVideoData(videoTrailer, setVideoData, dispatch, id, setLoading);
  }, [id]);
  // this is id  passed  bcz of search

  const handleViewMoreClick = () => {
    navigate(`/movie/video-list/${id}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState(null);

  const openModal = (key) => {
    setSelectedVideoKey(key);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

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
    <div className="container video-slick">
      <div className="mt-4">
        <h4>Teaser & Trailer</h4>
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
                videoData.id === "view-more" ? (
                  <div
                    key="view-more"
                    className="video-view-more-button"
                    onClick={handleViewMoreClick}
                  >
                    <h5>View More</h5>
                  </div>
                ) : (
                  <div
                    key={videoData.id}
                    className="home-cards-wrap slick-track"
                  >
                    <div className="card text-white bg-white mb-3 shadow-card-box">
                      <div
                        className="image-wrapper"
                        onClick={() => openModal(videoData.key)}
                      >
                        <img
                          src={
                            videoData.key
                              ? `https://img.youtube.com/vi/${videoData.key}/hqdefault.jpg`
                              : "/images/404-img.jpg"
                          }
                          alt="Video Thumbnail"
                          className="video-thumbnail"
                        />
                        <div className="play-button-overlay">
                          <FaPlayCircle />
                        </div>
                      </div>
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
      <Modal
      isOpen={selectedVideoKey !== null && isModalOpen}
      onRequestClose={closeModal}
      className="video-modal"
      overlayClassName="video-overlay"
      appElement={document.getElementById("root")}
    >
      <div className="modal-content">
        {selectedVideoKey && (
          <div className="player-wrapper">
            <ReactPlayer
              playing
              controls
              width="100%"
              height="100%"
              className="react-player"
              url={`https://www.youtube.com/embed/${selectedVideoKey}?autoplay=1`}
            />
          </div>
        )}
      </div>
    </Modal>
    </div>
  );
}

export default VideoSlickSlider;
