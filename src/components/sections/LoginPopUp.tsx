import { useState } from "react";
import { useUser } from "../utilities/UserContext";
import axios from "axios";

export default function LogInPopUp({ showLoginPopup, setShowLoginPopup }) {
  const { authState, dispatch } = useUser();
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [usernameSignup, setUsernameSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");

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
        type: "LOGIN_SUCCESS",
        action: response,
      });
      setShowLoginPopup(false);
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch({
        type: "LOGIN_FAILURE",
      });
    }
  }

  function handleBackgroundClick() {
    setShowLoginPopup(false);
  }

  return (
    <>
      <div
        onClick={handleBackgroundClick}
        className={` fixed left-0 top-0  h-full w-full bg-[black] ${showLoginPopup ? "pointer-events-auto z-[100] opacity-50" : "pointer-events-none z-[0] opacity-0"} transition-all`}
      ></div>
      <div
        className={` fixed left-[50%] flex w-[450px] translate-x-[-50%] translate-y-[-50%] transform flex-col items-start  justify-center bg-[#1c1c1c] pb-10 pl-20 pr-20 pt-10 outline outline-[1px] outline-[#2e2e2e] transition-all ${showLoginPopup ? "pointer-events-auto top-[50%] z-[110] opacity-[1]" : "pointer-events-none top-[40%] z-0 opacity-[0]"}`}
      >
        <div className="flex w-full flex-col gap-5">
          <div className=" mb-6">
            <p className="mb-1 text-start text-3xl font-medium">YoGato</p>
            <p className="text-start text-sm font-medium text-[#A0A0A0]">
              Sign in to your account
            </p>
          </div>

          <div className="w-full">
            <a href="http://localhost:3001/login/federated/google/">
              <button className="w-full border-[1px] border-[#3D3D3D] bg-[#2e2e2e] text-white outline-none transition-all duration-200 hover:border-[#505050] hover:bg-[#343434] focus:outline-none">
                Continue with Google
              </button>
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center ">
              <div className="border-strong w-full border-t border-[#3D3D3D]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className=" text-foreground bg-[#1c1c1c] px-2 text-sm">
                or
              </span>
            </div>
          </div>
          <div>
            <form
              method="POST"
              onSubmit={handleLogin}
              className="flex flex-col items-start justify-center"
            >
              <div className=" flex w-full flex-col items-start justify-center gap-5">
                <div className="flex w-full flex-col items-start justify-center gap-2">
                  <label
                    htmlFor="username-login"
                    className="text-sm font-medium text-[#A0A0A0]"
                  >
                    Username
                  </label>
                  <input
                    id="username-login"
                    name="username-login"
                    placeholder="GracefulCat"
                    type="text"
                    value={usernameLogin}
                    onChange={(e) => setUsernameLogin(e.target.value)}
                    className=" h-9 w-full rounded-md border-[1px] border-[#3D3D3D] bg-[#212121] pb-2 pl-4 pr-4 pt-2 outline outline-[2px] outline-transparent transition-all placeholder:text-[#ededed80] focus:border-[#707070] focus:outline-[#232323]"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-2">
                  <label
                    htmlFor="password-login"
                    className="text-sm font-medium text-[#A0A0A0]"
                  >
                    Password
                  </label>
                  <input
                    id="password-login"
                    name="password-login"
                    type="password"
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    className=" h-9 w-full rounded-md border-[1px] border-[#3D3D3D] bg-[#212121] pb-2 pl-4 pr-4 pt-2 outline outline-[2px] outline-transparent transition-all placeholder:text-[#ededed50] focus:border-[#707070] focus:outline-[#232323]"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="border-box mt-4 w-full border-[1px] border-[#6ccc93] bg-[#54976f] text-white outline-none transition-all duration-200 hover:border-[#6ccc93] hover:bg-[#497f5e] focus:outline-none"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
          <div>
            <p className="text-sm font-medium text-[#A0A0A0]">
              Don't have an account?{" "}
              <span className="text-sm font-medium text-[white] hover:cursor-pointer hover:underline">
                Sign Up Now
              </span>
            </p>
          </div>

          {/* <div>
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
          </div> */}
        </div>
      </div>
    </>
  );
}
