import React from "react";
import { useAsync } from "react-use";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

import { getMovie } from "apis/tmdb";
import LoadingIndicator from "components/common/LoadingIndicator";
import Header from "containers/Header";
import MainContent from "components/common/MainContent";
import MovieBigImage from "components/MovieBigImage";
import MovieContent from "components/MovieContent";
import RecommendedMoviesSlider from "components/RecommendedMoviesSlider";
import SimilarMoviesSlider from "components/SimilarMoviesSlider";

import { messages } from "../../constants";

const Details = ({ configs, location }) => {
  const id = location.pathname.split("/")[2];

  const { value: movie, loading, error } = useAsync(async () => {
    return (await getMovie(id))?.data || null;
  }, [id]);

  const getContent = () => {
    if (movie) {
      return (
        <MainContent>
          <>
            <Grid container justify="center" spacing={6}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <MovieBigImage
                  title={movie.title}
                  src={movie.poster_path}
                  configs={configs}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                <MovieContent movie={movie} configs={configs} />
              </Grid>
            </Grid>
            <Grid container justify="flex-start" spacing={4}>
              <RecommendedMoviesSlider
                movieId={movie.id}
                configs={configs}
                noItemsMessage={messages.DETAILS.NO_RECOMMENDED_MOVIES}
              />
              <SimilarMoviesSlider
                movieId={movie.id}
                configs={configs}
                noItemsMessage={messages.DETAILS.NO_SIMILAR_MOVIES}
              />
            </Grid>
          </>
        </MainContent>
      );
    }
    if (error) {
      return (
        <MainContent>
          <Alert variant="outlined" severity="error">
            {messages.ERRORS.SOMETHING_WENT_WRONG}
          </Alert>
        </MainContent>
      );
    }
    return "";
  };

  return (
    <>
      <Header />
      {loading ? <LoadingIndicator isFullScrean /> : getContent()}
    </>
  );
};

Details.propTypes = {
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string.isRequired,
      poster_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Details;
