import axios from "axios";
import React from "react";
const baseUrl = "https://api.themoviedb.org/3/movie/";
const castCrewBaseUrl = "https://api.themoviedb.org/3/person/";
const searchUrl = "https://api.themoviedb.org/3/search/movie";

export const NowPlayingMovieDataApi = async (currentPage) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}now_playing?api_key=36dec023f16d2531d7df1a52eb67943f&language=en-US&page=${currentPage}`,
  });

  return response;
};
export const upcomingMovieDataApi = async (currentPage) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}upcoming?api_key=36dec023f16d2531d7df1a52eb67943f&language=en-US&page=${currentPage}`,
  });
  return response;
};

export const topRatedMovieDataApi = async (currentPage) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}top_rated?api_key=36dec023f16d2531d7df1a52eb67943f&language=en-US&page=${currentPage}`,
  });
  return response;
};

export const popularMovieDataApi = async (currentPage) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}popular?api_key=36dec023f16d2531d7df1a52eb67943f&language=en-US&page=${currentPage}`,
  });
  return response;
};

export const dataMovie = async (movieId) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}${movieId}?api_key=36dec023f16d2531d7df1a52eb67943f&language=en-US`,
  });
  return response;
};
export const castCrewMovie = async (movieId) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}${movieId}/casts?api_key=36dec023f16d2531d7df1a52eb67943f`,
  });
  return response;
};

export const castPersonDetailsApi = async (castId) => {
  const response = await axios({
    method: "GET",
    url: `${castCrewBaseUrl}${castId}?api_key=36dec023f16d2531d7df1a52eb67943f&language=en-US`,
  });
  return response;
};

export const videoTrailer = async (movieId) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}${movieId}/videos?api_key=36dec023f16d2531d7df1a52eb67943f&language=en-US`,
  });
  return response;
};

export const searchMovieApi = async (searchQuery) => {
  const response = await axios({
    method: "GET",
    url: `${searchUrl}?query=${searchQuery}&api_key=36dec023f16d2531d7df1a52eb67943f`,
  });
  return response;
};
