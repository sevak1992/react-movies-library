import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Heading from "components/common/Heading";
import { addGenresFilter, resetFilter } from "actions";

import { messages } from "../../constants";

const useStyles = makeStyles(() => ({
  genreItem: {
    marginRight: "0.5rem",
    marginTop: "0.25rem",
  },
}));

function Genres({ genres }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const onFilterByGenre = (id) => {
    dispatch(resetFilter());
    dispatch(addGenresFilter([id]));
    history.push("/");
  };

  return (
    <>
      <Heading text={messages.MOVIE.GENRES} />
      {genres.map(({ name, id }) => {
        return (
          <Chip
            className={classes.genreItem}
            key={id}
            clickable
            color="primary"
            variant="outlined"
            label={name}
            onClick={() => {
              onFilterByGenre(id);
            }}
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
