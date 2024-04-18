import CatLogo from "../../assets/cat_logo.jpeg";
import { useUser } from "../utilities/UserContext";
import Button from "../buildingBlocks/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  // const user = useUser();
  const { authState } = useUser();

  const navigate = useNavigate();

  function handleSignInClick() {
    navigate("/sign-in");
  }

  function handleDemoClick() {
    navigate("/builder");
  }

  return (
    <>
      {authState.dataLoading ? (
        <div></div>
      ) : (
        <div
          className={`${authState.showLoginPopup ? "blur-sm" : ""} flex justify-center`}
        >
          <div className="flex max-w-[600px] flex-col items-center justify-center">
            <div
              className="mt-[50px] flex h-[100px] items-center justify-center"
              style={{ borderRadius: "50%" }}
            >
              <img
                className="h-[100px] "
                src={CatLogo}
                alt=""
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="mt-[50px]">
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
              <span className="text-[#6ccc93]">student</span>, use this tool to
              craft and execute your practice with ease.
            </p>
            <div className="flex w-full flex-row items-center justify-center gap-2">
              <Button
                componentType="heroSignIn"
                label="Sign In"
                onClick={handleSignInClick}
                enabled={true}
              ></Button>
              <Button
                componentType="heroDemo"
                label="Guest Demo"
                onClick={handleDemoClick}
                enabled={true}
              ></Button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-auto">
        <p className=" pb-2 pt-2 text-[10px] font-normal text-[#c9c9c9]">
          YoGato @ 2024
        </p>
      </div>
    </>
  );
}

export default Home;
