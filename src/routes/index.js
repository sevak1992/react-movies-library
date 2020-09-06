import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Favorites from "pages/Favorites";
import Details from "pages/Details";
import Search from "pages/Search";

const basePath =
  process.env.NODE_ENV !== "production" ? "" : process.env.PUBLIC_URL;

const routes = {
  home: {
    id: 1,
    path: `${basePath}/`,
    exact: true,
    private: false,
    component: Home,
  },
  details: {
    id: 2,
    path: `${basePath}/movie/:id`,
    exact: true,
    private: false,
    component: Details,
  },
  login: {
    id: 3,
    path: `${basePath}/log-in`,
    exact: true,
    private: false,
    component: Login,
  },
  signup: {
    id: 4,
    path: `${basePath}/sign-up`,
    exact: true,
    private: false,
    component: SignUp,
  },
  favorites: {
    id: 5,
    path: `${basePath}/favorites`,
    exact: true,
    private: true,
    component: Favorites,
  },
  search: {
    id: 6,
    path: `${basePath}/search/:query`,
    exact: true,
    private: false,
    component: Search,
  },
};

export { basePath };

export default routes;
