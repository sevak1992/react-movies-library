import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logInAction, logOutAction } from "actions";
import AuthUserContext from "./context";
import { withFirebase } from "../firebase";

const withAuthentication = (Component) => {
  function WithAuthentication(props) {
    // debugger
    const { user } = props;
    useEffect(() => {
      props.firebase.onAuthUserListener(
        (authUser) => {
          if (authUser) {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            props.dispatch(logInAction(authUser));
            localStorage.setItem("userId", JSON.stringify(authUser.uid));
          } else {
            localStorage.removeItem("authUser");
            props.dispatch(logOutAction(null));
          }
        },
        () => {
          localStorage.removeItem("authUser");
        }
      );
    }, []);

    return (
      <AuthUserContext.Provider value={user}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  }

  const mapStateToProps = (store) => {
    return {
      user: store.user,
    };
  };

  WithAuthentication.propTypes = {
    firebase: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps)(withFirebase(WithAuthentication));
};

withAuthentication.propTypes = {
  firebase: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default withAuthentication;
