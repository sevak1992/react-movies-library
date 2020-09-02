import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 150,
  },
}));

function YearsSlider({ yearsRange, updateRange, firstYear, lastYear }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    updateRange(newValue);
  };

  const marks = useMemo(
    () => [
      {
        value: firstYear,
        label: firstYear,
      },
      {
        value: lastYear,
        label: lastYear,
      },
    ],
    [firstYear, lastYear]
  );

  return (
    <Box mx={4} p={2}>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend">Year</FormLabel>
        <Slider
          value={yearsRange}
          onChange={handleChange}
          step={1}
          min={firstYear}
          max={lastYear}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          marks={marks}
        />
      </FormControl>
    </Box>
  );
}

YearsSlider.propTypes = {
  yearsRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateRange: PropTypes.func.isRequired,
  firstYear: PropTypes.number.isRequired,
  lastYear: PropTypes.number.isRequired,
};

export default YearsSlider;
