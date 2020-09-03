import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Box";

import MoviesList from "components/MoviesList";
import { getPopularMovies } from "apis/tmdb";
import Header from "containers/Header";
import FilterBar from "components/FilterBar";

function Home({ configs }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getPopularMovies();
      setMovies(res.data.results);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Header />
      <Grid container m={6} ml={2} flexDirection="row" display="flex">
        <Grid container item pr={3} xs spacing={3}>
          <FilterBar />
        </Grid>
        <Grid container item xs={6} spacing={3}>
          <MoviesList movies={movies} configs={configs} />
        </Grid>
      </Grid>
    </>
  );
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
