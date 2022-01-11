import * as actionTypes from "./type.js";

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const removeUser = () => {
  return {
    type: actionTypes.REMOVE_USER,
  };
};

export const setUserPic = (photo) => {
  return {
    type: actionTypes.SET_USERPIC,
    payload: {
      photoURL: photo,
    },
  };
};
