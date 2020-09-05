import { CHANGE_SORTING_ACTION } from "actions/types";

const initialState = {
  sorting: "popularity.desc",
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORTING_ACTION:
      return {
        ...state,
        sorting: action.sorting,
      };
    default:
      return state;
  }
};

export default search;
