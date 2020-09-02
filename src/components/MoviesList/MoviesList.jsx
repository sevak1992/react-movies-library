import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

import { getPopularMovies } from "apis/tmdb";
import MovieItem from "components/MovieItem";

function MoviesList({ configs, xs, sm, md, lg, xl }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getPopularMovies(page);
      // movies = movies.concat(res.data.results);
      setMovies([...movies.concat(res.data.results)]);
    };
    fetchData();
  }, [page]);

  const loadMore = React.useCallback(() => {
    setPage(page + 1);
  }, []);

  if (!configs.images) {
    return "";
  }

  const { base_url: baseUrl, poster_sizes: posterSizes } = configs.images;

  return (
    <>
      {movies.length > 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          // TODO: check if there is more movies
          hasMore
          // TODO: improve loader text
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          <Grid container justify="center" spacing={3}>
            {movies.map((movie) => (
              <Grid key={movie.id} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                <MovieItem
                  movie={movie}
                  baseUrl={baseUrl}
                  posterSizes={posterSizes}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </>
  );
}

MoviesList.propTypes = {
  // movies: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     original_title: PropTypes.string,
  //     title: PropTypes.string,
  //     vote_average: PropTypes.number,
  //     release_date: PropTypes.string,
  //   })
  // ).isRequired,
  // loadMore: PropTypes.func.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string,
      poster_sizes: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

MoviesList.defaultProps = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  xl: 3,
};

export default MoviesList;
