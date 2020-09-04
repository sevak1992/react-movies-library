import { SEARCH_ACTION } from "actions/types";

const initialState = {
  query: "",
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ACTION:
      return {
        ...state,
        query: action.query,
      };
    default:
      return state;
  }
};

export default search;
