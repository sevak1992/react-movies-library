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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUpForm(props) {
  const classes = useStyles();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = () => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return props.firebase.user(authUser.user.uid).set({
          firstName,
          lastName,
          email,
        });
      })
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
          {messages.SIGN_UP.TITLE}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label={messages.SIGN_UP.FIRST_NAME}
              autoFocus
              value={firstName}
              onInput={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label={messages.SIGN_UP.LAST_NAME}
              name="lastName"
              autoComplete="lname"
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label={messages.SIGN_UP.EMAIL}
              name="email"
              autoComplete="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label={messages.SIGN_UP.PASSWORD}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          onClick={onSubmit}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {messages.SIGN_UP.SIGN_UP_BTN}
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to={routes.login.path} variant="body2">
              {messages.SIGN_UP.ALREADY_HAVE_AN_ACCOUNT}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

SignUpForm.propTypes = {
  firebase: PropTypes.object.isRequired,
};

const SignUp = compose(withFirebase)(SignUpForm);

export default SignUp;
