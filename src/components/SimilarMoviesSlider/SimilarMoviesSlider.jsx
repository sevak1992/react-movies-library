import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Heading from "components/common/Heading";
import MoviesSlider from "components/common/MoviesSlider";
import { getSimilarMoviesByMovie } from "apis/tmdb";

function SimilarMoviesSlider({ movieId, configs }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getSimilarMoviesByMovie(movieId);
      setMovies(res.data.results);
      setLoading(false);
    };
    fetchMovies();
  }, [movieId]);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Heading text="Similar Movies" />
      <MoviesSlider movies={movies} configs={configs} loading={loading} />
    </Grid>
  );
}

SimilarMoviesSlider.propTypes = {
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string.isRequired,
      poster_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
  movieId: PropTypes.number.isRequired,
};

export default SimilarMoviesSlider;
