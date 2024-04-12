import CatLogo from "../../assets/cat_logo.jpeg";
import { useUser } from "../utilities/UserContext";

function Home() {
  // const user = useUser();
  const { authState } = useUser();

  return (
    <>
      {authState.dataLoading ? (
        <div></div>
      ) : (
        <div className={`${authState.showLoginPopup ? "blur-sm" : ""}`}>
          <div className=" pt-[60px] text-white">
            Welcome to YoGato {authState.user}
          </div>
          <br />

          <div
            className="flex h-[100px] items-center justify-center"
            style={{ borderRadius: "50%" }}
          >
            <img
              className="h-[100px] "
              src={CatLogo}
              alt=""
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
