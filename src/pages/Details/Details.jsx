import React from "react";
import { useAsync } from "react-use";
import PropTypes from "prop-types";

import { getMovie } from "apis/tmdb";
import LoadingIndicator from "components/common/LoadingIndicator";
import DetailsContent from "components/DetailsContent";

const Details = ({ location }) => {
  const id = location.pathname.split("/")[2];

  const { value: movie, loading, error } = useAsync(async () => {
    return (await getMovie(id))?.data || null;
  }, [id]);

  return loading ? (
    <LoadingIndicator isFullScrean />
  ) : (
    <DetailsContent movie={movie} error={error} />
  );
};

Details.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Details;
