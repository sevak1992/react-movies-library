import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

import MoviesList from "components/MoviesList";
import Header from "containers/Header";
import FilterAndSortingBar from "components/FilterAndSortingBar";
import { getMovies } from "apis/tmdb";

const useStyles = makeStyles(() => ({
  homeContent: {
    maxWidth: "100rem",
    margin: "7rem auto 2.5rem",
  },
}));

function Home({ configs }) {
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const filter = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sorting);
  console.log("filters", filter);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies(1, filter, sorting);
        if (res.data.total_pages === 1) {
          setHasMore(false);
        }
        setMovies([...res.data.results]);
      } catch (error) {
        // TODO: handle error
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
    </>
  );
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
