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
  console.log(displayedVideoData);
  useEffect(() => {
    fetchVideoData(videoTrailer, setVideoData, dispatch, id, setLoading);
  }, []);
  // console.log(displayedVideoData);
  const handleViewMoreClick = () => {
    // navigate(`/movie/cast-crew/${id}`);
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
                    className="video-view-more-button"
                    // onClick={handleViewMoreClick}
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
                              ? `https://img.youtube.com/vi/${videoData.key}/0.jpg`
                              : "http://localhost:5173/images/404-img.jpg"
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
        className="image-modal"
        overlayClassName="image-overlay"
        appElement={document.getElementById("root")}
      >
        <div className="modal-content">
          <button className="close-modal-btn" onClick={closeModal}>
            Close
          </button>
          {selectedVideoKey && (
            <iframe
              width="100%"
              height="215px"
              src={`https://www.youtube.com/embed/${selectedVideoKey}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            ></iframe>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default VideoSlickSlider;
