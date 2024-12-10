import axios from "axios";
import React, { useState } from "react";
import { searchMovieApi } from "../api/movieApiList";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../store/reducer/movieReducer";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.movieSlice.searchData);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    searchApi();
  };

  const handleSearchSubmit = (e) => {
    // e.preventDefault();
    searchApi();
  };
  const searchApi = async () => {
    await searchMovieApi(searchTerm)
      .then((res) => {
        console.log(res.data.results, "fff");
        dispatch(setSearchData(res.data.results));
        // setTimeout(() => setLoading(false), 1000);
      })
      .catch(console.error);
  };
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <div className="">
      <form
        className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
        role="search"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          className="form-control form-control-dark"
          placeholder="Search..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => handleOnChange(e)}
        />
      </form>
      <div className="search-results mt-3 position-absolute bg-danger tb-3 mt-md-1  mt-sm-2 text-truncate">
        {selector.map((movie) => (
          <div
            key={movie.id}
            className="search-result-item text-truncate-3"
            onClick={() => handleMovieClick(movie.id)}
          >
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
