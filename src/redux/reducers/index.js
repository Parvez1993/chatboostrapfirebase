import { combineReducers } from "redux";
import * as actionTypes from "../action/type.js";

const initialState = {
  currentUser: "",
  isLoading: true,
  photoURL: "",
};

//user reducer
const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false,
      };

    case actionTypes.REMOVE_USER:
      return {
        ...state,
        currentUser: "",
        isLoading: false,
      };
    case actionTypes.SET_USERPIC:
      return {
        ...state,
        photoURL: action.payload.photoURL,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: user_reducer,
});
