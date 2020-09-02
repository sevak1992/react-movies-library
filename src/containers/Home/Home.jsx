import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import MoviesList from "components/MoviesList";
import { getPopularMovies } from "apis/tmdb";
import Header from "containers/Header";

function Home({ configs }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getPopularMovies();
      setMovies(res.data.results);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="main-content">
        <MoviesList movies={movies} configs={configs} />
      </div>
    </>
  );
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
