import {
  ADD_GENRES_FILTER_ACTION,
  ADD_YEAR_FILTER_ACTION,
  CHANGE_SORTING_ACTION,
  RESET_FILTER_ACTION,
  USER_LOG_IN_ACTION,
  USER_LOG_OUT_ACTION,
} from "./types";

export const addGenresFilter = (genres) => {
  return { genres, type: ADD_GENRES_FILTER_ACTION };
};

export const addYearFilter = (yearsRange) => {
  return { yearsRange, type: ADD_YEAR_FILTER_ACTION };
};

export const changeSorting = (sorting) => {
  return { sorting, type: CHANGE_SORTING_ACTION };
};

export const resetFilter = () => {
  return { type: RESET_FILTER_ACTION };
};
export const logInAction = (value) => {
  return { type: USER_LOG_IN_ACTION, data: value };
};

export const logOutAction = (value) => {
  return { type: USER_LOG_OUT_ACTION, data: value };
};
