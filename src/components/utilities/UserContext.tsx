import React from "react";
import { useEffect, useContext, useReducer } from "react";
import { checkLoggedIn } from "./api";

const initialAuthState = {
  isLoggedIn: false,
  user: "",
  userId: "",
  dataLoading: true,
  showLoginPopup: false,
};

const UserContext = React.createContext(initialAuthState);

export const UserDataProvider = ({ children }) => {
  // Reducer types
  const CHECK_LOGIN_SUCCESS = "CHECK_LOGIN_SUCCESS";
  const CHECK_LOGIN_FAILURE = "CHECK_LOGIN_FAILURE";
  const CHECK_LOGIN_FINISHED = "CHECK_LOGIN_FINISHED";
  const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  const LOGIN_FAILURE = "LOGIN_FAILURE";
  const LOGOUT = "LOGOUT";
  const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
  const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";

  function authStateReducer(state, payload) {
    switch (payload.type) {
      case OPEN_LOGIN_MODAL:
        return {
          ...state,
          showLoginPopup: true,
        };
      case CLOSE_LOGIN_MODAL:
        return {
          ...state,
          showLoginPopup: false,
        };
      case CHECK_LOGIN_SUCCESS:
        return {
          ...state,
          user: payload.action.data.user.username,
          userId: payload.action.data.user.id,
          isLoggedIn: true,
        };
      case CHECK_LOGIN_FAILURE:
        return {
          ...state,
          user: "",
          userId: "",
          isLoggedIn: false,
        };
      case CHECK_LOGIN_FINISHED:
        return {
          ...state,
          dataLoading: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: payload.action.data.user.username,
          userId: payload.action.data.user._id,
          isLoggedIn: true,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          user: "",
          userId: "",
          isLoggedIn: false,
        };
      case LOGOUT:
        return {
          ...state,
          user: "",
          userId: "",
          isLoggedIn: false,
        };
      default:
        state;
    }
  }

  const [authState, dispatch] = useReducer(authStateReducer, initialAuthState);

  // Check if the user is logged in at the page mount and then set the user
  useEffect(() => {
    checkLoggedIn(dispatch);
  }, [dispatch]);

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <UserContext.Provider value={{ authState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
