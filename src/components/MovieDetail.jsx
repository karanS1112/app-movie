import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { dataMovie } from "../api/movieApiList";
import { setMovieDetail } from "../store/reducer/movieReducer";
import { useDispatch, useSelector } from "react-redux";
import { CiClock1 } from "react-icons/ci";
const MovieDetail = () => {
  const param = useParams();
  const id = param.id;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const item = selector.movieSlice.movieDetail;
  const imageUri = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  const orginalImgPoster = "https://image.tmdb.org/t/p/original/";
  const backgroundImage = orginalImgPoster + item.backdrop_path;

  const movieDetailStyle = {
    backgroundImage: `url("${backgroundImage}")`,
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    await dataMovie(id)
      .then((res) => {
        const movieDetailResponse = res.data;
        console.log("movieDetailResponse ", movieDetailResponse);
        dispatch(setMovieDetail(movieDetailResponse));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fluid-container">
      <div className="movieDetail" style={movieDetailStyle}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card shadow-card-box detail-card-poster  m-4">
                <img
                  src={
                    selector.movieSlice.movieDetail.backdrop_path
                      ? `${imageUri}${item.backdrop_path}`
                      : "./images/404-img.jpg"
                  }
                  className="card-img-top detail-movie-img-size"
                  alt={
                    item.backdrop_path ? "Movie poster" : "Image not available"
                  }
                />
              </div>
            </div>
            <div className="col-md-9">
              <h1 className="pt-3"> {item.title ? item.title : "N/A"}</h1>
              {item.genres?.length > 0 ? (
                <p>{item.genres.map((data) => data.name).join(", ")}</p>
              ) : (
                <p>N/A</p>
              )}
              <CiClock1/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
