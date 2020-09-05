import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import searchReducer from "./searchReducer";
import sortingReducer from "./sortingReducer";

const reducers = combineReducers({
  filter: filterReducer,
  search: searchReducer,
  sorting: sortingReducer,
});

export default reducers;
