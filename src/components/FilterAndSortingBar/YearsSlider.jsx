import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";

import { messages } from "../../constants";

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
    <Box mx={2} p={2}>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend">
          {messages.FILTERS_AND_SORTING.YEAR}
        </FormLabel>
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

function areEqual(prev, next) {
  return (
    prev.firstYear === next.firstYear &&
    prev.lastYear === next.lastYear &&
    prev.updateRange === next.updateRange &&
    prev.yearsRange[0] === next.yearsRange[0] &&
    prev.yearsRange[1] === next.yearsRange[1]
  );
}

export default React.memo(YearsSlider, areEqual);
