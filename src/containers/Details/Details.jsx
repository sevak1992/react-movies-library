import React from "react";
import { useAsync } from "react-use";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Eclipse } from "react-loading-io";

import { getMovie } from "apis/tmdb";
import Header from "containers/Header";
import MainContent from "components/common/MainContent";
import MovieBigImage from "components/MovieBigImage";
import MovieContent from "components/MovieContent";
import RecommendedMoviesSlider from "components/RecommendedMoviesSlider";
import SimilarMoviesSlider from "components/SimilarMoviesSlider";

const Details = ({ configs, location }) => {
  const id = location.pathname.split("/")[2];

  const { value: movie, loading } = useAsync(async () => {
    return (await getMovie(id))?.data || null;
  }, [id]);

  return loading ? (
    <center>
      {" "}
      <Eclipse />{" "}
    </center>
  ) : (
    <>
      <Header />
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
              noItemsMessage="There is no recommended movies."
            />
            <SimilarMoviesSlider
              movieId={movie.id}
              configs={configs}
              noItemsMessage="There is no similar movies."
            />
          </Grid>
        </>
      </MainContent>
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
