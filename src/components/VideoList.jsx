import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { videoTrailer } from "../api/movieApiList";
import { setVideoData } from "../store/reducer/movieReducer";
import { fetchVideoData } from "../commonFunction/movieApiFunction";
import { MutatingDots } from "react-loader-spinner";
import { FaPlayCircle } from "react-icons/fa";

function VideoList() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.id;
  const videoData = useSelector((state) => state.movieSlice.videoData.results);
  console.log(videoData, "video");
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
          <div className="col-md-6">
            <h5 className="text-center">Teaser</h5>
            {videoData.some((item) => item.type === "Teaser") ? (
              videoData
                .filter((item) => item.type === "Teaser")
                .map((item) => (
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
                ))
            ) : (
              <div className="text-center">
                <h6>No Teaser Available</h6>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <h5 className="text-center">Trailer</h5>
            {videoData.some((item) => item.type === "Trailer") ? (
              videoData
                .filter((item) => item.type === "Trailer")
                .map((item) => (
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
                ))
            ) : (
              <div className="text-center">
                <h6>No Trailer Available</h6>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal
        isOpen={selectedVideoKey !== null && isModalOpen}
        onRequestClose={closeModal}
        className="image-modal"
        overlayClassName="image-overlay"
        appElement={document.getElementById("root")}
      >
        <div className="modal-content">
          {/* <button className="close-modal-btn" onClick={closeModal}>
            Close
          </button> */}
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

export default VideoList;
