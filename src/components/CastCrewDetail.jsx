import React, { useEffect, useState } from "react";
import { castPersonDetailsApi } from "../api/movieApiList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCastCrewDetail } from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";
import {
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleFill,
  RiArrowRightDoubleLine,
} from "react-icons/ri";
import {
  FaBirthdayCake,
  FaBriefcase,
  FaCalendarAlt,
  FaChild,
  FaFilm,
  FaFlag,
  FaHeart,
  FaMapMarkerAlt,
  FaSkullCrossbones,
  FaStar,
} from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
function CastCrewDetail() {
  useEffect(() => {
    getCastCrewDetails();
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const param = useParams();
  const { id } = param;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const selector = useSelector((state) => state.movieSlice.castCrewDetail);
  const release_date = new Date(selector.birthday);
  var year = release_date.getFullYear();

  const truncatedBiography = selector?.biography
    ? selector.biography.slice(0, 450)
    : `No biography available ${selector.name}`;

  const fullBiography = selector?.biography || "No biography available";
  const toggleBiography = () => setIsExpanded(!isExpanded);
  const getCastCrewDetails = async () => {
    await castPersonDetailsApi(id)
      .then((res) => {
        const DetailResponse = res.data;
        console.log(DetailResponse, "DetailResponse");

        dispatch(setCastCrewDetail(DetailResponse));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" container min-vh-100">
      {loading ? (
        <div className="container text-center ">
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
        <div className="row cast-crew-detail-card m-4 ">
          <div className="col-md-4">
            <div className="card rounded-top-5">
              <img
                className="mb-2 mt-2 rounded-top-5"
                src={
                  selector.profile_path
                    ? `${imageUri + selector.profile_path}`
                    : "http://localhost:5173/images/404-img.jpg"
                }
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="cast-crew-heading">
              <h2 className="text-white">{selector.name} ({year})</h2>
              <div className="row">
                <div className="col-md-12">
                  <h5><u>Personal Info:</u></h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="info-box">
                    <div className="row">
                      <h6> Birthday</h6>
                      <div className="col-auto detail-icon-color">
                        <FaBirthdayCake size={20} />
                      </div>
                      <div className="col p-0 ">
                        <p>
                          {selector.birthday
                            ? new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(selector.birthday))
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <div className="row">
                      <h6> Gender</h6>
                      {selector.gender == 1 ? (
                        <>
                          <div className="col-auto">
                            <FaFemale size={20} className="detail-icon-color" />
                          </div>
                          <div className="col p-0 ">
                            <p>Female</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-auto">
                            <FaMale size={20} className="detail-icon-color" />
                          </div>
                          <div className="col p-0 ">
                            <p>Male</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <div className="row">
                      <h6> Known for</h6>
                      <div className="col-auto detail-icon-color">
                        <FaFilm size={20} />
                      </div>
                      <div className="col p-0 ">
                        <p>
                          {selector.known_for_department
                            ? selector.known_for_department
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="info-box">
                    <div className="row">
                      <h6> Popularity</h6>
                      <div className="col-auto detail-icon-color">
                        <FaStar size={20} />
                      </div>
                      <div className="col p-0 ">
                        <p>
                          {selector.popularity ? selector.popularity : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="info-box">
                    <div className="row">
                      <h6> Death date</h6>
                      <div className="col-auto detail-icon-color">
                        <FaSkullCrossbones size={20} />
                      </div>
                      <div className="col p-0 ">
                        <p>
                          {selector.death_date ? selector.death_date : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h6> Biography </h6>
              <p className="text-white">
                {isExpanded ? fullBiography : truncatedBiography}
                {selector?.biography?.length > 150 && (
                  <button
                    onClick={toggleBiography}
                    className="btn btn-link text-warning p-0"
                  >
                    {isExpanded ? (
                      <div className="m-md-2 pb-1">
                        Read Less
                        <RiArrowLeftDoubleFill className="ms-1" />
                      </div>
                    ) : (
                      <div className="m-md-2 pb-1">
                        Read More
                        <RiArrowRightDoubleFill className="ms-1" />
                      </div>
                    )}
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CastCrewDetail;
