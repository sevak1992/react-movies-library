import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Box";

import MoviesList from "components/MoviesList";
import Header from "containers/Header";
import FilterBar from "components/FilterBar";

function Home({ configs }) {
  return (
    <>
      <Header />
      <Grid container m={6} ml={2} flexDirection="row" display="flex">
        <Grid container item pr={3} xs spacing={3}>
          <FilterBar />
        </Grid>
        <Grid container item xs={6} spacing={3}>
          <MoviesList configs={configs} />
        </Grid>
      </Grid>
    </>
  );
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
