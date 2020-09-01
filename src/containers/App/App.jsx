import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'

import routes from 'routes';
import store from 'store';

function App() {
  return (
    <div
        className="page-wrap"
    >
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
