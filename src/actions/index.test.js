import { addGenresFilter, addYearFilter, resetFilter } from "./index";
import {
  ADD_GENRES_FILTER_ACTION,
  ADD_YEAR_FILTER_ACTION,
  RESET_FILTER_ACTION,
} from "./types";

describe("Redux actions", () => {
  it("should create an action to add a genres filter", () => {
    const genres = [12, 24];
    const expectedAction = {
      type: ADD_GENRES_FILTER_ACTION,
      genres,
    };
    expect(addGenresFilter(genres)).toEqual(expectedAction);
  });

  it("should create an action to add a years range filter", () => {
    const yearsRange = [1992, 2020];
    const expectedAction = {
      type: ADD_YEAR_FILTER_ACTION,
      yearsRange,
    };
    expect(addYearFilter(yearsRange)).toEqual(expectedAction);
  });

  it("should create an action to reset filters", () => {
    const expectedAction = {
      type: RESET_FILTER_ACTION,
    };
    expect(resetFilter()).toEqual(expectedAction);
  });
});
