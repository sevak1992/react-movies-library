import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { Helmet } from "react-helmet";

import MainContent from "components/common/MainContent";
import RecommendedMoviesSlider from "components/RecommendedMoviesSlider";
import SimilarMoviesSlider from "components/SimilarMoviesSlider";
import MovieBigImage from "./MovieBigImage";
import MovieContent from "./MovieContent";

import { messages } from "../../constants";

const Details = ({ movie, error }) => {
  return (
    <MainContent>
      {movie ? (
        <>
          <Helmet>
            <title>
              {movie.title} - {messages.APP.TITLE}
            </title>
            <meta name="description" content={movie.overview} />
          </Helmet>
          <Grid container justify="center" spacing={6}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <MovieBigImage title={movie.title} src={movie.poster_path} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
              <MovieContent movie={movie} />
            </Grid>
          </Grid>
          <Grid container justify="flex-start" spacing={4}>
            <RecommendedMoviesSlider
              movieId={movie.id}
              noItemsMessage={messages.DETAILS.NO_RECOMMENDED_MOVIES}
            />
            <SimilarMoviesSlider
              movieId={movie.id}
              noItemsMessage={messages.DETAILS.NO_SIMILAR_MOVIES}
            />
          </Grid>
        </>
      ) : (
        error && (
          <Alert variant="outlined" severity="error">
            {messages.ERRORS.SOMETHING_WENT_WRONG}
          </Alert>
        )
      )}
    </MainContent>
  );
};

Details.propTypes = {
  error: PropTypes.object,
};

Details.defaultProps = {
  error: null,
};

export default Details;
