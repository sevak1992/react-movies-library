import React, { useState } from "react";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Box, InputBase } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: -40,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("sm")]: {
      marginRight: (hasText) => (hasText ? 0 : -20),
      width: (hasText) => (hasText ? 200 : 0),
      maxWidth: "20vh",
      backgroundColor: (hasText) =>
        hasText && fade(theme.palette.common.black, 0.05),
      "&:focus": {
        marginRight: 0,
        width: 200,
        maxWidth: "20vh",
        backgroundColor: fade(theme.palette.common.black, 0.05),
      },
    },
  },
}));

/**
 * @function
 * @summary The Search bar component, the entered value is searched in the names of the events
 * @param {Objet} props the object of the props
 * @returns {ReactNode}
 */
function SearchBar({ onSearch, className }) {
  const [hasText, setHasText] = useState(false);
  const classes = useStyles(hasText);

  const handleChange = (text) => {
    setHasText(!!text);
    onSearch(text);
  };

  return (
    <Box display="flex" className={className}>
      <div className={classes.searchIcon}>
        <SearchIcon color="secondary" />
      </div>
      <InputBase
        type="search"
        placeholder="Search…"
        classes={{
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Box>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchBar.defaultProps = {
  className: "",
};
