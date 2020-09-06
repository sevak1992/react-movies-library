import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { compose } from "recompose";

import { AuthUserContext } from "auth/session";
import { withFirebase } from "auth/firebase";

import { messages } from "../../constants";

const useStyles = makeStyles((theme) => ({
  favoritesBadge: {
    color: theme.palette.error.dark,
  },
  favoritesIcon: {
    color: theme.palette.error.dark,
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
    history.push("log-in");
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
          <MenuItem>
            {authUser.user && (
              <>
                <IconButton>
                  <Badge
                    badgeContent={Object.keys(authUser?.favorites || {}).length}
                    className={classes.favoritesBadge}
                  >
                    <FavoriteBorderIcon className={classes.favoritesIcon} />
                  </Badge>
                </IconButton>
                <p>{messages.HEADER.FAVORITES}</p>
              </>
            )}
          </MenuItem>
          <MenuItem>
            <IconButton color="primary">
              {authUser.user ? (
                <ExitToAppIcon onClick={handleLogout} />
              ) : (
                <ExitToAppIcon onClick={handleLogIn} />
              )}
            </IconButton>
            <p>{messages.HEADER.SIGN_OUT}</p>
          </MenuItem>
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
