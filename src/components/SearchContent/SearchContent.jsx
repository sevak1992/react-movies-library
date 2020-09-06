import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

import MoviesList from "components/MoviesList";
import MainContent from "components/common/MainContent";
import Heading from "components/common/Heading";

import { messages } from "../../constants";

const SearchContent = ({ query, movies, error, hasMore, loadMore }) => {
  return (
    <MainContent>
      {movies.length ? (
        <MoviesList
          movies={movies}
          hasMore={hasMore}
          loadMore={loadMore}
          title={`${messages.SEARCH.SEARCH_BY} "${query}"`}
          md={4}
          sm={6}
        />
      ) : error ? (
        <Alert variant="outlined" severity="error">
          {messages.ERRORS.SOMETHING_WENT_WRONG}
        </Alert>
      ) : (
        <Heading text={`${messages.SEARCH.NO_MOVIES_FOUND_BY} "${query}"`} />
      )}
    </MainContent>
  );
};

SearchContent.propTypes = {
  loadMore: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  movies: PropTypes.array,
  error: PropTypes.object,
  hasMore: PropTypes.bool,
};

SearchContent.defaultProps = {
  movies: [],
  error: null,
  hasMore: true,
};

export default SearchContent;
