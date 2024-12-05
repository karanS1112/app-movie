import React, { useEffect, useState } from "react";
import { fetchCastCrewData } from "../commonFunction/movieApiFunction";
import { castCrewMovie } from "../api/movieApiList";
import { setCastCrew } from "../store/reducer/movieReducer";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MutatingDots } from "react-loader-spinner";

function CastCrewList() {
  const param = useParams();
  const id = param.id;

  const castCrewList = useSelector((state) => state.movieSlice.castCrew || {});
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCastCrewData(castCrewMovie, setCastCrew, dispatch, id, setLoading);
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const itemContainerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container min-vh-100">
      {loading ? (
        <div className="justify-content-center">
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
          <div className="col-md-6 mt-3">
            <h4>Cast</h4>
            {castCrewList?.cast?.length > 0 ? (
              castCrewList.cast.map((item, index) => (
                <Link
                  style={{ textDecorationColor: "transparent" }}
                  to={`/movie/cast-crew-detail/${item.id}`}
                  title={item.name}
                >
                  <motion.div
                    className="d-flex align-items-center mb-3"
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemContainerVariants}
                  >
                    <motion.img
                      src={
                        item.profile_path
                          ? `${imageUri}${item.profile_path}`
                          : "/images/404-img.jpg"
                      }
                      alt={item.name}
                      className="rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variants={imageVariants}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div className="ms-3">
                      <motion.h5
                        className="mb-1 text-white"
                        variants={textVariants}
                        transition={{ duration: 1.9 }}
                      >
                        {item.name}
                      </motion.h5>
                      <motion.p
                        className="mb-0 text-muted text-white-50"
                        variants={textVariants}
                        transition={{ duration: 2.9, delay: 1.6 }}
                      >
                        {item.character || "N/A"}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <h5>No Cast</h5>
            )}
          </div>

          <div className="col-md-6 mt-3">
            <h4>Crew</h4>
            {castCrewList?.crew?.length > 0 ? (
              castCrewList.crew.map((item, index) => (
                <Link
                  style={{ textDecorationColor: "transparent" }}
                  to={`/movie/cast-crew-detail/${item.id}`}
                  title={item.name}
                >
                  <motion.div
                    className="d-flex align-items-center mb-3"
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemContainerVariants}
                  >
                    <motion.img
                      src={
                        item.profile_path
                          ? `${imageUri}${item.profile_path}`
                          : "/images/404-img.jpg"
                      }
                      alt={item.name}
                      className="rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variants={imageVariants}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div className="ms-3">
                      <motion.h5
                        className="mb-1 text-white"
                        variants={textVariants}
                        transition={{ duration: 1.9 }}
                      >
                        {item.name}
                      </motion.h5>
                      <motion.p
                        className="mb-0 text-muted text-white-50"
                        variants={textVariants}
                        transition={{ duration: 2.9, delay: 1.6 }}
                      >
                        {item.job || "N/A"}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <h5>No Crew</h5>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CastCrewList;
