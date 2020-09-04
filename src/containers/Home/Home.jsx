import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import MoviesList from "components/MoviesList";
import Header from "containers/Header";
import FilterBar from "components/FilterBar";
import { getPopularMovies } from "apis/tmdb";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  homeContent: {
    maxWidth: "100rem",
    margin: "7rem auto 2.5rem",
  },
}));

function Home({ configs }) {
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getPopularMovies();
        if (res.data.total_pages === 1) {
          setHasMore(false);
        }
        setMovies((m) => [...m.concat(res.data.results)]);
      } catch (error) {
        // TODO: handle error
      }
    };
    fetchMovies();
  }, []);

  const loadMore = async (loadPage) => {
    try {
      // we increment step by 1 because API step starts from 1 and not from 0
      const res = await getPopularMovies(loadPage + 1);
      if (res.data.total_pages === loadPage + 1) {
        setHasMore(false);
      }
      setMovies((m) => [...m.concat(res.data.results)]);
    } catch (error) {
      // TODO: handle error
    }
  };

  const classes = useStyles();
  const matches960 = useMediaQuery("(min-width: 960px)");

  return (
    <>
      <Header />
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
            <FilterBar />
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
    </>
  );
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
