import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  tagline: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: "0.625rem",
  },
  title: {
    marginBottom: "1rem",
  },
}));

function Header({ title, tagline }) {
  const classes = useStyles();
  return (
    <>
      <Typography
        className={classes.title}
        variant="h3"
        color="textPrimary"
        component="h1"
      >
        {title}
      </Typography>
      {tagline && (
        <Typography
          className={classes.tagline}
          variant="h6"
          color="textPrimary"
          component="p"
        >
          {tagline}
        </Typography>
      )}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
};

Header.defaultProps = {
  tagline: "",
};

export default Header;
