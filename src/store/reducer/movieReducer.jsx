import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: {},
  upcoming: [],
  topRated: [],
  popular: [],
  movieDetail: [],
  resetState:[]
};

const movieSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    setNowPlaying(state, action) {
      // console.log("action", action.payload)
      return { ...state, nowPlaying: action.payload};
    },
    setUpcoming(state, action) {
      //This line returns a new state object, which is an updated version of the current state.
      return { ...state, upcoming: action.payload };
      // { ...state, ... }: Uses the spread operator to keep all existing properties in state unchanged.
      // nowPlaying: [...state.nowPlaying, ...action.payload]:
      // This updates nowPlaying by merging the existing nowPlaying array (...state.nowPlaying) with new movies from action.payload.
    },
    setTopRated(state, action) {
      return { ...state, topRated: action.payload };
    },
    setPopular(state, action) {
      return { ...state, popular: action.payload };
    },
    setMovieDetail(state, action) {
      return { ...state, movieDetail: action.payload };
    },
    setResetState() {
      return initialState;
    },
  },
});

export const {
  setNowPlaying,
  setUpcoming,
  setTopRated,
  setPopular,
  setMovieDetail,
  setResetState,
} = movieSlice.actions;
export default movieSlice.reducer;
