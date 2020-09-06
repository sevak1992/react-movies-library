import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { messages } from "../../constants";

const useStyles = makeStyles((theme) => ({
  favoritesBadge: {
    color: theme.palette.error.dark,
  },
  favoritesIcon: {
    color: theme.palette.error.dark,
  },
}));

function MobileMenu({ mobileMoreAnchorEl, onClose }) {
  const classes = useStyles();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={onClose}
    >
      <MenuItem>
        <IconButton>
          <Badge badgeContent={11} className={classes.favoritesBadge}>
            <FavoriteBorderIcon className={classes.favoritesIcon} />
          </Badge>
        </IconButton>
        <p>{messages.HEADER.FAVORITES}</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="primary">
          <ExitToAppIcon />
        </IconButton>
        <p>{messages.HEADER.SIGN_OUT}</p>
      </MenuItem>
    </Menu>
  );
}

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  mobileMoreAnchorEl: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

MobileMenu.defaultProps = {
  mobileMoreAnchorEl: null,
};

// TODO: compare favorites count and user
export default React.memo(MobileMenu);
