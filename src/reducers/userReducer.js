import { USER_LOG_IN_ACTION, USER_LOG_OUT_ACTION } from "actions/types";

const initialState = {
  user: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOG_OUT_ACTION:
      return {
        user: null,
      };
    case USER_LOG_IN_ACTION:
      return {
        user: action.data,
      };
    default:
      return state;
  }
};

export default user;
