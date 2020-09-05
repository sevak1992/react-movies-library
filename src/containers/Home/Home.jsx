import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import LoadingIndicator from "components/common/LoadingIndicator";
import HomeContent from "components/HomeContent";
import Header from "containers/Header";
import { getMovies } from "apis/tmdb";

function Home({ configs }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const filter = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sorting);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies(1, filter, sorting);
        if (res.data.total_pages === 1) {
          setHasMore(false);
        }
        setMovies([...res.data.results]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [filter, sorting]);

  const loadMore = async (loadPage) => {
    try {
      const res = await getMovies(loadPage + 1, filter, sorting);
      if (res.data.total_pages === loadPage + 1) {
        setHasMore(false);
      }
      setMovies((m) => [...m.concat(res.data.results)]);
    } catch (err) {
      setHasMore(false);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <LoadingIndicator isFullScrean />
      ) : (
        <HomeContent
          configs={configs}
          loadMore={loadMore}
          movies={movies}
          error={error}
          hasMore={hasMore}
        />
      )}
    </>
  );
}

Home.propTypes = {
  configs: PropTypes.object.isRequired,
};

export default Home;
