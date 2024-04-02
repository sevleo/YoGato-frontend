import { useEffect, useState } from "react";
import { Dispatch, useReducer, SetStateAction } from "react";
import axios from "axios";
import Header from "../sections/Header";

export default function SignIn({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}) {
  const initialAuthState = {
    isLoggedIn: false,
    user: "",
    dataLoading: true,
  };

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

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [usernameSignup, setUsernameSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  async function checkLoggedIn() {
    try {
      const response = await axios.get("http://localhost:3001/check-login", {
        withCredentials: true,
      });
      if (response.data.isLoggedIn) {
        console.log(response.data);
        dispatch({
          type: CHECK_LOGIN_SUCCESS,
          action: response,
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      dispatch({
        type: CHECK_LOGIN_FAILURE,
      });
    } finally {
      dispatch({
        type: CHECK_LOGIN_FINISHED,
      });
    }
  }

  // Check if the user is logged in at the page mount and then set the user
  useEffect(() => {
    checkLoggedIn();
  }, []);

  async function handleSignup(event) {
    event.preventDefault();
    console.log(event);
    try {
      const response = await axios.post("http://localhost:3001/sign-up", {
        username: usernameSignup,
        password: passwordSignup,
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    console.log(event);
    try {
      const response = await axios.post(
        "http://localhost:3001/login/password",
        { username: usernameLogin, password: passwordLogin },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: LOGIN_SUCCESS,
        action: response,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch({
        type: LOGIN_FAILURE,
      });
    }
  }

  async function handleLogout(event) {
    try {
      const response = await axios.get("http://localhost:3001/log-out", {
        withCredentials: true,
      });
      console.log(response);
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  function handleLoginButtonClick() {
    setShowLoginPopup(true);
  }

  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />
      {authState.dataLoading ? (
        <div></div>
      ) : (
        <div>
          {/* <button onClick={checkLoggedIn}>Check log in</button> */}
          {authState.isLoggedIn ? (
            <div>
              <p>Welcome, {authState.user}</p>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <>
              <div>
                <button onClick={handleLoginButtonClick}>Login</button>
              </div>
            </>
          )}

          <div
            className={`fixed left-[50%]  translate-x-[-50%] translate-y-[-50%] transform bg-[#ffffff43] transition-all ${showLoginPopup ? "top-[50%] opacity-[1]" : "top-[40%] z-0 opacity-[0]"}`}
          >
            <div>
              <form method="POST" onSubmit={handleLogin}>
                <label htmlFor="username-login">Username</label>
                <input
                  id="username-login"
                  name="username-login"
                  placeholder="username"
                  type="text"
                  value={usernameLogin}
                  onChange={(e) => setUsernameLogin(e.target.value)}
                />
                <label htmlFor="password-login">Password</label>
                <input
                  id="password-login"
                  name="password-login"
                  type="password"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
                <button type="submit">Log In</button>
              </form>
              <div>
                <a href="http://localhost:3001/login/federated/google/">
                  <button>Google Login</button>
                </a>
              </div>
            </div>
            <div>
              <p>Or sign up:</p>
            </div>
            <div>
              <form method="POST" onSubmit={handleSignup}>
                <label htmlFor="username-signup">Username</label>
                <input
                  id="username-signup"
                  name="username-signup"
                  placeholder="username"
                  type="text"
                  value={usernameSignup}
                  onChange={(e) => setUsernameSignup(e.target.value)}
                />
                <label htmlFor="password-signup">Password</label>
                <input
                  id="password-signup"
                  name="password-signup"
                  type="password"
                  value={passwordSignup}
                  onChange={(e) => setPasswordSignup(e.target.value)}
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
