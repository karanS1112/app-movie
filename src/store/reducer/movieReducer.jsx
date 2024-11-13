import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
  upcoming: [],
  topRated: [],
  popular: [],
  movieDetail: [],
};

const movieSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    setNowPlaying(state, action) {
      return { ...state, nowPlaying: [...state.nowPlaying, ...action.payload] };
    },
    setUpcoming(state, action) {
      return { ...state, upcoming: [...state.upcoming, ...action.payload] };
    },
    setTopRated(state, action) {
      return { ...state, topRated: [...state.topRated, ...action.payload] };
    },
    setPopular(state, action) {
      return { ...state, popular: [...state.popular, ...action.payload] };
    },
    setMovieDetail(state, action) {
      return { ...state, movieDetail: action.payload };
    },
  },
});

export const { setNowPlaying, setUpcoming, setTopRated, setPopular, setMovieDetail } = movieSlice.actions;
export default movieSlice.reducer;
