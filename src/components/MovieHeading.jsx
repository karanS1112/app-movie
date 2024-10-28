import React, { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import HomeCards from "./HomeCards";
import { movieLists } from "./Home/feature";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying, setUpcoming } from "../store/reducer/movieReducer";
import {
  NowPlayingMovieDataApi,
  topRatedMovieDataApi,
  upcomingMovieDataApi,
} from "../api/movieApiList";

const MovieHeading = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  console.log("selector", selector);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNowPlayingMovieData();
    // getTopRatedMovieData();
    getUpComingMovieData();
  }, []);

  const getNowPlayingMovieData = async () => {
    await NowPlayingMovieDataApi()
      .then((res) => {
        const nowPlayResponse = res.data.results;
        console.log("nowPlayResponse", nowPlayResponse);
        dispatch(setNowPlaying(nowPlayResponse));

        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUpComingMovieData = async () => {
    await upcomingMovieDataApi()
      .then((res) => {
        const upComingResponse = res.data.results;
        console.log("upComingResponse",upComingResponse);
        dispatch(setUpcoming(upComingResponse));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const titleData = [
    {
      title: "Now Playing",
      data: movieLists.topRatedMovieList,
    },

    {
      title: "Up Comming",
      data: movieLists.topRatedMovieList,
    },
    // {
    //   title: "Top Rated",
    //   data: movieLists.topRatedMovieList,
    // },
    // {
    //   title: "Popular",
    //   data: movieLists.popularMovieList,
    // },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {titleData.map((data, index) => (
            <div key={index}>
              <SectionHeading title={data.title} />
              <HomeCards movieData={data.data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieHeading;
