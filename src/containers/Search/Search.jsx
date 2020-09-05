import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

import { searchMovies } from "apis/tmdb";
import LoadingIndicator from "components/common/LoadingIndicator";
import Header from "containers/Header";
import MoviesList from "components/MoviesList";
import MainContent from "components/common/MainContent";
import Heading from "components/common/Heading";

import { messages } from "../../constants";

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

  const getContent = () => {
    if (movies.length) {
      return (
        <MainContent>
          <MoviesList
            movies={movies}
            hasMore={hasMore}
            loadMore={loadMore}
            configs={configs}
            title={`${messages.SEARCH.SEARCH_BY} "${query}"`}
            md={4}
            sm={6}
          />
        </MainContent>
      );
    }
    if (error) {
      return (
        <MainContent>
          <Alert variant="outlined" severity="error">
            {messages.ERRORS.SOMETHING_WENT_WRONG}
          </Alert>
        </MainContent>
      );
    }
    return (
      <Heading text={`${messages.SEARCH.NO_MOVIES_FOUND_BY} "${query}"`} />
    );
  };

  return (
    <>
      <Header />
      {loading ? <LoadingIndicator isFullScrean /> : getContent()}
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
