import axios from "axios";

const { REACT_APP_TMDB_API_KEY: TMDB_API_KEY } = process.env;

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: `${TMDB_API_KEY}`,
  },
});
