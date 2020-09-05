import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LanguageIcon from "@material-ui/icons/Language";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EventIcon from "@material-ui/icons/Event";

import { messages } from "../../constants";

const useStyles = makeStyles(() => ({
  basicInfoWrapper: {
    marginTop: "2rem",
  },
  basicInfoItem: {
    fontWeight: "bold",
    marginBottom: "0.25rem",
  },
  iconWrapper: {
    display: "inline-block",
    verticalAlign: "middle",
    width: "2rem",
  },
}));

function BasicInfo({ releaseDate, originaLanguage, runtime, budget }) {
  const classes = useStyles();
  return (
    <div className={classes.basicInfoWrapper}>
      {!!releaseDate && (
        <Typography
          className={classes.basicInfoItem}
          variant="subtitle2"
          color="textPrimary"
          component="p"
        >
          <span
            className={classes.iconWrapper}
            title={messages.MOVIE.RELEASE_DATE}
          >
            <EventIcon />
          </span>
          {releaseDate}
        </Typography>
      )}
      {!!runtime && (
        <Typography
          className={classes.basicInfoItem}
          variant="subtitle2"
          color="textPrimary"
          component="p"
        >
          <span className={classes.iconWrapper} title={messages.MOVIE.DURATION}>
            <AccessTimeIcon />
          </span>
          {runtime} {messages.MOVIE.MIN}
        </Typography>
      )}
      {!!budget && (
        <Typography
          className={classes.basicInfoItem}
          variant="subtitle2"
          color="textPrimary"
          component="p"
        >
          <span className={classes.iconWrapper} title={messages.MOVIE.BUDGET}>
            <AttachMoneyIcon />
          </span>
          {budget}
        </Typography>
      )}
      {!!originaLanguage && (
        <Typography
          className={classes.basicInfoItem}
          variant="subtitle2"
          color="textPrimary"
          component="p"
        >
          <span
            className={classes.iconWrapper}
            title={messages.MOVIE.ORIGINAL_LANGUAGE}
          >
            <LanguageIcon />
          </span>
          {originaLanguage.toUpperCase()}
        </Typography>
      )}
    </div>
  );
}

BasicInfo.propTypes = {
  releaseDate: PropTypes.string,
  originaLanguage: PropTypes.string,
  runtime: PropTypes.number,
  budget: PropTypes.number,
};

BasicInfo.defaultProps = {
  releaseDate: "",
  originaLanguage: "",
  runtime: 0,
  budget: 0,
};

export default BasicInfo;
