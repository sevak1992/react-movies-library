import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import routes from "routes";
import { messages } from "../../constants";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.light,
  },
  link: {
    textDecoration: "none",
  },
}));

function LogoBox() {
  const classes = useStyles();
  return (
    <Link className={classes.link} to={routes.home.path}>
      <Typography
        className={classes.title}
        variant="h6"
        color="secondary"
        align="center"
      >
        {messages.APP.TITLE}
      </Typography>
    </Link>
  );
}

export default React.memo(LogoBox);
