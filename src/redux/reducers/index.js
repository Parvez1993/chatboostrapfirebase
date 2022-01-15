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
    case actionTypes.REMOVE_USERPIC:
      return {
        ...state,
        photoURL: "",
      };
    default:
      return state;
  }
};

const groupinitialState = {
  currentGroup: null,
};
const group_reducer = (state = groupinitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload.currentGroup,
      };
    default:
      return state;
  }
};

const friend_reducer = (state = groupinitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_FRIEND:
      return {
        ...state,
        currentFriend: action.payload.currentFriend,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: user_reducer,
  group: group_reducer,
  friend: friend_reducer,
});
