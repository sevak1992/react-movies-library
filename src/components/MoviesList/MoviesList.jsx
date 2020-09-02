import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import MovieItem from "components/MovieItem";

function MoviesList({ configs, movies, xs, sm, md, lg, xl }) {
  if (!configs.images) {
    return "";
  }
  const { base_url: baseUrl, poster_sizes: posterSizes } = configs.images;
  return (
    <Grid container justify="center" spacing={2}>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <MovieItem
            movie={movie}
            baseUrl={baseUrl}
            posterSizes={posterSizes}
          />
        </Grid>
      ))}
    </Grid>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      original_title: PropTypes.string,
      title: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
    })
  ).isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string,
      poster_sizes: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

MoviesList.defaultProps = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  xl: 3,
};

export default MoviesList;
