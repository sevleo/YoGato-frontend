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

  async function handleLogin(event) {
    event.preventDefault();
    console.log(event);
    try {
      const response = await axios.post("http://localhost:3001/log-in", {
        username: username,
        password: password,
      });
      console.log(response);
    } catch (error) {
      console.error("Error logging in:", error);
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
        <h2>Log In</h2>
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
      </div>
    </>
  );
}
