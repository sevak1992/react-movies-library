import React, { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  header: {
    background: "#fff",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  menuButton: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const matches960 = useMediaQuery("(min-width: 960px)");

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header}>
        {!matches960 && <LogoBox />}
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawerOpen}
            color="secondary"
          >
            <MenuIcon />
          </IconButton>
          {matches960 && <LogoBox />}
          <Actions setMobileMoreAnchorEl={setMobileMoreAnchorEl} />
        </Toolbar>
      </AppBar>
      <MobileMenu
        onClose={handleMobileMenuClose}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
      />
      <MobileDrawer open={open} onClose={handleDrawerClose} />
    </div>
  );
}

export default Header;
