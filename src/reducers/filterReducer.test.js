import filterReducer from "./filterReducer";

describe("filterReducer", () => {
  it("should sets up initial state", () => {
    const state = filterReducer(undefined, {
      type: "@@INIT",
    });

    expect(state).toEqual({
      genres: [],
      yearsRange: null,
    });
  });

  it("should adds genres filter", () => {
    const initial = {
      genres: [],
      yearsRange: null,
    };
    const action = {
      type: "ADD_GENRES_FILTER_ACTION",
      genres: [12, 24],
    };

    const state = filterReducer(initial, action);

    expect(state).toEqual({
      yearsRange: null,
      genres: [12, 24],
    });
  });

  it("should adds years range filter", () => {
    const initial = {
      genres: [],
      yearsRange: null,
    };
    const action = {
      type: "ADD_YEAR_FILTER_ACTION",
      yearsRange: [1992, 2020],
    };

    const state = filterReducer(initial, action);

    expect(state).toEqual({
      yearsRange: [1992, 2020],
      genres: [],
    });
  });

  it("should sets multiple filters", () => {
    const initial = {
      genres: [],
      yearsRange: null,
    };
    let action = {
      type: "ADD_YEAR_FILTER_ACTION",
      yearsRange: [1992, 2020],
    };
    let state = filterReducer(initial, action);

    action = {
      type: "ADD_GENRES_FILTER_ACTION",
      genres: [12, 24],
    };
    state = filterReducer(state, action);

    expect(state).toEqual({
      yearsRange: [1992, 2020],
      genres: [12, 24],
    });
  });

  it("should resets filters", () => {
    const initial = {
      genres: [],
      yearsRange: null,
    };
    let action = {
      type: "ADD_YEAR_FILTER_ACTION",
      yearsRange: [1992, 2020],
    };
    let state = filterReducer(initial, action);

    action = {
      type: "ADD_GENRES_FILTER_ACTION",
      genres: [12, 24],
    };
    state = filterReducer(state, action);

    expect(state).toEqual({
      yearsRange: [1992, 2020],
      genres: [12, 24],
    });

    action = {
      type: "RESET_FILTER_ACTION",
    };
    state = filterReducer(state, action);

    expect(state).toEqual({
      yearsRange: null,
      genres: [],
    });
  });
});
