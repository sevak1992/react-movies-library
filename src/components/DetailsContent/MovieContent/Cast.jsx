import React, { useMemo } from "react";
import { useAsync } from "react-use";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";

import Heading from "components/common/Heading";
import Slider from "components/common/Slider";
import { getMovieCredits } from "apis/tmdb";

import { messages } from "../../../constants";

function Cast({ movieId, baseUrl, posterSizes }) {
  const { value: cast, loading, error } = useAsync(async () => {
    return (await getMovieCredits(movieId))?.data?.cast || [];
  }, [movieId]);

  const imageBaseUrl = `${baseUrl}${posterSizes[0]}`;
  const dummyCastItems = useMemo(
    () =>
      new Array(10).fill(0).map((item, index) => {
        return (
          <Skeleton key={index.toString()}>
            <Avatar />
          </Skeleton>
        );
      }),
    []
  );
  const castItems = loading
    ? dummyCastItems
    : (cast || []).map((person) => {
        const { profile_path: profilePath } = person;
        const src = imageBaseUrl + profilePath;
        return <Avatar key={person.id} src={src} title={person.name} />;
      });

  return (
    <>
      <Heading text={messages.MOVIE.CAST} />
      <Slider items={castItems} error={error} />
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
  posterSizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Cast;
