import React, { useEffect, useState } from "react";
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
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovie(id);
      setMovie(res.data);
      setLoading(false);
    };
    fetchMovie();
  }, []);

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
          <Grid container justify="center" spacing={8}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <MovieBigImage
                title={movie.title}
                src={movie.poster_path}
                configs={configs}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <MovieContent movie={movie} configs={configs} />
            </Grid>
          </Grid>
          <Grid container justify="flex-start" spacing={4}>
            <RecommendedMoviesSlider movieId={movie.id} configs={configs} />
            <SimilarMoviesSlider movieId={movie.id} configs={configs} />
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
