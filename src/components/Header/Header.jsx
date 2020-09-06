import React, { useState } from "react";
import { useToggle } from "react-use";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import MobileDrawer from "./MobileDrawer";
import Actions from "./Actions";
import MobileMenu from "./MobileMenu";
import LogoBox from "./LogoBox";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  header: {
    background: "#fff",
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

function Header() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isDrawerOpen, toggleDrawer] = useToggle(false);

  const matches960 = useMediaQuery("(min-width: 960px)");

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header}>
        {!matches960 && <LogoBox />}
        <Toolbar className={classes.toolbar}>
          {!matches960 && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={toggleDrawer}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
          )}
          {matches960 && <LogoBox />}
          <Actions setMobileMoreAnchorEl={setMobileMoreAnchorEl} />
        </Toolbar>
      </AppBar>
      <MobileMenu
        onClose={handleMobileMenuClose}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
      />
      <MobileDrawer open={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
}

export default Header;
