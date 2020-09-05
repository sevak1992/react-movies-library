import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";

import { config } from "../../constants";

const useStyles = makeStyles(() => ({
  formControl: {
    width: 210,
  },
}));

function Sorting({ selectedSorting, onChange }) {
  const classes = useStyles();
  const [sorting, setSorting] = useState(selectedSorting);
  useEffect(() => {
    setSorting(selectedSorting);
  }, [selectedSorting]);

  return (
    <Box mx={2} p={2}>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend">Sort By</FormLabel>
        <Select value={sorting} onChange={onChange} input={<Input />}>
          {config.SORTINGS.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

Sorting.propTypes = {
  selectedSorting: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Sorting;
