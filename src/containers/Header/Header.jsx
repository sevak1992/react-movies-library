import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreIcon from "@material-ui/icons/MoreVert";

import MobileDrawer from "./MobileDrawer";

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
  title: {
    color: theme.palette.primary.light,
  },
  link: {
    textDecoration: "none",
  },
  actionsWrapper: {
    display: "flex",
  },
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
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

export default function Header() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const matches960 = useMediaQuery("(min-width: 960px)");

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

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton>
          <Badge badgeContent={11} className={classes.favoritesBadge}>
            <FavoriteBorderIcon className={classes.favoritesIcon} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="primary">
          <ExitToAppIcon />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header}>
        {!matches960 && (
          <Link className={classes.link} to="/">
            <Typography
              className={classes.title}
              variant="h6"
              color="secondary"
              align="center"
            >
              Movies Library
            </Typography>
          </Link>
        )}
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawerOpen}
            color="secondary"
          >
            <MenuIcon />
          </IconButton>
          {matches960 && (
            <Link className={classes.link} to="/">
              <Typography
                className={classes.title}
                variant="h6"
                color="secondary"
              >
                Movies Library
              </Typography>
            </Link>
          )}
          <div className={classes.actionsWrapper}>
            <div className={classes.search}>
              <IconButton className={classes.searchBtn} onClick={onSearch}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search..."
                color="secondary"
                classes={{
                  root: classes.inputRoot,
                  input: classes.searchInput,
                }}
                onInput={(e) => setSearchQuery(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton>
                <Badge badgeContent={17} className={classes.favoritesBadge}>
                  <FavoriteBorderIcon className={classes.favoritesIcon} />
                </Badge>
              </IconButton>
              <IconButton edge="end" color="primary">
                <ExitToAppIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton onClick={handleMobileMenuOpen}>
                <MoreIcon color="secondary" className={classes.moreIcon} />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <MobileDrawer open={open} onClose={handleDrawerClose} />
    </div>
  );
}
