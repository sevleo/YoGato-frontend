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
            <p>Flows</p>
            <button onClick={handleNewFlowClick}>New Flow</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFlows;
