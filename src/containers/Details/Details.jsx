import React from "react";
import { useAsync } from "react-use";
import PropTypes from "prop-types";

import { getMovie } from "apis/tmdb";
import LoadingIndicator from "components/common/LoadingIndicator";
import DetailsContent from "components/DetailsContent";

const Details = ({ configs, location }) => {
  const id = location.pathname.split("/")[2];

  const { value: movie, loading, error } = useAsync(async () => {
    return (await getMovie(id))?.data || null;
  }, [id]);

  return loading ? (
    <LoadingIndicator isFullScrean />
  ) : (
    <DetailsContent movie={movie} error={error} configs={configs} />
  );
};

Details.propTypes = {
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

export default Details;
