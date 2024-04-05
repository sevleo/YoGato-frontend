import axios from "axios";

function MyFlows() {
  async function handleNewFlowClick(event) {
    try {
      const response = await axios.post("http://localhost:3001/new-flow");
    } catch (error) {
      console.error("Error adding flow:", error);
    }
  }

  return (
    <>
      <div className="my-flows ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px] ">
        <div className="w-3/4">
          <div className=" ml-auto mr-auto h-[500px] w-full items-start justify-center bg-[#ffffff18] text-white transition-colors hover:bg-[#ffffff38]">
            <form method="POST" onSubmit={handleNewFlowClick}>
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
                  // value={usernameLogin}
                  // onChange={(e) => setUsernameLogin(e.target.value)}
                  className=" h-9 w-full rounded-md border-[1px] border-[#3D3D3D] bg-[#212121] pb-2 pl-4 pr-4 pt-2 outline outline-[2px] outline-transparent transition-all placeholder:text-[#ededed80] focus:border-[#707070] focus:outline-[#232323]"
                  required
                />
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFlows;
