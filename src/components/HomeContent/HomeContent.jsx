import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

import MoviesList from "components/MoviesList";
import FilterAndSortingBar from "components/FilterAndSortingBar";

import { messages } from "../../constants";

const useStyles = makeStyles(() => ({
  homeContent: {
    maxWidth: "100rem",
    margin: "7rem auto 2.5rem",
  },
}));

function HomeContent({ movies, error, hasMore, loadMore, configs }) {
  const classes = useStyles();
  const matches960 = useMediaQuery("(min-width: 960px)");

  return (
    <Grid
      container
      m={6}
      ml={2}
      flexDirection="row"
      display="flex"
      className={classes.homeContent}
    >
      {movies.length ? (
        <>
          {matches960 && (
            <Grid item pr={3} spacing={3}>
              <FilterAndSortingBar />
            </Grid>
          )}
          <Grid item xs={6} spacing={3}>
            <MoviesList
              movies={movies}
              hasMore={hasMore}
              loadMore={loadMore}
              configs={configs}
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
    </Grid>
  );
}

HomeContent.propTypes = {
  configs: PropTypes.object.isRequired,
  loadMore: PropTypes.func.isRequired,
  movies: PropTypes.array,
  error: PropTypes.object,
  hasMore: PropTypes.bool,
};

HomeContent.defaultProps = {
  movies: [],
  error: null,
  hasMore: true,
};

export default HomeContent;
