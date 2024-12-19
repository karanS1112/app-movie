import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { castCrewMovie } from "../api/movieApiList";
import { setCastCrew } from "../store/reducer/movieReducer";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchCastCrewData } from "../commonFunction/movieApiFunction";
import { MutatingDots } from "react-loader-spinner";

function CastCrewSlickSlider() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.id;
  const castCrewData = useSelector((state) => state.movieSlice.castCrew);
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCastCrewData(castCrewMovie, setCastCrew, dispatch, id, setLoading);
  }, [id]);

  const handleViewMoreClick = () => {
    navigate(`/movie/cast-crew/${id}`);
  };

  const displayedCastData = castCrewData?.cast
    ? [...castCrewData.cast.slice(0, 8), { id: "view-more" }]
    : [];

  var castCrewSettings = {
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
    <div className="container cast-slick">
      <div className="mt-4">
        <h4>Cast & Crew</h4>
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
          <Slider {...castCrewSettings}>
            {displayedCastData.length > 0 ? (
              displayedCastData.map((castData, index) =>
                castData.id === "view-more" ? (
                  <div
                    key="view-more"
                    className="view-more-button"
                    onClick={handleViewMoreClick}
                  >
                    <h5>View More</h5>
                  </div>
                ) : (
                  <div
                    key={castData.id}
                    className="home-cards-wrap slick-track"
                  >
                    <div className="card text-white bg-white mb-3 shadow-card-box ">
                      <img
                        src={
                          castData.profile_path
                            ? `${imageUri}${castData.profile_path}`
                            : "/images/404-img.jpg"
                        }
                        className="card-img-top home-movie-img-size"
                        alt={
                          castData.profile_path
                            ? "Movie poster"
                            : "Image not available"
                        }
                      />
                      <div className="card-body">
                        <Link
                          style={{ textDecorationColor: "transparent" }}
                          to={`/movie/cast-crew-detail/${castData.id}`}
                          title={castData.name ? castData.name : "N/A"}
                        >
                          <h6 className="text-truncate text-black text-center">
                            {castData.name ? castData.name : "N/A"}
                          </h6>
                          <p className="home-card-description text-truncate text-black-50 text-center">
                            {castData.character ? castData.character : "N/A"}
                          </p>
                        </Link>
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
    </div>
  );
}

export default CastCrewSlickSlider;
