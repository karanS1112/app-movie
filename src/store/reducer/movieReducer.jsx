import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: {},
  upcoming: [],
  topRated: [],
  popular: [],
  movieDetail: [],
  castCrew: [],
  castCrewDetail: [],
  videoData: [],
  searchData:[]
};

const movieSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    setNowPlaying(state, action) {
      return { ...state, nowPlaying: action.payload };
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
    setCastCrew(state, action) {
      return { ...state, castCrew: action.payload };
    },
    setCastCrewDetail(state, action) {
      return { ...state, castCrewDetail: action.payload };
    },
    setVideoData(state, action) {
      return { ...state, videoData: action.payload };
    },
    setSearchData(state, action) {
      return { ...state, searchData: action.payload };
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
  setCastCrew,
  setCastCrewDetail,
  setVideoData,
  setSearchData,
} = movieSlice.actions;
export default movieSlice.reducer;
