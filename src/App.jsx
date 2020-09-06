import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import theme from "theme";
import { PrivateRoute } from "routes/PrivateRoute";
import routes from "routes";
import { getConfigs } from "apis/tmdb";
import Header from "components/Header";

import { messages } from "./constants";

const useStyles = makeStyles(() => ({
  pageWrap: {
    minWidth: "320px",
    overflow: "hidden",
  },
}));

function App() {
  const [configs, setConfigs] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await getConfigs();
      setConfigs(res.data);
    };

    fetchData();
  }, []);

  const muiTheme = createMuiTheme(theme);
  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <Helmet>
        <title>{messages.APP.TITLE}</title>
        <meta name="description" content={messages.APP.DESCRIPTION} />
        <meta name="keywords" content={messages.APP.KEYWORDS} />
        <meta name="MobileOptimized" content="320" />
      </Helmet>
      <div className={classes.pageWrap}>
        <Router>
          <Header />
          <Switch>
            {routes.map((route) => {
              const Component = route.component;
              return route.private ? (
                <PrivateRoute
                  key={route.id}
                  path={route.path}
                  exact={!!route.exact}
                  render={(routeProps) => {
                    // TODO: change to component and provide configs in the context
                    return <Component {...routeProps} configs={configs} />;
                  }}
                />
              ) : (
                <Route
                  key={route.id}
                  path={route.path}
                  exact={!!route.exact}
                  render={(routeProps) => {
                    return <Component {...routeProps} configs={configs} />;
                  }}
                />
              );
            })}
          </Switch>
          <Redirect from="*" to="/" />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
