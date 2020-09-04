import { combineReducers } from "redux";
import filterReducer from "./filterReducer";

const reducers = combineReducers({
  filter: filterReducer,
  // TODO: add the remaining reducers
});

export default reducers;
