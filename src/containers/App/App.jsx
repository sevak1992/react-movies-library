import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../routes';

function App() {
  return (
    <div
        className="page-wrap"
    >
      <Router>
        <Switch>
          {routes.map((route) => {
            const Component = route.component;
            return (
              <Route
                key={route.id}
                path={route.path}
                exact={!!route.exact}
                render={Component}
              />
            );
          })}
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
