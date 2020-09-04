import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "reducers";

const enhancer =
  process.env.NODE_ENV !== "production" ? composeWithDevTools() : null;

const store = createStore(reducers, enhancer);

export default store;
