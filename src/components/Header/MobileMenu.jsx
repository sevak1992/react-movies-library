import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { compose } from "recompose";

import { AuthUserContext } from "auth/session";
import { withFirebase } from "auth/firebase";
import routes from "routes";

import { messages } from "../../constants";

const useStyles = makeStyles(({ palette }) => ({
  favoritesBadge: {
    color: palette.error.dark,
  },
  favoritesIcon: {
    color: palette.error.dark,
  },
  leftSpace: {
    marginLeft: "1rem",
    color: palette.secondary,
  },
}));

function MobileMenuComponent({ mobileMoreAnchorEl, onClose, firebase }) {
  const classes = useStyles();
  const history = useHistory();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={onClose}
        >
          {authUser.user && (
            <>
              <MenuItem>
                <IconButton onClick={navigateToFavorites}>
                  <Badge
                    badgeContent={
                      Object.keys(authUser?.user?.favorites || {}).length
                    }
                    className={classes.favoritesBadge}
                  >
                    <FavoriteBorderIcon className={classes.favoritesIcon} />
                  </Badge>
                  <Typography className={classes.leftSpace} variant="subtitle1">
                    {messages.HEADER.FAVORITES}
                  </Typography>
                </IconButton>
              </MenuItem>
              <MenuItem>
                <IconButton color="primary">
                  <>
                    <ExitToAppIcon onClick={handleLogout} />
                    <Typography
                      className={classes.leftSpace}
                      variant="subtitle1"
                    >
                      {messages.HEADER.SIGN_OUT}
                    </Typography>
                  </>
                </IconButton>
              </MenuItem>
            </>
          )}
          {!authUser.user && (
            <MenuItem>
              <IconButton color="primary">
                <AccountCircleIcon onClick={handleLogIn} />
                <Typography className={classes.leftSpace} variant="subtitle1">
                  {messages.HEADER.LOGIN}
                </Typography>
              </IconButton>
            </MenuItem>
          )}
        </Menu>
      )}
    </AuthUserContext.Consumer>
  );
}

MobileMenuComponent.propTypes = {
  firebase: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  mobileMoreAnchorEl: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

MobileMenuComponent.defaultProps = {
  mobileMoreAnchorEl: null,
};

const MobileMenu = compose(withFirebase)(MobileMenuComponent);
export default MobileMenu;
