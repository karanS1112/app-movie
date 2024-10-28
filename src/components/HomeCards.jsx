import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  NowPlayingMovieDataApi,
  topRatedMovieDataApi,
} from "../api/movieApiList";
import { Link } from "react-router-dom";
const HomeCards = ({ movieData }) => {
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  console.log("data Home cards movieData   ", movieData);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 2,
    slidesToShow: 4,
    arrows: true,
  };
  return (
    <div className="container-fluid">
    <div className="slider-container home-card-slider">
      <Slider {...settings}>
        {movieData?.map((data, index) => (
          <Link style={{textDecorationColor: "transparent"}} to={`/movie/${data.id}`}>
            <div key={data.id} className="home-cards-wrap">
              <div
                className="card text-white bg-black mb-3 p-1"
                style={{ width: "18rem" }}
              >
                <img
                  src={imageUri + data.poster_path}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{data.original_title}</h5>
                  <p className="card-text">{data.overview}</p>
                  <h5> Rating {data.vote_average}</h5>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default HomeCards;
