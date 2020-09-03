import axios from "axios";

const { REACT_APP_TMDB_API_KEY: TMDB_API_KEY } = process.env;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: `${TMDB_API_KEY}`,
  },
});

export const getConfigs = () => tmdbApi.get("configuration");

export const getGenres = () => tmdbApi.get("/genre/movie/list");

export const getMovie = (id) => tmdbApi.get(`/movie/${id}`);

export const getPopularMovies = (page = 1) =>
  tmdbApi.get("/movie/popular", { params: { page } });

export const getRecommendedMoviesByMovie = (id) =>
  tmdbApi.get(`/movie/${id}/recommendations`);

export const getSimilarMoviesByMovie = (id) =>
  tmdbApi.get(`/movie/${id}/similar`);

export const getMoviesByTerm = (searchTerm) => {
  console.log(searchTerm);
};

export const getMovieCredits = (id) => tmdbApi.get(`/movie/${id}/credits`);
