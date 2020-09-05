import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  fullScrean: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alignCenter: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function LoadingIndicator({ isFullScrean }) {
  const classes = useStyles();
  return isFullScrean ? (
    <div className={classes.fullScrean}>
      <CircularProgress size={80} />
    </div>
  ) : (
    <CircularProgress className={classes.alignCenter} />
  );
}

LoadingIndicator.propTypes = {
  isFullScrean: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  isFullScrean: false,
};

export default LoadingIndicator;
