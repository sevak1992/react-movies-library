import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Heading from "components/common/Heading";

import { messages } from "../../constants";

const useStyles = makeStyles(() => ({
  description: {
    lineHeight: 1.6,
    marginBottom: "1rem",
  },
}));

function Overview({ overview }) {
  const classes = useStyles();
  return (
    <>
      <Heading text={messages.MOVIE.OVERVIEW} />
      <Typography
        className={classes.description}
        variant="subtitle1"
        color="textPrimary"
        component="p"
      >
        {overview}
      </Typography>
    </>
  );
}

Overview.propTypes = {
  overview: PropTypes.string.isRequired,
};

export default React.memo(Overview);
