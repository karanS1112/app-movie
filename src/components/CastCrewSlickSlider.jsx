import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { castCrewMovie } from "../api/movieApiList";
import { setCastCrew } from "../store/reducer/movieReducer";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCastCrewData } from "../commonFunction/movieApiFunction";

function CastCrewSlickSlider() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.id;
  const castCrewData = useSelector((state) => state.movieSlice.castCrew);
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCastCrewData(castCrewMovie, setCastCrew, dispatch, id);
  }, []);

  const handleViewMoreClick = () => {
    navigate(`/movie/cast-crew/${id}`);
  };

  const displayedCastData = castCrewData?.cast
    ? [...castCrewData.cast.slice(0, 14), { id: "view-more" }]
    : [];

  var settings = {
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 1,
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
    <div className="container mt-3 mb-2">
      <h4>Cast & Crew</h4>
      <Slider {...settings}>
        {displayedCastData?.length > 0 ? (
          displayedCastData.map((castData) =>
            castData.id === "view-more" ? (
              <div
                key="view-more"
                className="card mb-2 view-more-card"
                onClick={handleViewMoreClick}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <div className="card-body">
                  <h5 className="text-black">View More</h5>
                </div>
              </div>
            ) : (
              <div key={castData.id} className="card mb-2">
                <img
                  src={
                    castData.profile_path
                      ? `${imageUri}${castData.profile_path}`
                      : "http://localhost:5173/images/404-img.jpg"
                  }
                  className="card-img-top movie-cast-crew-img-size"
                  alt={
                    castData.poster_path
                      ? "Movie poster"
                      : "Image not available"
                  }
                />
                <div className="card-body">
                  <h5 className="text-truncate text-black">{castData.name}</h5>
                  <p className="text-truncate text-black-50">
                    {castData.character}
                  </p>
                </div>
              </div>
            )
          )
        ) : (
          <div className="card mb-2">
            <p> No Data Found </p>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default CastCrewSlickSlider;
