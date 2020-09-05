import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { searchMovies } from "apis/tmdb";
import Header from "containers/Header";
import MoviesList from "components/MoviesList";
import MainContent from "components/common/MainContent";
import Heading from "components/common/Heading";

const Search = ({ configs, location }) => {
  const query = location.pathname.split("/")[2];

  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await searchMovies(1, query);
        if (res.data.total_pages === 1) {
          setHasMore(false);
        }
        setMovies([...res.data.results]);
      } catch (error) {
        // TODO: handle error
      }
    };
    fetchMovies();
  }, [query]);

  const loadMore = async (loadPage) => {
    try {
      const res = await searchMovies(loadPage + 1, query);
      if (res.data.total_pages === loadPage + 1) {
        setHasMore(false);
      }
      setMovies((m) => [...m.concat(res.data.results)]);
    } catch (error) {
      // TODO: handle error
    }
  };
  // TODO: handle loading

  return (
    <>
      <Header />
      <MainContent>
        {movies.length > 0 ? (
          <MoviesList
            movies={movies}
            hasMore={hasMore}
            loadMore={loadMore}
            configs={configs}
            title={`Search By "${query}"`}
            md={4}
            sm={6}
          />
        ) : (
          <Heading text={`No movies found By "${query}"`} />
        )}
      </MainContent>
    </>
  );
};

Search.propTypes = {
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

export default Search;
