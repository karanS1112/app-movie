import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
const HomeCards = ({ movieData, loading }) => {
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  var settings = {
    // className: "center",
    // centerMode: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerPadding: 30,
    slidesToShow: 5,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container-fluid">
      <div className="slider-container home-card-slider">
        <Slider {...settings}>
          {movieData?.map((data, index) => (
            <div key={data.id} className="home-cards-wrap">
              <div
                className="card text-white bg-white mb-3"
                // style={{ width: "17rem" }}
              >
                <img
                  src={imageUri + data.poster_path}
                  className="card-img-top home-movie-img-size"
                  alt="..."
                />
                <div className="card-body">
                  <Link
                    style={{ textDecorationColor: "transparent" }}
                    to={`/movie/${data.id}`}
                  >
                    <h5 className="home-card-title">{data.original_title}</h5>
                    <p className="home-card-description">{data.overview}</p>
                  </Link>
                  <div className="home-rating-position">
                    <span className="home-movie-rating">
                      {data.vote_average.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeCards;
