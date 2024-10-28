import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
  upcoming: [],
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
    setMovieDetail(state, action) {
      return { ...state, movieDetail: action.payload };
    },
  },
});

export const { setNowPlaying, setUpcoming, setMovieDetail } = movieSlice.actions;
export default movieSlice.reducer;
