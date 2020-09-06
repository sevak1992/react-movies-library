import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";

import { withConfigs } from "tmdbConfigs";

import Slider from "components/common/Slider";
import MovieItem from "components/common/MovieItem";

import { messages } from "../../../constants";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  draggable: false,
  lazyLoad: "progressive",
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function MoviesSlider({ movies, loading, error, noItemsMessage, configs }) {
  const { base_url: baseUrl, poster_sizes: posterSizes } = configs.images;
  const movieItems = movies.map((movie) => (
    <MovieItem
      key={movie.id}
      movie={movie}
      baseUrl={baseUrl}
      posterSizes={posterSizes}
    />
  ));
  return (
    <Slider
      items={movieItems}
      settings={settings}
      loading={loading}
      error={error}
      noItemsMessage={noItemsMessage}
    />
  );
}

MoviesSlider.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  noItemsMessage: PropTypes.string,
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string.isRequired,
      poster_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
};

MoviesSlider.defaultProps = {
  noItemsMessage: messages.MOVIE.NO_MOVIES_TO_SHOW,
  error: null,
};

export default compose(withConfigs)(MoviesSlider);
