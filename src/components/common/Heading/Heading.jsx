import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  heading: {
    marginTop: "2rem",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
  },
}));

function Heading({ text, variant, color, component }) {
  const classes = useStyles();
  return (
    <Typography
      className={classes.heading}
      variant={variant}
      color={color}
      component={component}
    >
      {text}
    </Typography>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  component: PropTypes.string,
};

Heading.defaultProps = {
  variant: "h5",
  color: "textPrimary",
  component: "h4",
};

export default Heading;
