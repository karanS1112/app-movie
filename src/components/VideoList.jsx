import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { videoTrailer } from "../api/movieApiList";
import { setVideoData } from "../store/reducer/movieReducer";
import { fetchVideoData } from "../commonFunction/movieApiFunction";
import { MutatingDots } from "react-loader-spinner";
import { FaPlayCircle } from "react-icons/fa";
import Modal from "react-modal";
import ReactPlayer from "react-player";
function VideoList() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.id;
  const videoData = useSelector((state) => state.movieSlice.videoData.results);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState(null);

  const openModal = (key) => {
    setSelectedVideoKey(key);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    fetchVideoData(videoTrailer, setVideoData, dispatch, id, setLoading);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container min-vh-100">
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
        <div className="row">
          <h5 className="mt-3 ">Trailer</h5>
          {videoData.some((item) => item.type == "Trailer") ? (
            videoData
              .filter((item) => item.type == "Trailer")
              .map((item) => (
                <div className="col-md-3 ">
                  <div
                    key={item.key}
                    className="image-wrapper"
                    onClick={() => openModal(item.key)}
                  >
                    <img
                      src={
                        item.key
                          ? `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`
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
              ))
          ) : (
            <div className="text-center mb-5">
              <h6>No Trailer Available</h6>
            </div>
          )}
          <h5 className="">Teaser</h5>
          {videoData.some((item) => item.type == "Teaser") ? (
            videoData
              .filter((item) => item.type == "Teaser")
              .map((item) => (
                <div className="col-md-3 ">
                  <div
                    key={item.id}
                    className="image-wrapper"
                    onClick={() => openModal(item.key)}
                  >
                    <img
                      src={
                        item.key
                          ? `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`
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
              ))
          ) : (
            <div className="text-center mb-5">
              <h6>No Teaser Available</h6>
            </div>
          )}
          <h5 className="mt-3 mb-0">Featurettes</h5>
          {videoData.some((item) => item.type == "Featurette") ? (
            videoData
              .filter((item) => item.type == "Featurette")
              .map((item) => (
                <div className="col-md-3 ">
                  <div
                    key={item.id}
                    className="image-wrapper"
                    onClick={() => openModal(item.key)}
                  >
                    <img
                      src={
                        item.key
                          ? `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`
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
              ))
          ) : (
            <div className="text-center mb-5">
              <h6>No Featurette Available</h6>
            </div>
          )}

          <h5 className="mt-3 mb-0">Behind the Scenes</h5>
          {videoData.some((item) => item.type == "Behind the Scenes") ? (
            videoData
              .filter((item) => item.type == "Behind the Scenes")
              .map((item) => (
                <div className="col-md-3">
                  <div
                    key={item.id}
                    className="image-wrapper"
                    onClick={() => openModal(item.key)}
                  >
                    <img
                      src={
                        item.key
                          ? `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`
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
              ))
          ) : (
            <div className="text-center mb-5">
              <h6>No Behind the Scenes Available</h6>
            </div>
          )}
          <h5 className="mt-3 mb-0">Clips</h5>
          {videoData.some((item) => item.type == "Clip") ? (
            videoData
              .filter((item) => item.type == "Clip")
              .map((item) => (
                <div className="col-md-3 ">
                  <div
                    key={item.key}
                    className="image-wrapper"
                    onClick={() => openModal(item.key)}
                  >
                    <img
                      src={
                        item.key
                          ? `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`
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
              ))
          ) : (
            <div className="text-center mb-5">
              <h6>No Clip Available</h6>
            </div>
          )}
        </div>
      )}
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

export default VideoList;
