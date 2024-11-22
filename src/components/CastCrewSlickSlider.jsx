import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { castCrewMovie } from "../api/movieApiList";
import { setCastCrew } from "../store/reducer/movieReducer";
import { useParams } from "react-router-dom";

function CastCrewSlickSlider() {
    const param = useParams();
    const id = param.id;
  const castCrewData = useSelector((state) => state.movieSlice.castCrew);
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  useEffect(() => {
    console.log("first")
    getCastCrewData();
  }, []);
  const dispatch = useDispatch();
  const getCastCrewData = async () => {
    await castCrewMovie(id)
      .then((res) => {
        const castCrewResponse = res.data;
        dispatch(setCastCrew(castCrewResponse));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var settings = {
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerPadding: 30,
    speed: 500,
    margin: 20,
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
        {castCrewData?.cast?.length > 0 && castCrewData?.cast?.length > 12 ? (
          castCrewData.cast.map((castData) => (
            <div key={castData.id} className="card mb-2">
              <img
                src={
                  castData.profile_path
                    ? `${imageUri}${castData.profile_path}`
                    : "./images/404-img.jpg"
                }
                className="card-img-top movie-cast-crew-img-size"
                alt={
                  castData.poster_path ? "Movie poster" : "Image not available"
                }
              />
              <div className="card-body">
                <h5 className="text-truncate text-black">{castData.name}</h5>
                <p className="text-truncate text-black-50">
                  {castData.character}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </Slider>
    </div>
  );
}

export default CastCrewSlickSlider;
