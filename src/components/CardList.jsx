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
} from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const CardList = ({ category }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  // console.log("selector", selector)
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const titleCategory = category;

  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  useEffect(() => {
    fetchMovieData(
      NowPlayingMovieDataApi,
      dispatch,
      setNowPlaying,
      setLoading,
      currentPage,
      setTotalPage,
      selector?.movieSlice?.nowPlaying.results
    );
    fetchMovieData(
      upcomingMovieDataApi,
      dispatch,
      setUpcoming,
      setLoading,
      currentPage,
      setTotalPage,
      selector?.movieSlice?.upcoming.results
    );
    fetchMovieData(
      topRatedMovieDataApi,
      dispatch,
      setTopRated,
      setLoading,
      currentPage,
      setTotalPage,
      selector?.movieSlice?.topRated.results
    );
    fetchMovieData(
      popularMovieDataApi,
      dispatch,
      setPopular,
      setLoading,
      currentPage,
      setTotalPage,
      selector?.movieSlice?.popular.results
    );
  }, [currentPage]);
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
      data: selector?.movieSlice?.topRated,
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
  console.log("currentPage", currentPage);
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
          dataLength={matchingCategory.data.results.length}
          next={loadMoreMovies}
          hasMore={true}
          scrollThreshold={1}
          loader={
            <div className="text-center mt-3">
              {/* <MutatingDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#fd7e14"
                            secondaryColor="#ffc107"
                            radius="12.5"
                            ariaLabel="mutating-dots-loading"
                          /> */}
            </div>
          }
        >
          <div className="row">
            {matchingCategory?.data?.results?.length > 0 ? (
              matchingCategory.data.results.map((movie, index) => (
                <div className="col-sm-3 pt-2 pb-1 pe-1" key={index}>
                  <div className="card shadow-card-box">
                    <Link
                      style={{ textDecorationColor: "transparent" }}
                      to={`/movie/${movie.id}`}
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `${imageUri}${movie.poster_path}`
                            : "./images/404-img.jpg"
                        }
                        className="card-img-top home-movie-img-size"
                        alt={
                          movie.poster_path
                            ? "Movie poster"
                            : "Image not available"
                        }
                      />
                      <div className="card-body">
                        <h6 className="text-truncate text-black">
                          {movie.title}
                        </h6>
                        <div className="card-list-rating-position">
                          <span className="card-list-movie-rating">
                            {movie.vote_average
                              ? `${(movie.vote_average * 10).toFixed(0)}%`
                              : "N/A"}
                          </span>
                        </div>
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
