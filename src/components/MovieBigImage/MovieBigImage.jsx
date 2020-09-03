import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "40rem",
    objectFit: "cover",
    borderRadius: "0.8rem",
    boxShadow: "0.3125rem 0.3125rem 0.625rem #a1a1a1",
  },
}));

function MovieBigImage({ title, src, configs }) {
  const classes = useStyles();
  const { base_url: baseUrl, poster_sizes: posterSizes } = configs.images;
  const imageUrl = `${baseUrl}${posterSizes[4]}${src}`;
  return (
    <div>
      <img src={imageUrl} title={title} alt={title} className={classes.image} />
    </div>
  );
}

MovieBigImage.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string.isRequired,
      poster_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
};

export default MovieBigImage;
