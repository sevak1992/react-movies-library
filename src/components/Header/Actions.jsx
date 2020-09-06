import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreIcon from "@material-ui/icons/MoreVert";
import { compose } from "recompose";

import { AuthUserContext } from "auth/session";
import { withFirebase } from "auth/firebase";
import routes from "routes";

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

function ActionsComponent({ setMobileMoreAnchorEl, firebase }) {
  const classes = useStyles();
  const history = useHistory();
  const matches960 = useMediaQuery("(min-width: 960px)");

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    firebase.doSignOut();
  };

  const handleLogIn = () => {
    history.push(routes.login.path);
  };

  const navigateToFavorites = () => {
    history.push(routes.favorites.path);
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div className={classes.actionsWrapper}>
          <SearchBar />
          {matches960 ? (
            <div className={classes.flex}>
              {authUser.user && (
                <IconButton onClick={navigateToFavorites}>
                  <Badge
                    badgeContent={
                      Object.keys(authUser?.user?.favorites || {}).length
                    }
                    className={classes.favoritesBadge}
                  >
                    <FavoriteBorderIcon className={classes.favoritesIcon} />
                  </Badge>
                </IconButton>
              )}
              <IconButton edge="end" color="primary">
                {authUser.user ? (
                  <ExitToAppIcon onClick={handleLogout} />
                ) : (
                  <AccountCircleIcon onClick={handleLogIn} />
                )}
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
      )}
    </AuthUserContext.Consumer>
  );
}

ActionsComponent.propTypes = {
  firebase: PropTypes.object.isRequired,
  setMobileMoreAnchorEl: PropTypes.func.isRequired,
};

const Actions = compose(withFirebase)(ActionsComponent);
export default Actions;
