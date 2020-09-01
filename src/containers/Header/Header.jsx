import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

import AccountMenu from "components/AccountMenu";
import SearchBar from "components/common/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchBox: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  // TODO: get this from global state
  const [auth] = useState(true);
  // TODO: get favorites count from global state
  const [favoritesCount] = useState(5);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Movies Library
          </Typography>
          <SearchBar
            className={classes.searchBox}
            onSearch={(q) => console.log(q)}
          />
          {auth && (
            <IconButton aria-label="show favorites count" color="inherit">
              <Badge badgeContent={favoritesCount} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          )}
          <AccountMenu isLogin={auth} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
