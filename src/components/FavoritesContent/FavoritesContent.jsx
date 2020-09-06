import React from "react";
import PropTypes from "prop-types";

import MoviesList from "components/MoviesList";
import MainContent from "components/common/MainContent";
import Heading from "components/common/Heading";

import { messages } from "../../constants";

const FavoritesContent = ({ authUser }) => {
  const favorites = authUser?.user?.favorites || {};
  const movies = Object.values(favorites);
  return (
    <MainContent>
      {movies.length ? (
        <MoviesList
          movies={movies}
          title={messages.FAVORITES.TITLE}
          hasMore={false}
          md={4}
          sm={6}
        />
      ) : (
        <Heading text={messages.FAVORITES.YOU_HAVE_NO_FAVORTITE_MOVIES} />
      )}
    </MainContent>
  );
};

FavoritesContent.propTypes = {
  authUser: PropTypes.object,
};

FavoritesContent.defaultProps = {
  authUser: {
    user: null,
  },
};

export default FavoritesContent;
