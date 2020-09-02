import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(() => ({
  formControlLabel: {
    height: 30,
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
    <Box mx={4} p={2}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Genre</FormLabel>
        <FormGroup>
          {genres.map(({ name, id }) => (
            <FormControlLabel
              className={classes.formControlLabel}
              key={id}
              control={
                <Checkbox
                  checked={isChecked(id)}
                  onChange={check(id)}
                  name={name}
                />
              }
              label={name}
            />
          ))}
        </FormGroup>
      </FormControl>
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
