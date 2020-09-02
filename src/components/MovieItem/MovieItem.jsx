import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  itemImage: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

function MovieItem({ movie, baseUrl, posterSizes }) {
  const classes = useStyles();
  const imageUrl = `${baseUrl}${posterSizes[3]}${movie.poster_path}`;
  const { vote_average: voteAverage } = movie;
  const rating = voteAverage / 2;
  return (
    <Card className="movie-item">
      <CardMedia
        image={imageUrl}
        title={movie.title}
        className={classes.itemImage}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          component="p"
          noWrap
        >
          {movie.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          component="p"
          noWrap
        >
          {movie.release_date}
        </Typography>
        <Rating
          readOnly
          value={rating}
          precision={0.5}
          icon={<StarBorderIcon />}
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    original_title: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  baseUrl: PropTypes.string.isRequired,
  posterSizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieItem;
