import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import searchReducer from "./searchReducer";

const reducers = combineReducers({
  filter: filterReducer,
  search: searchReducer,
  // TODO: add the remaining reducers
});

export default reducers;
