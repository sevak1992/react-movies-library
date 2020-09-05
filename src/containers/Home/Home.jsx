import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

import LoadingIndicator from "components/common/LoadingIndicator";
import MoviesList from "components/MoviesList";
import Header from "containers/Header";
import FilterAndSortingBar from "components/FilterAndSortingBar";
import { getMovies } from "apis/tmdb";

import { messages } from "../../constants";

const useStyles = makeStyles(() => ({
  homeContent: {
    maxWidth: "100rem",
    margin: "7rem auto 2.5rem",
  },
}));

function Home({ configs }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const filter = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sorting);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies(1, filter, sorting);
        if (res.data.total_pages === 1) {
          setHasMore(false);
        }
        setMovies([...res.data.results]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [filter, sorting]);

  const loadMore = async (loadPage) => {
    try {
      const res = await getMovies(loadPage + 1, filter, sorting);
      if (res.data.total_pages === loadPage + 1) {
        setHasMore(false);
      }
      setMovies((m) => [...m.concat(res.data.results)]);
    } catch (err) {
      setHasMore(false);
    }
  };

  const classes = useStyles();
  const matches960 = useMediaQuery("(min-width: 960px)");
  const getContent = () => {
    if (movies.length) {
      return (
        <Grid
          container
          m={6}
          ml={2}
          flexDirection="row"
          display="flex"
          className={classes.homeContent}
        >
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
        </Grid>
      );
    }
    if (error) {
      return (
        <Grid
          container
          m={6}
          ml={2}
          flexDirection="row"
          display="flex"
          className={classes.homeContent}
        >
          <Alert variant="outlined" severity="error">
            {messages.ERRORS.SOMETHING_WENT_WRONG}
          </Alert>
        </Grid>
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
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
