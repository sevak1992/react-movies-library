import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AuthUserContext from "./context";
import { withFirebase } from "../firebase";

const withAuthentication = (Component) => {
  function WithAuthentication(props) {
    const { user } = props;
    useEffect(() => {
      props.firebase.onAuthUserListener(
        (authUser) => {
          if (authUser.type) {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            // props.dispatch(logInAction(authUser));
          } else {
            localStorage.removeItem("authUser");
            // props.dispatch(logOutAction(null));
          }
        },
        () => {
          localStorage.removeItem("authUser");
          // props.dispatch(logOutAction(null));
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
    // dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps)(withFirebase(WithAuthentication));
};

withAuthentication.propTypes = {
  firebase: PropTypes.object.isRequired,
  // dispatch: PropTypes.func
};

export default withAuthentication;
