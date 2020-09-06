import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import routes from "routes";
import LoadingIndicator from "components/common/LoadingIndicator";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const redirectionUrl = rest.location.pathname + rest.location.search;
  const [currentUser] = useState(JSON.parse(localStorage.getItem("authUser")));

  const history = useHistory();

  const [loading, setLoading] = useState(currentUser === null);

  useEffect(() => {
    const navigateToLogin = () => {
      history.push({
        pathname: routes.login.path,
        state: { url: redirectionUrl },
      });
    };
    currentUser ? setLoading(false) : navigateToLogin();
  }, [currentUser, history, redirectionUrl]);

  return loading ? (
    <LoadingIndicator isFullScrean />
  ) : (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export { PrivateRoute };
