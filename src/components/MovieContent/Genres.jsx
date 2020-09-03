import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

import Heading from "components/common/Heading";

const useStyles = makeStyles(() => ({
  genreItem: {
    marginRight: "0.5rem",
    marginTop: "0.25rem",
  },
}));

function Genres({ genres }) {
  const classes = useStyles();
  return (
    <>
      <Heading text="Genres" />
      {genres.map((genre) => {
        return (
          <Chip
            className={classes.genreItem}
            key={genre.id}
            clickable={false}
            color="primary"
            variant="outlined"
            label={genre.name}
          />
        );
      })}
    </>
  );
}

Genres.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Genres;
