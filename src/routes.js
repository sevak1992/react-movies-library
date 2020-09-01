import Home from "./containers/Home";
import Login from "./containers/Login";
import SignIn from "./containers/SignIn";
import Favorites from "./containers/Favorites";
import Details from "./containers/Details";

const routes = [
  {
    id: 1,
    path: "/",
    exact: true,
    private: false,
    component: Home,
  },
  {
    id: 2,
    path: "/movie/:id",
    exact: true,
    private: false,
    component: Details,
  },
  {
    id: 3,
    path: "/log-in",
    exact: true,
    private: false,
    component: Login,
  },
  {
    id: 4,
    path: "/sign-in",
    exact: true,
    private: false,
    component: SignIn,
  },
  {
    id: 5,
    path: "/favorites",
    exact: true,
    private: true,
    component: Favorites,
  },
];

export default routes;
