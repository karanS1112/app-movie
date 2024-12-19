import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const HomeCards = ({ movieData, loading, loadMoreMovies }) => {
  // const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const imageUri = "https://media.themoviedb.org/t/p/w220_and_h330_face";
  var settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    centerPadding: 30,
    speed: 500,
    margin: 20,
    afterChange: (current) => {
      if (current === movieData.length - 5) {
        loadMoreMovies();
      }
    },

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
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="container-fluid min-vh-50">
      <div className="slider-container home-card-slider m-2">
        <Slider {...settings}>
          {movieData ? (
            movieData?.map((data, index) => (
              <div key={data.id} className="home-cards-wrap slick-track">
                <div className="card text-white bg-white mb-3 shadow-card-box">
                  <Link
                    style={{ textDecorationColor: "transparent" }}
                    to={`/movie/${data.id}`}
                    title={data.original_title ? data.original_title : "N/A"}
                  >
                    <img
                      src={
                        data.poster_path
                          ? `${imageUri}${data.poster_path}`
                          : "/images/404-img.jpg"
                      }
                      className="card-img-top home-movie-img-size"
                      alt={
                        data.poster_path
                          ? "Movie poster"
                          : "Image not available"
                      }
                    />
                    <div className="card-body">
                      <h6 className="text-truncate text-black text-center">
                        {data.original_title ? data.original_title : "N/A"}
                      </h6>
                      <p className="home-card-description text-black-50 text-center">
                        {data.overview ? data.overview : "N/A"}
                      </p>
                      <div className="home-rating-position">
                        <div className="circular-progress">
                          <svg className="progress-circle" viewBox="0 0 36 36">
                            <path
                              className="circle-bg"
                              d="M18 2.0845
                            a 15.9155 15.9155 0 1 1 0 31.831
                            a 15.9155 15.9155 0 1 1 0 -31.831"
                            />
                            <path
                              className="circle-progress"
                              d="M18 2.0845
                            a 15.9155 15.9155 0 1 1 0 31.831
                            a 15.9155 15.9155 0 1 1 0 -31.831"
                              style={{
                                strokeDasharray: `${
                                  data.vote_average ? data.vote_average * 10 : 0
                                }, 100`,
                              }}
                            />
                          </svg>
                          <div className="progress-percentage">
                            {data.vote_average
                              ? `${(data.vote_average * 10).toFixed(0)}%`
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h6>No data found</h6>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default HomeCards;
