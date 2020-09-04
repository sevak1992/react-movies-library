import React from "react";
import PropTypes from "prop-types";
import ReactSlider from "react-slick";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";
import { Eclipse } from "react-loading-io";

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

const getSettings = (sliderSettings, itemsCount) => {
  sliderSettings.slidesToShow = Math.min(
    sliderSettings.slidesToShow,
    itemsCount
  );
  sliderSettings.responsive.forEach(({ settings }) => {
    settings.slidesToShow = Math.min(settings.slidesToShow, itemsCount);
  });
  return sliderSettings;
};

function Slider({
  items,
  loading,
  noItemsMessage,
  settings,
  nextArrow,
  prevArrow,
}) {
  const classes = useStyles();
  settings.nextArrow = nextArrow;
  settings.prevArrow = prevArrow;

  const getContent = () => {
    if (items.length) {
      return (
        <ReactSlider
          {...getSettings(settings, items.length)}
          className={classes.sliderContainer}
        >
          {items.map((item) => {
            return <SliderItemWrapper key={item.key}>{item}</SliderItemWrapper>;
          })}
        </ReactSlider>
      );
    }
    return <span>{noItemsMessage}</span>;
  };

  return loading ? <Eclipse size={64} /> : getContent();
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
  loading: PropTypes.bool,
  noItemsMessage: PropTypes.string,
  nextArrow: PropTypes.node,
  prevArrow: PropTypes.node,
};

Slider.defaultProps = {
  loading: false,
  noItemsMessage: "There is no elements to show.",
  settings: {
    infinite: true,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 1,
    lazyLoad: null,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 12,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  },
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default Slider;
