import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "recompose";
import {
  Container,
  Typography,
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { withFirebase } from "auth/firebase";

import { messages } from "../../constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => history.push("/"))
      .catch(() => {
        /* TODO */
      });
  };

  return (
    <Container component="main" maxWidth="xs">
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
            <Link href="sign-up" variant="body2">
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
