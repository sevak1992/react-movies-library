import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  mainContent: {
    paddingTop: "40px",
  },
}));

function MainContent({ children }) {
  const classes = useStyles();
  return <Container className={classes.mainContent}>{children}</Container>;
}

MainContent.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainContent;
