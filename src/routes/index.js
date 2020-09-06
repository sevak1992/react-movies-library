import Home from "pages/Home";
import Login from "pages/Login";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Favorites from "pages/Favorites";
import Details from "pages/Details";
import Search from "pages/Search";

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
    path: "/sign-up",
    exact: true,
    private: false,
    component: SignUp,
  },
  {
    id: 6,
    path: "/favorites",
    exact: true,
    private: true,
    component: Favorites,
  },
  {
    id: 7,
    path: "/search/:query",
    exact: true,
    private: false,
    component: Search,
  },
];

export default routes;
