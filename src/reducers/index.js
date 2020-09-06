import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import userReducer from "./userReducer";
import sortingReducer from "./sortingReducer";

const reducers = combineReducers({
  filter: filterReducer,
  sorting: sortingReducer,
  user: userReducer,
});

export default reducers;
