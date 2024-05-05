import { useState } from "react";
import { useUser } from "../utilities/UserContext";
import FlowTableCustom from "../buildingBlocks/FlowTableCustom";
import { createFlow } from "../utilities/api";
import { FlowDataType } from "./Flow";
import Button from "../buildingBlocks/Button";

export interface FlowType {
  creationDate: string;
  flowData: FlowDataType;
  flowName: string;
  userId: string;
  _id: string;
}

interface MyFlowsProps {
  showAllFlows: () => void;
  flows: FlowType[];
  handleDesigningClick: () => void;
  handleMovingClick: () => void;
}

function MyFlows({
  showAllFlows,
  flows,
  handleDesigningClick,
  handleMovingClick,
}: MyFlowsProps) {
  const { authState } = useUser();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      defaultFlow,
      showAllFlows,
      setErrorMessage,
      setFlowName
    );
  }

  const [flowName, setFlowName] = useState("");

  return (
    <>
      <form
        method="POST"
        onSubmit={handleNewFlowClick}
        className="flex flex-col"
      >
        <div className="flex w-full flex-col items-start justify-center max-[650px]:flex-row ">
          <div className="flex flex-row gap-[10px] max-[650px]:w-full max-[650px]:flex-col">
            <Button
              type="submit"
              componentType="myFlowsCreate"
              label="New Flow"
            ></Button>
            <div className="max-[650px]:order-1">
              {" "}
              <label
                htmlFor="flowName"
                className="text-sm font-medium text-[#A0A0A0]"
              ></label>
              <input
                id="flowName"
                name="flowName"
                placeholder="a catchy name..."
                type="text"
                value={flowName}
                onChange={(e) => {
                  setFlowName(e.target.value);
                  setErrorMessage(null);
                }}
                className=" h-9 w-full rounded-md border-[1px] border-[#3D3D3D] bg-[#212121] pb-2 pl-4 pr-4 pt-2 outline outline-[2px] outline-transparent transition-all placeholder:text-[#ededed80] focus:border-[#707070] focus:outline-[#232323] min-[650px]:max-w-[300px]"
                required
              />
              <p className="pl-4 text-start text-[red]">{errorMessage}</p>
            </div>
          </div>
        </div>
      </form>
      <div className=" flex flex-col pb-6">
        {flows && authState.isLoggedIn && !authState.dataLoading ? (
          <FlowTableCustom
            flows={flows}
            showAllFlows={showAllFlows}
            handleDesigningClick={handleDesigningClick}
            handleMovingClick={handleMovingClick}
          ></FlowTableCustom>
        ) : null}
      </div>
    </>
  );
}

export default MyFlows;
