import React, { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import HomeCards from "./HomeCards";
// import { formatMovieList, movieLists } from "./Home/feature";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying, setUpcoming } from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import {
  NowPlayingMovieDataApi,
  topRatedMovieDataApi,
  upcomingMovieDataApi,
} from "../api/movieApiList";
const MovieHeading = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const selector = useSelector((state) => state);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNowPlayingMovieData();
    // getTopRatedMovieData();
    getUpComingMovieData();
  }, []);

  const getNowPlayingMovieData = async () => {
    try {
      await NowPlayingMovieDataApi().then((res) => {
        const nowPlayResponse = res.data.results;
        dispatch(setNowPlaying(nowPlayResponse));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    } catch (error) {
      toast.error("Please check your internet connection");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUpComingMovieData = async () => {
    try {
      await upcomingMovieDataApi().then((res) => {
        const upComingResponse = res.data.results;
        dispatch(setUpcoming(upComingResponse));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    } catch (error) {
      toast.error("Please check your internet connection");
      console.log(error);
    } finally {
      setLoading(false);
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
      // data: movieLists.topRatedMovieList,
    },
    {
      title: "Popular",
      // data: movieLists.popularMovieList,
    },
    {
      title: "Top Rated",
      // data: movieLists.topRatedMovieList,
    },
    {
      title: "Popular",
      // data: movieLists.popularMovieList,
    },
    {
      title: "Top Rated",
      // data: movieLists.topRatedMovieList,
    },
    {
      title: "Popular",
      // data: movieLists.popularMovieList,
    },
    {
      title: "Top Rated",
      // data: movieLists.topRatedMovieList,
    },
    {
      title: "Popular",
      // data: movieLists.popularMovieList,
    },
    {
      title: "Top Rated",
      // data: movieLists.topRatedMovieList,
    },
    {
      title: "Popular",
      // data: movieLists.popularMovieList,
    },
    {
      title: "Top Rated",
      // data: movieLists.topRatedMovieList,
    },
    {
      title: "Popular",
      // data: movieLists.popularMovieList,
    },
    {
      title: "Top Rated",
      // data: movieLists.topRatedMovieList,
    },
    {
      title: "Popular",
      // data: movieLists.popularMovieList,
    },
  ];
  return (
    <div className="">
      {loading ? (
        <div className="">
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

                <HomeCards movieData={data?.data} loading={loading} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieHeading;
