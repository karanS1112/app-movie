import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './reducer/movieReducer'


export const store = configureStore({
  reducer: {
    movieSlice
  },
})