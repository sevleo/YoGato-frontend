import categories from "../../db/categories.json";
import Flow, { FlowType } from "../sections/Flow";
import AspectCollection from "../sections/AspectCollection";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { MouseEventHandler } from "react";
import { useUser } from "../utilities/UserContext";
import axios from "axios";
import { useFlow } from "../utilities/FlowContext";
import { useNavigate } from "react-router-dom";

function Builder() {
  const navigate = useNavigate();

  const aspectGroups: AspectGroupType[] = categories;

  const { flow, setFlow } = useFlow();
  const enablePreview = flow && flow.units.length > 0 ? true : false;
  const enableClear = flow && flow.units.length > 0 ? true : false;

  type ClickHandler = MouseEventHandler<HTMLButtonElement>;

  const { authState } = useUser();

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

  async function handleSave(event) {
    event.preventDefault();
    // Create new one
    if (!flow.flowId) {
      try {
        const response = await axios.post("http://localhost:3001/new-flow", {
          userId: authState.userId,
          flowName: "flow from builder",
          flowDifficulty: "hard",
          flowData: flow,
        });
        setFlow({ ...flow, flowId: response.data.message._id });
      } catch (error) {
        console.error("Error adding flow:", error);
      }
    } else {
      // Update existing one
      try {
        const response = await axios.put("http://localhost:3001/update-flow", {
          flowId: flow.flowId,
          flowData: flow,
        });
      } catch (error) {
        console.error("Error updating flow:", error);
      }
    }
  }

  return (
    <>
      <div
        className={`setup ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px] ${authState.showLoginPopup ? "blur-sm" : ""}`}
      >
        <div className="w-3/4">
          <div className="ml-auto mr-auto grid w-full grid-cols-[1fr_1fr] items-start justify-center  bg-[#ffffff18] text-black transition-colors hover:bg-[#ffffff38]">
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
  );
}

export default Builder;
