import React from "react";
import { useAsync } from "react-use";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Heading from "components/common/Heading";
import MoviesSlider from "components/common/MoviesSlider";
import { getSimilarMoviesByMovie } from "apis/tmdb";

import { messages } from "../../constants";

function SimilarMoviesSlider({ movieId, configs, noItemsMessage }) {
  const { value: movies, loading, error } = useAsync(async () => {
    return (await getSimilarMoviesByMovie(movieId))?.data?.results || [];
  }, [movieId]);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Heading text={messages.MOVIE.SIMILAR_MOVIES} />
      <MoviesSlider
        movies={movies ?? []}
        configs={configs}
        loading={loading}
        noItemsMessage={noItemsMessage}
        error={error}
      />
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
  noItemsMessage: PropTypes.string,
};

SimilarMoviesSlider.defaultProps = {
  noItemsMessage: messages.DETAILS.NO_SIMILAR_MOVIES,
};

export default SimilarMoviesSlider;
