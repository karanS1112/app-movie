import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../commonFunction/movieApiFunction";
import {
  NowPlayingMovieDataApi,
  popularMovieDataApi,
  topRatedMovieDataApi,
  upcomingMovieDataApi,
} from "../api/movieApiList";
import {
  setNowPlaying,
  setTopRated,
  setUpcoming,
  setPopular,
  setResetState,
} from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReducerType } from "@reduxjs/toolkit";

const CardList = ({ category }) => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const titleCategory = category;

  // const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const imageUri ="https://media.themoviedb.org/t/p/w220_and_h330_face/"

  useEffect(() => {
    if (pathname === "/movie/now-playing") {
      fetchMovieData(
        NowPlayingMovieDataApi,
        dispatch,
        setNowPlaying,
        setLoading,
        currentPage,
        setTotalPage,
        selector?.movieSlice?.nowPlaying.results
      );
    }
    if (pathname === "/movie/up-coming") {
      fetchMovieData(
        upcomingMovieDataApi,
        dispatch,
        setUpcoming,
        setLoading,
        currentPage,
        setTotalPage,
        selector?.movieSlice?.upcoming.results
      );
    }
    if (pathname === "/movie/top-rated") {
      fetchMovieData(
        topRatedMovieDataApi,
        dispatch,
        setTopRated,
        setLoading,
        currentPage,
        setTotalPage,
        selector?.movieSlice?.topRated.results
      );
    }
    if (pathname === "/movie/popular") {
      fetchMovieData(
        popularMovieDataApi,
        dispatch,
        setPopular,
        setLoading,
        currentPage,
        setTotalPage,
        selector?.movieSlice?.popular.results
      );
    }
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setResetState());
  }, [pathname]);

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
    {
      title: "Popular",
      data: selector?.movieSlice?.popular,
    },
  ];
  const loadMoreMovies = () => {
    if (currentPage != totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const matchingCategory = titleData?.find(
    (category) => category.title === titleCategory
  );

  return (
    <div className="container min-vh-100">
      {loading ? (
        <div className="container min-vh-50 ">
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
        <InfiniteScroll
          dataLength={matchingCategory?.data?.results?.length || 0}
          next={loadMoreMovies}
          hasMore={true}
          scrollThreshold={0.9}
          loader={
            matchingCategory?.data?.page < matchingCategory?.data?.total_pages ? (
              <div className="text-center-loader mt-3">
                <MutatingDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#fd7e14"
                  secondaryColor="#ffc107"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                />
              </div>
            ) : null
          }
          style={{overflow:"none"}}
        >
          <div className="row">
            {matchingCategory?.data?.results?.length > 0 ? (
              matchingCategory.data.results.map((movie, index) => (
                <div className="col-sm-3 pt-2 pb-1 pe-1" key={index}>
                  <div className="card shadow-card-box">
                    <Link
                      style={{ textDecorationColor: "transparent" }}
                      to={`/movie/${movie.id}`}
                      title= {movie?.title ? movie.title : "N/A"}
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `${imageUri}${movie.poster_path}`
                            : "http://localhost:5173/images/404-img.jpg"
                        }
                        className="card-img-top card-list-movie-img-size"
                        alt={
                          movie.poster_path
                            ? "Movie poster"
                            : "Image not available"
                        }
                      />
                      <div className="card-body text-center">
                        <h6 className="text-truncate text-black">
                          {movie?.title ? movie.title : "N/A"}
                        </h6>
                        <div className="card-list-rating-position">
                          <span className="list-movie-rating">
                            {movie.vote_average
                              ? `${(movie.vote_average * 10).toFixed(0)}%`
                              : "N/A"}
                          </span>
                        </div>
                        <h6 className="text-truncate text-black-50">
                          {movie.release_date
                            ? new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(movie.release_date))
                            : "N/A"}
                        </h6>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="container">
                <h4>No data available</h4>
              </div>
            )}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CardList;
