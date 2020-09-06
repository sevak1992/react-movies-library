import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { searchMovies } from "apis/tmdb";
import LoadingIndicator from "components/common/LoadingIndicator";
import SearchContent from "components/SearchContent";

const Search = ({ location }) => {
  const pathArr = location.pathname.split("/");
  const query = pathArr.slice(-1).pop();

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

  return loading ? (
    <LoadingIndicator isFullScrean />
  ) : (
    <SearchContent
      loadMore={loadMore}
      movies={movies}
      error={error}
      hasMore={hasMore}
      query={query}
    />
  );
};

Search.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Search;
