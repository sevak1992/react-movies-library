import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import ScrollToTop from "react-scroll-up";

import theme from "theme";
import { withAuthentication } from "auth/session";
import { PrivateRoute } from "routes/PrivateRoute";
import routes from "routes";
import Header from "components/Header";
import { TmdbContext } from "tmdbConfigs";

import { messages } from "./constants";

const useStyles = makeStyles(({ palette }) => ({
  pageWrap: {
    minWidth: "320px",
    overflow: "hidden",
  },
  scrollToTopBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "2rem",
    border: `1px solid ${palette.info.main}`,
    borderRadius: "50%",
  },
}));

function App() {
  const muiTheme = createMuiTheme(theme);
  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <TmdbContext.Provider value={{}}>
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
              {Object.values(routes).map((route) => {
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
                    component={Component}
                  />
                );
              })}
            </Switch>
          </Router>
          <ScrollToTop showUnder={480}>
            <div className={classes.scrollToTopBtn}>
              <VerticalAlignTopIcon color="primary" />
            </div>
          </ScrollToTop>
        </div>
      </TmdbContext.Provider>
    </ThemeProvider>
  );
}

export default withAuthentication(App);
