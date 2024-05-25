import { useEffect, useState } from "react";
import { useUser } from "../utilities/UserContext";
import { signup, login } from "../utilities/api";
import Input from "../buildingBlocks/Input";
import Button from "../buildingBlocks/Button";
import { useNavigate } from "react-router-dom";

export default function LogInPopUp() {
  const { authState, dispatch } = useUser();

  function handleBackgroundClick() {
    dispatch({
      type: "CLOSE_LOGIN_MODAL",
    });
  }

  return (
    <>
      <div
        className={`fixed top-0 flex h-full w-full ${authState.showLoginPopup ? "pointer-events-auto z-[1000]" : "pointer-events-none"}`}
      >
        <div
          onClick={handleBackgroundClick}
          className={` fixed left-0 top-0  h-full w-full bg-[black] ${authState.showLoginPopup ? "pointer-events-auto z-[100] opacity-50" : "pointer-events-none z-[0] opacity-0"} transition-all`}
        ></div>
        <div
          className={` m-auto mt-auto h-auto max-h-[100%] w-[450px] flex-col items-start justify-center  overflow-auto bg-[#1c1c1c]  outline outline-[1px] outline-[#2e2e2e] transition-all ${authState.showLoginPopup ? "pointer-events-auto  z-[110] opacity-[1]" : "pointer-events-none z-0 opacity-[0]"}`}
        >
          <LogInForm type="popup"></LogInForm>
        </div>
      </div>
    </>
  );
}

interface LogInFormProps {
  type: string;
}

export function LogInForm({ type }: LogInFormProps) {
  const { authState, dispatch } = useUser();
  const [usernameLogin, setUsernameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [usernameSignup, setUsernameSignup] = useState<string>("");
  const [passwordSignup, setPasswordSignup] = useState<string>("");
  const [popupState, setPopupState] = useState<string>("signin");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  // Ensure signin is always the default state of the LogInPopUp
  useEffect(() => {
    if (authState.showLoginPopup) {
      setPopupState("signin");
      setErrorMessage(null);
    }
  }, [authState.showLoginPopup]);

  // Handle user signup event
  function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    signup(
      event,
      usernameSignup,
      passwordSignup,
      setPopupState,
      setErrorMessage
    );
  }

  // Handle user login event
  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    login(
      event,
      usernameLogin,
      passwordLogin,
      dispatch,
      setErrorMessage,
      handleRedirect
    );
  }

  return (
    <>
      {popupState === "signin" ? (
        <div className=" relative ml-auto mr-auto flex w-full max-w-[600px] flex-col gap-5 overflow-auto pb-10 pl-20 pr-20 pt-10">
          {type === "popup" ? (
            <>
              <div className="group absolute right-[10px] top-[10px] flex h-[24px] w-[24px] items-center justify-center rounded-[50%] hover:cursor-pointer ">
                {" "}
                <span
                  className="material-symbols-outlined transition-all group-hover:rotate-90"
                  onClick={() => {
                    dispatch({
                      type: "CLOSE_LOGIN_MODAL",
                    });
                  }}
                >
                  close
                </span>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className=" mb-6">
            <p className="mb-1 text-start text-3xl font-medium">Welcome back</p>
            <p className="text-start text-sm font-medium text-[#A0A0A0]">
              Sign in to your account
            </p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <a
              className=""
              href={`${import.meta.env.VITE_REACT_APP_API_URL}/login/federated/google/`}
            >
              <Button
                componentType="loginPopupGoogle"
                label="Continue with Google"
              ></Button>
            </a>
            {/* <a
              href={`${import.meta.env.VITE_REACT_APP_API_URL}/login/federated/facebook/`}
            >
              <Button
                componentType="loginPopupFacebook"
                label="Continue with Facebook"
              ></Button>
            </a> */}
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
                <Input
                  inputType="authTextInput"
                  type="text"
                  labelFor="username-login"
                  labelValue="Username"
                  inputValue={usernameLogin}
                  inputPlaceholder="GracefulCat"
                  inputId="username-login"
                  inputName="username-login"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsernameLogin(e.target.value)
                  }
                  required={true}
                  minLength={5}
                ></Input>
                <Input
                  inputType="authTextInput"
                  type="password"
                  labelFor="password-login"
                  labelValue="Password"
                  inputValue={passwordLogin}
                  inputPlaceholder="••••••••"
                  inputId="password-login"
                  inputName="password-login"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordLogin(e.target.value)
                  }
                  required={true}
                  minLength={8}
                ></Input>
                <p className="h-[20px] w-full text-start text-[red]">
                  {" "}
                  {errorMessage ? errorMessage : null}{" "}
                </p>
                <Button
                  componentType="loginPopupSignin"
                  type="submit"
                  label="Sign In"
                ></Button>
              </div>
            </form>
          </div>
          <div>
            <p className="text-sm font-medium text-[#A0A0A0]">
              Don't have an account?{" "}
              <span
                className="text-sm font-medium text-[white] hover:cursor-pointer hover:underline"
                onClick={() => {
                  setPopupState("signup");
                  setErrorMessage(null);
                }}
              >
                Sign Up Now
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="relative flex w-full flex-col gap-5 pb-10 pl-20 pr-20 pt-10 ">
          {type === "popup" ? (
            <>
              {" "}
              <div className="group absolute right-[10px] top-[10px] flex h-[24px] w-[24px] items-center justify-center rounded-[50%] hover:cursor-pointer ">
                {" "}
                <span
                  className="material-symbols-outlined transition-all group-hover:rotate-90"
                  onClick={() => {
                    dispatch({
                      type: "CLOSE_LOGIN_MODAL",
                    });
                  }}
                >
                  close
                </span>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className=" mb-6">
            <p className="mb-1 text-start text-3xl font-medium">Get Started</p>
            <p className="text-start text-sm font-medium text-[#A0A0A0]">
              Create an account
            </p>
          </div>

          <div className="w-full">
            <a
              href={`${import.meta.env.VITE_REACT_APP_API_URL}/login/federated/google/`}
            >
              <Button
                componentType="loginPopupGoogle"
                label="Continue with Google"
              ></Button>
            </a>
            {/* <a
              href={`${import.meta.env.VITE_REACT_APP_API_URL}/login/federated/facebook/`}
            >
              <Button
                componentType="loginPopupFacebook"
                label="Continue with Facebook"
              ></Button>
            </a> */}
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
              onSubmit={handleSignup}
              className="flex flex-col items-start justify-center"
            >
              <div className=" flex w-full flex-col items-start justify-center gap-5">
                <Input
                  inputType="authTextInput"
                  type="text"
                  labelFor="username-signup"
                  labelValue="Username"
                  inputValue={usernameSignup}
                  inputPlaceholder="GracefulCat"
                  inputId="username-signup"
                  inputName="username-signup"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsernameSignup(e.target.value)
                  }
                  required={true}
                  minLength={5}
                ></Input>
                <Input
                  inputType="authTextInput"
                  type="password"
                  labelFor="password-signup"
                  labelValue="Password"
                  inputValue={passwordSignup}
                  inputPlaceholder="••••••••"
                  inputId="password-signup"
                  inputName="password-signup"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordSignup(e.target.value)
                  }
                  required={true}
                  minLength={8}
                ></Input>
                <p className="h-[20px] w-full text-start text-[red]">
                  {" "}
                  {errorMessage ? errorMessage : null}{" "}
                </p>
                <Button
                  componentType="loginPopupSignun"
                  type="submit"
                  label="Sign Up"
                ></Button>
              </div>
            </form>
          </div>
          <div>
            <p className="text-sm font-medium text-[#A0A0A0]">
              Have an account?{" "}
              <span
                className="text-sm font-medium text-[white] hover:cursor-pointer hover:underline"
                onClick={() => {
                  setPopupState("signin");
                  setErrorMessage(null);
                }}
              >
                Sign In Now
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
