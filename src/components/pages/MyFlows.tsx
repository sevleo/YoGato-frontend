import { useCallback, useEffect, useState } from "react";
import { useUser } from "../utilities/UserContext";
import FlowTableCustom from "../buildingBlocks/FlowTableCustom";
import { showAllFlowsAPI } from "../utilities/api";
import { createFlow } from "../utilities/api";
import { FlowDataType } from "../sections/Flow";

export interface FlowType {
  creationDate: string;
  difficulty: string;
  flowData: FlowDataType;
  flowName: string;
  userId: string;
  _id: string;
}

function MyFlows() {
  const { authState } = useUser();
  const [flows, setFlows] = useState<FlowType[]>([]);

  // Display all flows
  const showAllFlows = useCallback(() => {
    // API call to fetch flows
    showAllFlowsAPI(authState, setFlows);
  }, [authState]);

  useEffect(() => {
    if (!authState.dataLoading && authState.isLoggedIn) {
      showAllFlows();
    }
  }, [authState.dataLoading, authState.isLoggedIn, showAllFlows]);

  // Save flow to DB
  function handleNewFlowClick(event: React.FormEvent<HTMLFormElement>) {
    const defaultFlow: FlowDataType = {
      flowName: "",
      units: [],
      duration: 0,
      uniqueAspects: [],
      uniqueAspectGroups: [],
      flowId: "",
    };
    createFlow(
      event,
      authState,
      flowName,
      flowDifficulty,
      defaultFlow,
      showAllFlows
    );
  }

  const [flowName, setFlowName] = useState("");
  const [flowDifficulty, setFlowDifficulty] = useState("");

  return (
    <>
      <div className="my-flows ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px] ">
        <div className="w-3/4">
          <div className=" ml-auto mr-auto h-fit w-full items-start justify-center bg-[#ffffff18] text-white transition-colors hover:bg-[#ffffff38]">
            <form method="POST" onSubmit={handleNewFlowClick}>
              <div className="flex w-full flex-col items-start justify-center gap-2">
                <label
                  htmlFor="flowName"
                  className="text-sm font-medium text-[#A0A0A0]"
                >
                  Flow Name
                </label>
                <input
                  id="flowName"
                  name="flowName"
                  placeholder="Whatever you like..."
                  type="text"
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                  className=" h-9 w-full rounded-md border-[1px] border-[#3D3D3D] bg-[#212121] pb-2 pl-4 pr-4 pt-2 outline outline-[2px] outline-transparent transition-all placeholder:text-[#ededed80] focus:border-[#707070] focus:outline-[#232323]"
                  required
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-2">
                <label
                  htmlFor="flowDifficulty"
                  className="text-sm font-medium text-[#A0A0A0]"
                >
                  Difficulty
                </label>
                <select
                  id="flowDifficulty"
                  name="flowDifficulty"
                  value={flowDifficulty}
                  onChange={(e) => setFlowDifficulty(e.target.value)}
                  className=" h-9 w-full rounded-md border-[1px] border-[#3D3D3D] bg-[#212121] pb-2 pl-4 pr-4 pt-2 outline outline-[2px] outline-transparent transition-all placeholder:text-[#ededed80] focus:border-[#707070] focus:outline-[#232323]"
                >
                  {" "}
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button type="submit">Create</button>
            </form>
            <div className=" flex flex-col">
              {flows && authState.isLoggedIn && !authState.dataLoading ? (
                <FlowTableCustom
                  flows={flows}
                  showAllFlows={showAllFlows}
                ></FlowTableCustom>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFlows;
