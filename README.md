# React Movies Library

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

[The application published and available here](https://sevak1992.github.io/react-movies-library/)

The SPA built with Reach to search, filter and sort movie list, see the details, movie suggestions and add to favorites when user is authorized. The application uses the [TMDB public API](https://developers.themoviedb.org/3/getting-started/introduction). The application includes the following features:

- User Login and Signup
- Movie listing with search/filter/sort functionalities
- Movie Details page with movie suggestions
- Favorites page for authorized users | users can add/remove the movie to/from favorites list
- Guest users can see the Movie Listing and Details pages | the only limitaion is Favorites page (only authorized users can see and use that functionality)

**Note:** The application is responive and has adaptive UI, supports desktop/tablet/mobile devices.

# Prerequisites

- Node v12+ and yarn: v1.22.5+ (or npm: v6.9.0+)

# Installing | building | running

The steps to run the application locally:

```sh
$ git clone https://github.com/sevak1992/react-movies-library.git
$ cd react-movies-library
$ yarn #or npm install
$ npm start
```

After running the **npm start** command please navigate to http://localhost:3000/ to see the hosted application.

#### Required Environment variables:

Additional steps are needed if you want to run or publish the application yourself. The following enviroment variables are needed (See the [.env.example file](https://github.com/sevak1992/react-movies-library/blob/master/.env.example)):

```sh
REACT_APP_TMDB_API_KEY=
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_MEASUREMENT_ID=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_APP_ID=
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm lint`

The linter statically analyzes your code to quickly find problems.

# Used technologies

- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/) - authentication and saving favorite movies in remote DB
- [Material UI](https://v3.material-ui.com/)

# Code structure

    .
    ├── ...
    ├── actions                    # redux actions list
    ├── apis                       # tmdb API
    ├── assets                     # project assets here
    ├── auth                       # Firebase auth and session logic
    ├── components
    │   ├── common
    │   |   ├── ComomnComponent
    │   |   |   ├── ComomnComponent.jsx
    |   |   |   ├── index.js
    │   |   ├── ...
    │   ├── ExampleComponent
    │   |   ├── ExampleComponent.jsx
    │   |   ├── index.js
    │   ├── ...
    ├── constants
    ├── pages
    │   ├── Home
    │   ├── Details
    │   ├── ...
    ├── reducers                     # redux reducers list
    ├── routes                       # application private and public routes
    ├── tmdbConfigs
    ├── utils
    ├── App.jsx
    ├── index.js
    ├── theme.js
    ├── store.js
    └── ...

# UpComing Features or what to be done next!

- Add new sections separate for TV shows, movies
- Add new page for actors
- Add new filters by actors, budget, etc..

## License

MIT
