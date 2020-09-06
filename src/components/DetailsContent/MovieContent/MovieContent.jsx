import React, { useMemo } from "react";
import PropTypes from "prop-types";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { compose } from "recompose";

import { withConfigs } from "tmdbConfigs";

import { isNotEmptyArray } from "utils";
import Header from "./Header";
import BasicInfo from "./BasicInfo";
import Overview from "./Overview";
import Genres from "./Genres";
import Cast from "./Cast";

function MovieContent({ movie, configs }) {
  const {
    id,
    title,
    tagline,
    vote_average: voteAverage,
    release_date: releaseDate,
    original_language: originaLanguage,
    runtime,
    budget,
    overview,
    genres,
  } = movie;

  const rating = voteAverage / 2;
  const { base_url: baseUrl, poster_sizes: posterSizes } = configs.images;
  return (
    <>
      <Header title={title} tagline={tagline} />
      {useMemo(
        () => (
          <Rating
            readOnly
            value={rating}
            precision={0.5}
            icon={<StarBorderIcon />}
          />
        ),
        [rating]
      )}
      {(releaseDate || runtime || budget || originaLanguage) && (
        <BasicInfo
          releaseDate={releaseDate}
          runtime={runtime}
          budget={budget}
          originaLanguage={originaLanguage}
        />
      )}
      {isNotEmptyArray(genres) && <Genres genres={genres} />}
      {overview && <Overview overview={overview} />}
      <Cast movieId={id} baseUrl={baseUrl} posterSizes={posterSizes} />
    </>
  );
}

MovieContent.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    runtime: PropTypes.number,
    budget: PropTypes.number,
    title: PropTypes.string.isRequired,
    original_language: PropTypes.string,
    adult: PropTypes.bool.isRequired,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string,
    overview: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string.isRequired,
      poster_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
};

export default compose(withConfigs)(MovieContent);
