import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nowPlaying: [],
    upcoming: [],
}

const movieSlice = createSlice({
  name: 'movieList',
  initialState: initialState,
  reducers: {
    setNowPlaying(state, action) {
      return {...state, nowPlaying: {...state.nowPlaying, ...action.payload}}
    },
    setUpcoming(state, action) {
        return {...state, upcoming: {...state.upcoming, ...action.payload}}
      },

  },
})

export const { setNowPlaying ,setUpcoming} = movieSlice.actions
export default movieSlice.reducer