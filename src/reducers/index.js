import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import sortingReducer from "./sortingReducer";

const reducers = combineReducers({
  filter: filterReducer,
  sorting: sortingReducer,
});

export default reducers;
