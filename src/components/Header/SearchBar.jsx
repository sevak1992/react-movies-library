import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

import { messages } from "../../constants";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 0,
    width: "100%",
  },
  searchBtn: {
    position: "absolute",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.light,
    padding: "0 0.625rem",
    borderRadius: 0,
  },
  inputRoot: {
    color: "inherit",
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    color: theme.palette.secondary.dark,
  },
}));

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const onSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchQuery.length === 0) {
      return;
    }
    history.push(`/search/${searchQuery}`);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSearch(e);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.search}>
      <IconButton className={classes.searchBtn} onClick={onSearch}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder={messages.HEADER.SEARCH_PLACEHOLDER}
        color="secondary"
        classes={{
          root: classes.inputRoot,
          input: classes.searchInput,
        }}
        onInput={(e) => setSearchQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default React.memo(SearchBar);
