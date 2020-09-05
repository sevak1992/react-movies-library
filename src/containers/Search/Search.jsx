import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { searchMovies } from "apis/tmdb";
import LoadingIndicator from "components/common/LoadingIndicator";
import Header from "containers/Header";
import SearchContent from "components/SearchContent";

const Search = ({ configs, location }) => {
  const query = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
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
    } catch (err) {
      setHasMore(false);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <LoadingIndicator isFullScrean />
      ) : (
        <SearchContent
          configs={configs}
          loadMore={loadMore}
          movies={movies}
          error={error}
          hasMore={hasMore}
          query={query}
        />
      )}
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
