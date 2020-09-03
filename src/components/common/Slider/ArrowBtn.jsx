import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  arrowBtn: {
    background: "transparent",
    borderRadius: "50%",
    borderWidth: "1px",
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    outline: "none",
  },
}));

function ArrowBtn({ onClick, icon, className }) {
  const classes = useStyles();
  return (
    <button
      onClick={onClick}
      className={`${classes.arrowBtn} ${className}`}
      type="button"
    >
      {icon}
    </button>
  );
}

ArrowBtn.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

ArrowBtn.defaultProps = {
  className: "",
  onClick: () => {},
};

export default ArrowBtn;
