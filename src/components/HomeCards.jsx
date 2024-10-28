import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NowPlayingMovieDataApi, topRatedMovieDataApi } from "../api/movieApiList";
const HomeCards = ({movieData}) => {

console.log("data Home cards movieData   ",movieData)
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
  };
  return (
    <div className="slider-container home-card-slider">
      <Slider {...settings}>
        {movieData.map((data, index) => (
          <div key={data.id} className="home-cards-wrap">
            <div
              className="card text-white bg-black mb-3 p-1"
              style={{ width: "18rem" }}
            >
              <img src={data.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{data.original_title}</h5>
                <p className="card-text">{data.overview}</p>
                <h5> Rating {data.vote_average}</h5>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCards;
