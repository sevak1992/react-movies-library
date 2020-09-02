import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import theme from "theme";
import { PrivateRoute } from "routes/PrivateRoute";
import routes from "routes";
import { getConfigs } from "apis/tmdb";

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

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="page-wrap">
        <Router>
          <Switch>
            {routes.map((route) => {
              const Component = route.component;
              return route.private ? (
                <PrivateRoute
                  key={route.id}
                  path={route.path}
                  exact={!!route.exact}
                  component={Component}
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
