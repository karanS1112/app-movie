import React, { useEffect, useState } from "react";
import { castPersonDetailsApi } from "../api/movieApiList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCastCrewDetail } from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";
import {
  FaBirthdayCake,
  FaFilm,
  FaStar,
  FaSkullCrossbones,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import Modal from "react-modal";
import { motion } from "framer-motion";

const CastCrewDetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const param = useParams();
  const { id } = param;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.movieSlice.castCrewDetail);
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  useEffect(() => {
    getCastCrewDetails();
    window.scroll(0, 0);
  }, []);

  const getCastCrewDetails = async () => {
    await castPersonDetailsApi(id)
      .then((res) => {
        dispatch(setCastCrewDetail(res.data));
        setTimeout(() => setLoading(false), 1000);
      })
      .catch(console.error);
  };

  const toggleBiography = () => setIsExpanded(!isExpanded);

  const fadeInVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.5, staggerChildren: 0.3 },
    },
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="m-5 containe min-vh-100">
      {loading ? (
        <div className="text-center-loader">
          <MutatingDots
            visible
            height="100"
            width="100"
            color="#fd7e14"
            secondaryColor="#ffc107"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
          />
        </div>
      ) : (
        <motion.div
          className="cast-crew-detail-content d-flex flex-column flex-md-row"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Image Container */}
          <motion.div
            className="image-container  text-md-start mb-3 mb-md-0"
            variants={fadeInVariants}
          >
            <img
              className="profile-image img-fluid rounded"
              src={
                selector.profile_path
                  ? `${imageUri + selector.profile_path}`
                  : "/images/404-img.jpg"
              }
              alt={selector.name}
              title={selector.name}
              onClick={openModal}
            />
          </motion.div>

          {/* Details Container */}
          <motion.div
            className="details-container px-3 px-md-4"
            variants={fadeInLeft}
          >
            <h2 className="text-md-start">
              {selector.name} ({new Date(selector.birthday).getFullYear()})
            </h2>
            <div className="personal-info">
              <h4>Personal Info</h4>
              <p>
                <FaBirthdayCake /> Birthday:{" "}
                {selector.birthday || "Not Available"}
              </p>
              <p>
                {selector.gender === 1 ? <FaFemale /> : <FaMale />} Gender:{" "}
                {selector.gender === 1 ? "Female" : "Male"}
              </p>
              <p>
                <FaFilm /> Known For:{" "}
                {selector.known_for_department || "Not Available"}
              </p>
              <p>
                <FaStar /> Popularity:{" "}
                {selector.popularity?.toFixed(1) || "Not Available"}
              </p>
              <p>
                <FaSkullCrossbones /> Death Date:{" "}
                {selector.deathday || "Not Available"}
              </p>
            </div>
            <div className="biography alert-heading p-2 card cast-crew-detail-card-overview">
              <h4 className="details-container">Biography</h4>
              <p>
                {selector.biography
                  ? isExpanded
                    ? selector.biography
                    : selector.biography.slice(0, 300) + "..."
                  : `No biography available ${selector.name}`}
                {selector.biography && (
                  <span
                    className="read-less-more-wrap"
                    onClick={toggleBiography}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </span>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="image-modal"
        overlayClassName="image-overlay"
      >
        <div className="modal-content">
          <img
            className="modal-image"
            src={
              selector.profile_path
                ? `${imageUri + selector.profile_path}`
                : "http://localhost:5173/images/404-img.jpg"
            }
            alt={selector.name}
          />
          <button className="close-modal-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CastCrewDetail;
