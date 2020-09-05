import {
  ADD_GENRES_FILTER_ACTION,
  ADD_YEAR_FILTER_ACTION,
  SEARCH_ACTION,
  CHANGE_SORTING_ACTION,
} from "./types";

export const addGenresFilter = (genres) => {
  return { genres, type: ADD_GENRES_FILTER_ACTION };
};

export const addYearFilter = (yearsRange) => {
  return { yearsRange, type: ADD_YEAR_FILTER_ACTION };
};

export const search = (query) => {
  return { query, type: SEARCH_ACTION };
};

export const changeSorting = (sorting) => {
  return { sorting, type: CHANGE_SORTING_ACTION };
};
