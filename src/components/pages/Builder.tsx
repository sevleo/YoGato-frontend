import categories from "../../db/categories.json";
import Flow, { FlowType } from "../sections/Flow";
import AspectCollection from "../sections/AspectCollection";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useUser } from "../utilities/UserContext";
import { useFlow } from "../utilities/FlowContext";
import { useNavigate } from "react-router-dom";
import { createOrUpdateFlow } from "../utilities/api";
import { fetchFlowDataAPI } from "../utilities/api";

function Builder() {
  const navigate = useNavigate();

  const aspectGroups: AspectGroupType[] = categories;

  const { flow, setFlow } = useFlow();
  const enablePreview = flow && flow.units.length > 0 ? true : false;
  const enableClear = flow && flow.units.length > 0 ? true : false;

  type ClickHandler = MouseEventHandler<HTMLButtonElement>;

  const { authState } = useUser();

  console.log(authState);
  console.log(flow);
  console.log(flow.flowId);

  const [flowName, setFlowName] = useState("");
  const [flowDifficulty, setFlowDifficulty] = useState("");

  const fetchFlowData = useCallback(() => {
    fetchFlowDataAPI(flow, setFlowName, setFlowDifficulty, setPageLoaded);
  }, [flow]);

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (!authState.dataLoading && authState.isLoggedIn && flow.flowId) {
      fetchFlowData();
    } else if (!flow.flowId) {
      setPageLoaded(true);
    }
    // setPageLoaded(true);
  }, [authState, fetchFlowData, flow]);

  const duration = flow ? flow.duration : 0;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const handleClearButton: ClickHandler = () => {
    const defaultFlow: FlowType = {
      flowName: "my fancy flow",
      units: [],
      duration: 0,
      uniqueAspects: [],
      uniqueAspectGroups: [],
      flowId: "",
    };

    setFlow(defaultFlow);
  };

  const handlePreviewButtonClick: ClickHandler = () => {
    navigate("/preview");
  };

  // Create or update flow in DB
  function handleSave(event) {
    createOrUpdateFlow(
      event,
      flow,
      setFlow,
      authState,
      flowName,
      setFlowName,
      flowDifficulty,
      setFlowDifficulty
    );
  }

  return pageLoaded ? (
    <>
      <div
        className={`setup ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px] ${authState.showLoginPopup ? "blur-sm" : ""}`}
      >
        <div className="w-3/4">
          <div className="ml-auto mr-auto grid w-full grid-cols-[1fr_1fr_1fr] items-start justify-center  bg-[#ffffff18] text-black transition-colors hover:bg-[#ffffff38]">
            <div className="flex w-full flex-col items-start justify-center  gap-1 p-5 ">
              <div className=" grid w-full grid-cols-[1fr_2fr] gap-2">
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
              </div>
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
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
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-center  gap-1 p-5 ">
              <div className=" grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className=" text-start text-white">Duration</p>
                <p className="text-start text-white">
                  {hours > 0 ? <span>{hours} hours, </span> : null}
                  {minutes > 0 ? <span>{minutes} minutes, </span> : null}
                  {seconds > 0 ? <span>{seconds} seconds.</span> : null}
                </p>
              </div>
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="  text-start text-white">Poses</p>
                <p className="text-start text-white">
                  {flow ? flow.units.length : 0}
                </p>
              </div>
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="text-start text-white">Unique poses</p>
                <p className="text-start text-white">
                  {flow ? flow.uniqueAspects.length : 0}
                </p>
              </div>
            </div>
            <div className="flex h-full w-full flex-row items-center justify-end gap-2 p-5">
              <button onClick={handleSave}>Save</button>
              <button
                className={`h-full w-[100px] rounded-none border-[1px] ${enablePreview ? "over:border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] active:bg-[#9b9b9b2a]" : " bg-[#545454]  text-[#ffffff88] hover:border-transparent hover:outline-none"}  focus:outline-none`}
                onClick={enablePreview ? handlePreviewButtonClick : undefined}
              >
                Preview
              </button>
              <button
                className={`h-full w-[100px] rounded-none border-[1px] ${enableClear ? "over:border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] active:bg-[#9b9b9b2a]" : " bg-[#545454]  text-[#ffffff88] hover:border-transparent hover:outline-none"}  focus:outline-none`}
                onClick={enableClear ? handleClearButton : undefined}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Flow aspectGroups={aspectGroups}></Flow>
            <AspectCollection aspectGroups={aspectGroups}></AspectCollection>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default Builder;
