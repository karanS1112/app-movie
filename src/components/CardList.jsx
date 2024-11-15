import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../commonFunction/movieApiFunction";
import {
  NowPlayingMovieDataApi,
  topRatedMovieDataApi,
  upcomingMovieDataApi,
} from "../api/movieApiList";
import {
  setNowPlaying,
  setTopRated,
  setUpcoming,
} from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";

const CardList = ({ category }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const titleCategory = category;
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  useEffect(() => {
    fetchMovieData(NowPlayingMovieDataApi, dispatch, setNowPlaying, setLoading);
    fetchMovieData(upcomingMovieDataApi, dispatch, setUpcoming, setLoading);
    fetchMovieData(topRatedMovieDataApi, dispatch, setTopRated, setLoading);
  }, []);
  const titleData = [
    {
      title: "Now Playing",
      data: selector?.movieSlice?.nowPlaying,
    },
    {
      title: "Up Comming",
      data: selector?.movieSlice?.upcoming,
    },
    {
      title: "Top Rated",
      data: selector?.movieSlice?.topRated,
    },
  ];
  // console.log(titleData,"titledata");

  return (
    <div className="container min-vh-100 p-0 mt-4 mb-4">
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
        <>
          <div className="row">
            {titleData.map((category, categoryIndex) =>
              category.title == titleCategory
                ? category.data.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="col-sm-3 p-2">
                      <div className="card">
                        <div className="card-body">
                          <img
                            src={
                              result.poster_path
                                ? `${imageUri}${result.poster_path}`
                                : "./images/404-img.jpg"
                            }
                            className="card-img-top home-movie-img-size"
                            alt={
                              result.poster_path
                                ? "Movie poster"
                                : "Image not available"
                            }
                          />
                          <h6 className="card-title">{result.title}</h6>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item"></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                : null
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
