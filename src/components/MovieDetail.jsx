import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { castCrewMovie, dataMovie } from "../api/movieApiList";
import { setCastCrew, setMovieDetail } from "../store/reducer/movieReducer";
import { useDispatch, useSelector } from "react-redux";
import { FiWatch } from "react-icons/fi";
import { TfiMoney } from "react-icons/tfi";
import { LuCalendarDays } from "react-icons/lu";
import { BiSolidCameraMovie } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { MutatingDots } from "react-loader-spinner";
import Slider from "react-slick";
import CastCrewSlickSlider from "./CastCrewSlickSlider";
const MovieDetail = () => {
  const param = useParams();
  const [loading, setLoading] = useState(true);
  const id = param.id;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const item = selector.movieSlice.movieDetail;
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const orginalImgPoster = "https://image.tmdb.org/t/p/original/";
  const backgroundImage = orginalImgPoster + item.poster_path;

  const runtimeInMinutes = item.runtime;
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  const formattedRuntime = `${hours}h ${minutes}m`;

  const budget = (Math.abs(Number(item.budget)) / 1.0e6).toFixed(1) + " M";
  const revenue = (Math.abs(Number(item.revenue)) / 1.0e6).toFixed(1) + " M";

  const release_date = new Date(item.release_date);
  var year = release_date.getFullYear();
  var month = release_date.getMonth();
  var date = release_date.getDate();
  const release = date + "/" + month + "/" + year;
  // const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const movieDetailStyle = {
    backgroundImage: `linear-gradient(rgba(0 0 0 / 79%), rgba(157, 18, 151, 0.2)), url("${backgroundImage}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    await dataMovie(id)
      .then((res) => {
        const movieDetailResponse = res.data;
        dispatch(setMovieDetail(movieDetailResponse));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fluid-container min-vh-100">
      {loading ? (
        <div className="container">
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
        <div className="movieDetail" style={movieDetailStyle}>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="card shadow-card-box detail-card-poster  m-4">
                  <img
                    src={
                      selector.movieSlice.movieDetail.backdrop_path
                        ? `${imageUri}${item.backdrop_path}`
                        : "http://localhost:5173/images/404-img.jpg"
                    }
                    className="card-img-top detail-movie-img-size"
                    alt={
                      item.backdrop_path
                        ? "Movie poster"
                        : "Image not available"
                    }
                  />
                </div>
              </div>
              <div className="col-md-9">
                <h1 className="pt-3">
                  {item.title ? `${item.title} (${year})` : "N/A"}
                </h1>
                {item.genres?.length > 0 ? (
                  <p>
                    {item.genres
                      .map((data) => (data.name ? data.name : "N/A"))
                      .join(", ")}{" "}
                    ({item.tagline ? item.tagline : "N/A"})
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                <div className="row">
                  <div className="col-auto detail-icon-color">
                    <FiWatch size={20} />
                  </div>
                  <div className="col p-0 pt-1">
                    <h6>
                      {" "}
                      {formattedRuntime ? formattedRuntime : "N/A"} (
                      {item?.runtime ? `${item.runtime} Minutes` : "N/A"})
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto detail-icon-color">
                    <TfiMoney size={20} />
                  </div>
                  <div className="col p-0 pt-1">
                    <h6>{budget ? budget : "N/A"} (Budget)</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto detail-icon-color">
                    <GiMoneyStack size={20} />
                  </div>
                  <div className="col p-0 pt-1">
                    <h6>{revenue ? revenue : "N/A"} (Revenue)</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto detail-icon-color">
                    <LuCalendarDays size={20} />
                  </div>
                  <div className="col-1 p-0 pt-1">
                    <h6>{release} </h6>
                  </div>
                  <div className="col pt-1">
                    {" "}
                    {item.genres?.length > 0 ? (
                      <h6 className="ps-3">
                        ({item.origin_country.map((data) => data).join(", ")}){" "}
                      </h6>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto detail-icon-color">
                    <BiSolidCameraMovie />
                  </div>
                  <div className="col p-0 pt-1">
                    <h6>{item.status}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto detail-icon-color">
                    <FaRegStar />
                  </div>
                  <div className="col p-0 pt-1">
                    <h6>
                      {item?.vote_average
                        ? item.vote_average.toFixed(1)
                        : "N/A"}
                    </h6>
                  </div>
                </div>
                <div className="card p-0 m-4 detail-card-overview">
                  <div className="card-body">
                    <h3 className="text-white text-truncate"> Overview</h3>
                    <p className="text-white">{item.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <CastCrewSlickSlider />
    </div>
  );
};

export default MovieDetail;
