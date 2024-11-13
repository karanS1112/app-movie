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

  useEffect(() => {
    fetchMovieData(NowPlayingMovieDataApi, dispatch, setNowPlaying, setLoading);
    fetchMovieData(NowPlayingMovieDataApi, dispatch, setUpcoming, setLoading);
    fetchMovieData(topRatedMovieDataApi, dispatch, setTopRated, setLoading);
    fetchMovieData(popularMovieDataApi, dispatch, setPopular, setLoading);
    
    // getNowPlayingMovieData();
    // getTopRatedMovieData();
    // getUpComingMovieData();
  }, []);

  // const getNowPlayingMovieData = async () => {
  //   try {
  //     await NowPlayingMovieDataApi().then((res) => {
  //       const nowPlayResponse = res.data.results;
  //       dispatch(setNowPlaying(nowPlayResponse));
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     });
  //   } catch (error) {
  //     toast.error("Please check your internet connection");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getUpComingMovieData = async () => {
  //   try {
  //     await upcomingMovieDataApi().then((res) => {
  //       const upComingResponse = res.data.results;
  //       dispatch(setUpcoming(upComingResponse));
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     });
  //   } catch (error) {
  //     toast.error("Please check your internet connection");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
                  movieData={data?.data}
                  loading={loading}
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
