import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "recompose";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import { withFirebase } from "auth/firebase";
import routes from "routes";

import { messages } from "../../constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => history.push(routes.home.path))
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert variant="outlined" severity="error">
          {messages.ERRORS.SOMETHING_WENT_WRONG}
        </Alert>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {messages.LOGIN.LOGIN_TITLE}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={messages.LOGIN.EMAIL}
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={messages.LOGIN.PASSWORD}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={onSubmit}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {messages.LOGIN.LOGIN_BTN}
        </Button>
        <Grid container>
          <Grid item>
            <Link to={routes.signup.path} variant="body2">
              {messages.LOGIN.DO_NOT_HAVE_ACCOUNT}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

LoginForm.propTypes = {
  firebase: PropTypes.object.isRequired,
};

const Login = compose(withFirebase)(LoginForm);

export default Login;
