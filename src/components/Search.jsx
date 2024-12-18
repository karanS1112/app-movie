import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMovieApi } from "../api/movieApiList";
import { setSearchData } from "../store/reducer/movieReducer";

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
    e.preventDefault();
    searchApi();
  };

  const searchApi = async () => {
    try {
      const res = await searchMovieApi(searchTerm);
      dispatch(setSearchData(res.data.results));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleMovieClick = (movieId) => {
    setSearchTerm("");
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="search-container">
      <form
        className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
        role="search"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          className="form-control form-control-dark"
          placeholder="Movie Search..."
          aria-label="Search"
          value={searchTerm}
          onChange={handleOnChange}
        />
      </form>
      {searchTerm.length >= 3 && (
        <div className="search-results mt-3 position-absolute text-truncate wrap-word">
          {selector.map((movie) => (
            <div
              key={movie.id}
              className="search-result-item text-truncate-3 list-wrap p-1 "
              onClick={() => handleMovieClick(movie.id)}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
