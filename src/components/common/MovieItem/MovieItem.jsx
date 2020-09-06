import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withFirebase } from "auth/firebase";
import { compose } from "recompose";
import { AuthUserContext } from "auth/session";

import NoImageSvg from "assets/noImage.svg";

import { messages } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    display: "block",
    width: "100%",
  },
  itemImage: {
    height: "24rem",
  },
  movieItem: {
    position: "relative",
    maxWidth: "17.5rem",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.015)",
    },
  },
  actions: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: 0,
    background: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  favoritesIcon: {
    cursor: "pointer",
    color: theme.palette.error.dark,
  },
}));

function MovieItemComponent({ movie, baseUrl, posterSizes, firebase }) {
  const classes = useStyles();

  const { poster_path: posterPath } = movie;
  const imageUrl = posterPath
    ? `${baseUrl}${posterSizes[3]}${posterPath}`
    : NoImageSvg;
  const { vote_average: voteAverage } = movie;
  const rating = voteAverage / 2;

  const handleFavoriteClick = (authUser, movieItem, addtoList) => {
    if (addtoList) {
      authUser.favorites[movieItem.id] = movieItem;
    } else {
      delete authUser.favorites[movieItem.id];
    }
    firebase
      .favorite(authUser.uid)
      .update({ [authUser.uid]: { ...authUser.favorites } });
  };

  const renderFavoriteIcon = (authUser, movieId) => {
    if (!authUser) {
      return null;
    }
    const state = Object.keys(authUser.favorites).includes(movieId.toString());
    return (
      <IconButton aria-label="add to favorites">
        {state ? (
          <FavoriteIcon
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return handleFavoriteClick(authUser, movie, !state);
            }}
            className={classes.favoritesIcon}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return handleFavoriteClick(authUser, movie, !state);
            }}
            className={classes.favoritesIcon}
          />
        )}
      </IconButton>
    );
  };

  return (
    <Link className={classes.link} to={`/movie/${movie.id}`}>
      <Card className={classes.movieItem}>
        <CardMedia
          image={imageUrl}
          title={movie.title}
          className={classes.itemImage}
        />
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="p" noWrap>
            {movie.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            component="p"
            noWrap
          >
            {messages.MOVIE.RELEASE_DATE}: {movie.release_date}
          </Typography>
          <Rating
            readOnly
            value={rating}
            precision={0.5}
            icon={<StarBorderIcon />}
          />
        </CardContent>
        <CardActions className={classes.actions} disableSpacing>
          <AuthUserContext.Consumer>
            {(authUser) => renderFavoriteIcon(authUser.user, movie.id)}
          </AuthUserContext.Consumer>
        </CardActions>
      </Card>
    </Link>
  );
}

MovieItemComponent.propTypes = {
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

const MovieItem = compose(withFirebase)(MovieItemComponent);
export default MovieItem;
