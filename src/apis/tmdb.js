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

export const searchMovies = (page = 1, query = "") => {
  const params = { query, page, include_adult: false };
  return tmdbApi.get("/search/movie", { params });
};

export const getMovies = (page = 1, filter = {}, search, sorting) => {
  if (search) return searchMovies(page, search);
  const params = { page, include_adult: false };
  if (filter.genres?.length) {
    params.with_genres = filter.genres.join();
  }
  if (filter.yearsRange?.length && filter.yearsRange.length === 2) {
    // the first second of the the year
    params["primary_release_date.gte"] = new Date(
      filter.yearsRange[0],
      0,
      1,
      0,
      0,
      0,
      0
    );
    // the last second of the the year
    params["primary_release_date.lte"] = new Date(
      filter.yearsRange[1],
      11,
      31,
      23,
      59,
      59,
      999
    );
  }
  params.sort_by = sorting;

  return tmdbApi.get("/discover/movie", { params });
};
export const getRecommendedMoviesByMovie = (id) =>
  tmdbApi.get(`/movie/${id}/recommendations`);

export const getSimilarMoviesByMovie = (id) =>
  tmdbApi.get(`/movie/${id}/similar`);

export const getMovieCredits = (id) => tmdbApi.get(`/movie/${id}/credits`);
