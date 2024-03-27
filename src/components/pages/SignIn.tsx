import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../sections/Header";

export default function SignIn({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function checkLoggedIn() {
    try {
      const response = await axios.get("http://localhost:3001/check-login", {
        withCredentials: true,
      });
      if (response.data.isLoggedIn) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    console.log(event);
    try {
      const response = await axios.post(
        "http://localhost:3001/log-in",
        { username: username, password: password },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
      setIsLoggedIn(false);
    }
  }

  async function handleLogout(event) {
    try {
      const response = await axios.get("http://localhost:3001/log-out", {
        withCredentials: true,
      });
      console.log(response);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  // async function handleLogin(event) {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3001/log-in", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: username, password: password }),
  //     });

  //     if (!response.ok) {
  //       console.log(response);
  //       throw new Error("Login failed");
  //     }

  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // }

  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />
      <div>
        {/* <button onClick={checkLoggedIn}>Check log in</button> */}
        {isLoggedIn ? (
          <div>
            <p>You are logged in</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <div>
            <p>You are NOT logged in</p>
          </div>
        )}
        {!isLoggedIn ? (
          <div>
            <form method="POST" onSubmit={handleLogin}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log In</button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}
