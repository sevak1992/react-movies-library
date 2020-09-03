import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Box";

import MoviesList from "components/MoviesList";
import Header from "containers/Header";
import FilterBar from "components/FilterBar";
import { getPopularMovies } from "apis/tmdb";

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

  return (
    <>
      <Header />
      <Grid container m={6} ml={2} flexDirection="row" display="flex">
        <Grid container item pr={3} xs spacing={3}>
          <FilterBar />
        </Grid>
        <Grid container item xs={6} spacing={3}>
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
