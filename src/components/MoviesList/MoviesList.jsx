import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { compose } from "recompose";

import { withConfigs } from "tmdbConfigs";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import LoadingIndicator from "components/common/LoadingIndicator";
import MovieItem from "components/common/MovieItem";
import Heading from "components/common/Heading";

const useStyles = makeStyles(() => ({
  listingContainer: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
}));

function MoviesList({
  movies,
  hasMore,
  loadMore,
  configs,
  xs,
  sm,
  md,
  lg,
  xl,
  title,
}) {
  const classes = useStyles();
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
          hasMore={hasMore}
          loader={
            <Box key={0} display="flex" justifyContent="center" mt={3}>
              <LoadingIndicator />
            </Box>
          }
        >
          <Grid
            container
            justify="center"
            spacing={3}
            className={classes.listingContainer}
          >
            {title && (
              <Grid container>
                <Heading text={title} />
              </Grid>
            )}
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
  hasMore: PropTypes.bool,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
  loadMore: PropTypes.func.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  title: PropTypes.string,
  configs: PropTypes.shape({
    images: PropTypes.shape({
      base_url: PropTypes.string.isRequired,
      poster_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
};

MoviesList.defaultProps = {
  xs: 12,
  sm: 4,
  md: 4,
  lg: 3,
  xl: 3,
  hasMore: true,
  title: "",
};

export default compose(withConfigs)(MoviesList);
