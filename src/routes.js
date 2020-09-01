import Home from './containers/Home';
import Details from './containers/Details';

const routes = [
    {
        id: 1,
        path: '/',
        exact: true,
        component: Home
    },
    {
        id: 2,
        path: '/movie/:id',
        component: Details
    }
];

export default routes;
