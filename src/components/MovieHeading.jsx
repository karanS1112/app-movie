import React, { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import HomeCards from "./HomeCards";
// import { formatMovieList, movieLists } from "./Home/feature";
import { useDispatch, useSelector } from "react-redux";
import {
  setNowPlaying,
  setPopular,
  setTopRated,
  setUpcoming,
} from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { fetchMovieData } from "../commonFunction/movieApiFunction";
import {
  NowPlayingMovieDataApi,
  topRatedMovieDataApi,
  upcomingMovieDataApi,
  popularMovieDataApi,
} from "../api/movieApiList";

const MovieHeading = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

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
  const loadMoreMovies = () => {
    if (currentPage <= 3) {
      setCurrentPage(currentPage + 1);
    }
  };

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
  return (
    <div className="container">
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
        <div className="row">
          <div className="col-12">
            {titleData.map((data, index) => (
              <div key={index}>
                <SectionHeading title={data.title} />
                <HomeCards
                  key={data.id}
                  movieData={data?.data?.results}
                  loading={loading}
                  loadMoreMovies={loadMoreMovies}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieHeading;
