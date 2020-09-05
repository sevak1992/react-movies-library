import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Chip from "@material-ui/core/Chip";

import { messages } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    maxWidth: 210,
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function GenreFilter({ genres, checkedGenres, onChange }) {
  const classes = useStyles();

  const isChecked = (id) => !!checkedGenres.find((i) => i === id);
  const check = (id) => () => {
    if (isChecked(id)) {
      checkedGenres.splice(checkedGenres.indexOf(id), 1);
    } else {
      checkedGenres.push(id);
    }
    onChange([...checkedGenres]);
  };

  return (
    <Box mx={2} p={2}>
      <FormGroup row>
        <FormLabel component="legend">
          {messages.FILTERS_AND_SORTING.GENRE}
        </FormLabel>
        <div className={classes.root}>
          {genres.map(({ name, id }) => (
            <Chip
              key={id}
              label={name}
              clickable
              color={isChecked(id) ? "primary" : "secondary"}
              onClick={check(id)}
              variant="outlined"
              size="small"
            />
          ))}
        </div>
      </FormGroup>
    </Box>
  );
}

GenreFilter.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  checkedGenres: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GenreFilter;
