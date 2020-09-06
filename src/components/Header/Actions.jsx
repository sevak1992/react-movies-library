import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreIcon from "@material-ui/icons/MoreVert";

import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  actionsWrapper: {
    display: "flex",
  },
  flex: {
    display: "flex",
  },
  moreIcon: {
    marginRight: "-12px",
  },
  favoritesBadge: {
    color: theme.palette.error.dark,
  },
  favoritesIcon: {
    color: theme.palette.error.dark,
  },
}));

function Actions({ setMobileMoreAnchorEl }) {
  const classes = useStyles();
  const matches960 = useMediaQuery("(min-width: 960px)");

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.actionsWrapper}>
      <SearchBar />
      {matches960 ? (
        <div className={classes.flex}>
          <IconButton>
            <Badge badgeContent={17} className={classes.favoritesBadge}>
              <FavoriteBorderIcon className={classes.favoritesIcon} />
            </Badge>
          </IconButton>
          <IconButton edge="end" color="primary">
            <ExitToAppIcon />
          </IconButton>
        </div>
      ) : (
        <div>
          <IconButton onClick={handleMobileMenuOpen}>
            <MoreIcon color="secondary" className={classes.moreIcon} />
          </IconButton>
        </div>
      )}
    </div>
  );
}

Actions.propTypes = {
  setMobileMoreAnchorEl: PropTypes.func.isRequired,
};

// TODO: compare favorites count and user
export default React.memo(Actions);
