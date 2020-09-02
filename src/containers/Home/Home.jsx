import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import MoviesList from "components/MoviesList";
import { getPopularMovies } from "apis/tmdb";
import Header from "containers/Header";
import MainContent from "components/common/MainContent";

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
      <MainContent>
        <MoviesList movies={movies} configs={configs} />
      </MainContent>
    </>
  );
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
