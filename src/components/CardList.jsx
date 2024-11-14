import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../commonFunction/movieApiFunction";
import {
  NowPlayingMovieDataApi,
  upcomingMovieDataApi,
} from "../api/movieApiList";
import { setNowPlaying, setUpcoming } from "../store/reducer/movieReducer";
import { MutatingDots } from "react-loader-spinner";

const CardList = ({ category }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const titleCategory = category;
  // const nowMovieData = fetchMovieData(
  //   NowPlayingMovieDataApi,
  //   dispatch,
  //   setNowPlaying,
  //   setLoading
  // );
  useEffect(() => {
    const nowMovieData = fetchMovieData(
      NowPlayingMovieDataApi,
      dispatch,
      setNowPlaying,
      setLoading
    );
    fetchMovieData(upcomingMovieDataApi, dispatch, setUpcoming, setLoading);
    // console.log(nowMovieData)
  }, []);
  //   console.log(nowMovieData)
  const titleData = [
    {
      title: "Now Playing",
      data: selector?.movieSlice?.nowPlaying,
    },
    {
      title: "Up Comming",
      data: selector?.movieSlice?.upcoming,
    },
  ];
  console.log(titleData);
  const nowPlayingData = titleData[0].data;
  const upComingData = titleData[1].data;

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
            {titleData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="col-sm-3 p-2">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">{category.title}</h6>
                    <ul className="list-group list-group-flush">
                      {category.data.map((movie, movieIndex) =>
                        category == titleCategory ? (
                          <li key={movieIndex} className="list-group-item">
                            {movie.title} (ID: {movie.id})
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
