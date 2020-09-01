import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import theme from "theme";

import routes from "routes";

function App() {
  const muiTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="page-wrap">
        <Router>
          <Switch>
            {routes.map((route) => {
              const Component = route.component;
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  exact={!!route.exact}
                  component={Component}
                />
              );
            })}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
