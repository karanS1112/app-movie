import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { dataMovie } from "../api/movieApiList";
import { setMovieDetail } from "../store/reducer/movieReducer";
import { useDispatch, useSelector } from "react-redux";

const MovieDetail = () => {
  const param = useParams();

  const dispatch = useDispatch();

  const selector = useSelector((state) => state);

  const id = param.id;

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    await dataMovie(id)
      .then((res) => {
        const movieDetailResponse = res.data;
        dispatch(setMovieDetail(movieDetailResponse));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="conatiner">
      <div className="movieDetail">
        <div className="movieDetail__poster">
          {/* <img src={} alt="poster" /> */}
        </div>
        <div className="movieDetail__info">
          <h1>{selector.movieSlice.movieDetail.title}</h1>
          <p>lklskl</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
