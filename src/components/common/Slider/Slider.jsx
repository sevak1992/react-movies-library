import React from "react";
import PropTypes from "prop-types";
import ReactSlider from "react-slick";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowBtn from "./ArrowBtn";
import SliderItemWrapper from "./SliderItemWrapper";

const useStyles = makeStyles(() => ({
  sliderContainer: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  arrowBtn: {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
  },
  nextBtn: {
    right: "-1rem",
  },
  prevBtn: {
    left: "-1rem",
  },
}));

function NextArrow({ onClick }) {
  const classes = useStyles();
  return (
    <ArrowBtn
      className={`${classes.arrowBtn} ${classes.nextBtn}`}
      onClick={onClick}
      icon={<KeyboardArrowRightIcon />}
    />
  );
}

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

NextArrow.defaultProps = {
  onClick: () => {},
};

function PrevArrow({ onClick }) {
  const classes = useStyles();
  return (
    <ArrowBtn
      className={`${classes.arrowBtn} ${classes.prevBtn}`}
      onClick={onClick}
      icon={<KeyboardArrowLeftIcon />}
    />
  );
}

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

PrevArrow.defaultProps = {
  onClick: () => {},
};

function Slider({ items, settings, nextArrow, prevArrow }) {
  const classes = useStyles();
  settings.nextArrow = nextArrow;
  settings.prevArrow = prevArrow;
  const sliderItems = items.map((item) => {
    return <SliderItemWrapper key={item.key}>{item}</SliderItemWrapper>;
  });
  return (
    <ReactSlider {...settings} className={classes.sliderContainer}>
      {sliderItems}
    </ReactSlider>
  );
}

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  settings: PropTypes.shape({
    speed: PropTypes.number,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    initialSlide: PropTypes.number,
    lazyLoad: PropTypes.oneOf([null, "ondemand", "progressive"]),
    responsive: PropTypes.arrayOf(
      PropTypes.shape({
        breakpoint: PropTypes.number,
        settings: PropTypes.shape({
          slidesToShow: PropTypes.number,
          slidesToScroll: PropTypes.number,
          initialSlide: PropTypes.number,
        }),
      })
    ),
  }),
  nextArrow: PropTypes.node,
  prevArrow: PropTypes.node,
};

Slider.defaultProps = {
  settings: {
    infinite: true,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 12,
    lazyLoad: null,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 10,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  },
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default Slider;
