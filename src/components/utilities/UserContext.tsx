import React from "react";
import { useEffect, useContext, useReducer } from "react";
import { checkLoggedIn } from "./api";

export interface AuthStateTypes {
  isLoggedIn: boolean;
  user: string;
  userId: string;
  dataLoading: boolean;
  showLoginPopup: boolean;
}

const initialAuthState: AuthStateTypes = {
  isLoggedIn: false,
  user: "",
  userId: "",
  dataLoading: true,
  showLoginPopup: false,
};

export type Action =
  | { type: "OPEN_LOGIN_MODAL" }
  | { type: "CLOSE_LOGIN_MODAL" }
  | {
      type: "CHECK_LOGIN_SUCCESS";
      action: {
        data: {
          user: {
            username: string;
            id: string;
          };
        };
      };
    }
  | { type: "CHECK_LOGIN_FAILURE" }
  | { type: "CHECK_LOGIN_FINISHED" }
  | {
      type: "LOGIN_SUCCESS";
      action: {
        data: {
          user: {
            username: string;
            _id: string;
          };
        };
      };
    }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" };

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  function authStateReducer(
    state: AuthStateTypes,
    payload: Action
  ): AuthStateTypes {
    switch (payload.type) {
      case "OPEN_LOGIN_MODAL":
        return {
          ...state,
          showLoginPopup: true,
        };
      case "CLOSE_LOGIN_MODAL":
        return {
          ...state,
          showLoginPopup: false,
        };
      case "CHECK_LOGIN_SUCCESS":
        return {
          ...state,
          user: payload.action.data.user.username,
          userId: payload.action.data.user.id,
          isLoggedIn: true,
        };
      case "CHECK_LOGIN_FAILURE":
        return {
          ...state,
          user: "",
          userId: "",
          isLoggedIn: false,
        };
      case "CHECK_LOGIN_FINISHED":
        return {
          ...state,
          dataLoading: false,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: payload.action.data.user.username,
          userId: payload.action.data.user._id,
          isLoggedIn: true,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          user: "",
          userId: "",
          isLoggedIn: false,
        };
      case "LOGOUT":
        return {
          ...state,
          user: "",
          userId: "",
          isLoggedIn: false,
        };
      default:
        return state;
    }
  }

  const [authState, dispatch] = useReducer(authStateReducer, initialAuthState);

  // API call to check if the user is logged in
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

const UserContext = React.createContext<{
  authState: AuthStateTypes;
  dispatch: React.Dispatch<Action>;
}>({
  authState: initialAuthState,
  dispatch: () => null,
});

export const useUser = () => useContext(UserContext);
