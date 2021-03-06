import React from "react";
import { useAsync } from "react-use";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Heading from "components/common/Heading";
import MoviesSlider from "components/common/MoviesSlider";
import { getRecommendedMoviesByMovie } from "apis/tmdb";

import { messages } from "../../constants";

function RecommendedMoviesSlider({ movieId, noItemsMessage }) {
  const { value: movies, loading, error } = useAsync(async () => {
    return (await getRecommendedMoviesByMovie(movieId))?.data?.results || [];
  }, [movieId]);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Heading text={messages.MOVIE.RECOMMENDED_MOVIES} />
      <MoviesSlider
        movies={movies ?? []}
        loading={loading}
        error={error}
        noItemsMessage={noItemsMessage}
      />
    </Grid>
  );
}

RecommendedMoviesSlider.propTypes = {
  movieId: PropTypes.number.isRequired,
  noItemsMessage: PropTypes.string,
};

RecommendedMoviesSlider.defaultProps = {
  noItemsMessage: messages.DETAILS.NO_RECOMMENDED_MOVIES,
};

export default RecommendedMoviesSlider;
