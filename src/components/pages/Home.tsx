import CatLogo from "../../assets/cat_logo.jpeg";
import { useUser } from "../utilities/UserContext";
import Button from "../buildingBlocks/Button";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

interface HomeProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  url: string;
}

function Home({ setLocation, url }: HomeProps) {
  // const user = useUser();
  const { authState } = useUser();
  const navigate = useNavigate();
  function handleSignInClick() {
    navigate("/sign-in");
  }

  useEffect(() => {
    setLocation(url);
  });

  // function handleDemoClick() {
  //   navigate("/builder");
  // }

  function handleLetsGoClick() {
    navigate("/dashboard/flows");
  }

  return (
    <>
      {authState.dataLoading ? (
        <div></div>
      ) : (
        <>
          <div
            className={`${authState.showLoginPopup ? "blur-sm" : ""} mb-auto mt-auto flex justify-center`}
          >
            <div className="flex max-w-[600px] flex-col items-center justify-center p-2">
              <div
                className="mt-[20px] flex h-[100px] items-center justify-center"
                style={{ borderRadius: "50%" }}
              >
                <img
                  className="h-[100px] "
                  src={CatLogo}
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="mt-[20px]">
                <p className="h-fit text-center text-[50px] font-normal leading-[60px] text-[#c9c9c9]">
                  Enter the Flow
                </p>
                <p className=" h-fit text-[50px] font-normal leading-[60px] text-[#c9c9c9]">
                  with <span className="text-[#6ccc93]">YoGato</span>
                </p>
              </div>
              <p className="max-w-[420px] pb-[30px] pt-[30px] font-semibold ">
                YoGato is an open source Yoga Sequence Builder.
                <br />
                As a new or experienced{" "}
                <span className="text-[#6ccc93]">yoga teacher</span>, or as a{" "}
                <span className="text-[#6ccc93]">student</span>, use this tool
                to craft and execute your practice with ease.
              </p>
              <div className="flex w-full flex-row items-center justify-center gap-2">
                {authState.isLoggedIn ? (
                  <>
                    {" "}
                    <Button
                      componentType="heroLetsGo"
                      label="Let's Go"
                      onClick={handleLetsGoClick}
                      enabled={true}
                    ></Button>
                  </>
                ) : (
                  <>
                    {" "}
                    <Button
                      componentType="heroSignIn"
                      label="Sign In"
                      onClick={handleSignInClick}
                      enabled={true}
                    ></Button>
                    {/* <Button
                    componentType="heroDemo"
                    label="Guest Demo"
                    onClick={handleDemoClick}
                    enabled={true}
                  ></Button> */}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <p className="mt-auto pb-2 pt-2 text-[10px] font-normal text-[#c9c9c9]">
              YoGato @ 2024
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
