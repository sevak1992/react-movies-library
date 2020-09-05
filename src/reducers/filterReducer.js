import {
  ADD_GENRES_FILTER_ACTION,
  ADD_YEAR_FILTER_ACTION,
  RESET_FILTER_ACTION,
} from "actions/types";

const initialState = {
  genres: [],
  yearsRange: null,
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GENRES_FILTER_ACTION:
      return {
        ...state,
        genres: action.genres,
      };
    case ADD_YEAR_FILTER_ACTION:
      return {
        ...state,
        yearsRange: action.yearsRange,
      };
    case RESET_FILTER_ACTION:
      return {
        genres: [],
        yearsRange: null,
      };
    default:
      return state;
  }
};

export default filter;
