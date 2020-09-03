import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  sliderItemWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.3125rem",
  },
}));

function SliderItemWrapper({ children }) {
  const classes = useStyles();
  return <div className={classes.sliderItemWrapper}>{children}</div>;
}

SliderItemWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SliderItemWrapper;
