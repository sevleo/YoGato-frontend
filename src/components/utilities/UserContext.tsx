import React from "react";
import { useEffect, useContext, useReducer } from "react";
import axios from "axios";

const initialAuthState = {
  isLoggedIn: false,
  user: "test user",
  dataLoading: true,
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

  function authStateReducer(state, payload) {
    switch (payload.type) {
      case CHECK_LOGIN_SUCCESS:
        return {
          ...state,
          user: payload.action.data.user.username,
          isLoggedIn: true,
        };
      case CHECK_LOGIN_FAILURE:
        return {
          ...state,
          user: "",
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
          isLoggedIn: true,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          user: "",
          isLoggedIn: false,
        };
      case LOGOUT:
        return {
          ...state,
          user: "",
          isLoggedIn: false,
        };
      default:
        state;
    }
  }

  const [authState, dispatch] = useReducer(authStateReducer, initialAuthState);

  // Check if the user is logged in at the page mount and then set the user
  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const response = await axios.get("http://localhost:3001/check-login", {
          withCredentials: true,
        });
        if (response.data.isLoggedIn) {
          console.log(response.data);
          dispatch({
            type: "CHECK_LOGIN_SUCCESS",
            action: response,
          });
        } else {
          console.log(response.data);
        }
      } catch (error) {
        dispatch({
          type: "CHECK_LOGIN_FAILURE",
        });
      } finally {
        dispatch({
          type: "CHECK_LOGIN_FINISHED",
        });
      }
    }
    checkLoggedIn();
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ authState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
