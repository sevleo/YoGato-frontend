import categories from "../../db/categories.json";
import Flow, { FlowDataType } from "./Flow";
import AspectCollection from "./AspectCollection";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useUser } from "../utilities/UserContext";
import { useFlow } from "../utilities/FlowContext";
import { createOrUpdateFlow } from "../utilities/api";
import { fetchFlowDataAPI } from "../utilities/api";
import Input from "../buildingBlocks/Input";
import Button from "../buildingBlocks/Button";

interface BuilderProps {
  handleMovingClick: () => void;
  showAllFlows: () => void;
  isMobile: boolean;
}

function Builder({ handleMovingClick, showAllFlows, isMobile }: BuilderProps) {
  const aspectGroups: AspectGroupType[] = categories;

  const { flow, setFlow } = useFlow();

  const [editableName, setEditableName] = useState<boolean>(false);
  const [, setClearClicked] = useState<boolean>(false);

  const handlePreviewButtonClick: ClickHandler = () => {
    handleMovingClick();
  };

  type ClickHandler = MouseEventHandler<HTMLButtonElement>;

  const { authState } = useUser();

  const [flowName, setFlowName] = useState(flow.flowName);

  const [editedFlowName, setEditedFlowName] = useState(flow.flowName);

  const enablePreview = flow && flow.units.length > 0 ? true : false;
  const enableClear = flow && flow.units.length > 0 ? true : false;
  const [enableSave, setEnableSave] = useState(false);

  const fetchFlowData = useCallback(() => {
    fetchFlowDataAPI(flow, setFlowName);
  }, [flow]);

  useEffect(() => {
    if (!authState.dataLoading && authState.isLoggedIn && flow.flowId) {
      fetchFlowData();
    }
  }, [authState, fetchFlowData, flow]);

  const duration = flow ? flow.duration : 0;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const handleClearButton: ClickHandler = () => {
    const defaultFlow: FlowDataType = {
      flowName: "",
      units: [],
      duration: 0,
      uniqueAspects: [],
      uniqueAspectGroups: [],
      flowId: "",
    };

    setFlow(defaultFlow);
    setFlowName("");
    setEditedFlowName("");
    setEnableSave(false);
    setNameErrorMessage("");
    setClearClicked(true);
  };

  const [nameErrorMessage, setNameErrorMessage] = useState("");

  // Create or update flow in DB
  function handleSave(event: React.MouseEvent<HTMLButtonElement>) {
    createOrUpdateFlow(
      flow,
      setFlow,
      authState,
      flowName,
      editedFlowName,
      setNameErrorMessage,
      event
    )
      .then(() => {
        showAllFlows();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setEnableSave(false);
    // console.log(flowName);
    // console.log(flow);
  }

  function updateFlowContext() {
    setFlow({ ...flow, flowName: flowName });
  }

  return (
    <>
      <div className="rounded-md border-[1px] border-[#323232] bg-[#232323] ">
        <div className="flex w-full flex-col items-start justify-center  gap-1 p-5  ">
          <div
            className="flex w-full flex-col items-start justify-center hover:cursor-pointer"
            onClick={() => {
              // setFlowName(flowName);
              updateFlowContext();
              setEditableName(true);
              setNameErrorMessage("");
            }}
          >
            {editableName ? (
              <>
                {" "}
                <Input
                  inputType="flowBuilderTextInput"
                  type="text"
                  labelFor="flowName"
                  labelValue=""
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFlowName(e.target.value);
                    setEditedFlowName(e.target.value);
                    console.log(flow);
                    console.log(e.target.value);
                    if (editedFlowName !== e.target.value) {
                      setEnableSave(true);
                    }
                    if (editedFlowName === e.target.value) {
                      setEnableSave(false);
                    }
                  }}
                  inputValue={editedFlowName ? editedFlowName : flowName}
                  inputPlaceholder="Some fancy name"
                  inputId="flowName"
                  inputName="flowName"
                  required={true}
                  maxLength={20}
                  setEditableName={setEditableName}
                ></Input>
              </>
            ) : (
              <>
                {" "}
                <p className="text-[30px] text-[#a0a0a0]">
                  {editedFlowName
                    ? editedFlowName
                    : flowName
                      ? flowName
                      : "No name"}
                </p>
              </>
            )}
            <p className="h-[20px] w-full text-start text-[red]">
              {nameErrorMessage}
            </p>
          </div>
          <div className=" flex h-full w-full min-w-[240px] flex-col items-start justify-center  gap-1 pb-6 sm:w-1/2 min-[850px]:hidden">
            <div className=" grid w-full grid-cols-[1fr_2fr] gap-2">
              <p className=" text-start text-[#a0a0a0]">Duration</p>
              <p className="text-start text-[#a0a0a0]">
                {hours > 0 ? <span>{hours} hours, </span> : null}
                {minutes > 0 ? <span>{minutes} minutes, </span> : null}
                {seconds > 0 ? <span>{seconds} seconds.</span> : null}
              </p>
            </div>
            <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
              <p className="  text-start text-[#a0a0a0]">Poses</p>
              <p className="text-start text-[#a0a0a0]">
                {flow ? flow.units.length : 0}
              </p>
            </div>
            <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
              <p className="text-start text-[#a0a0a0]">Unique poses</p>
              <p className="text-start text-[#a0a0a0]">
                {flow ? flow.uniqueAspects.length : 0}
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-row items-center justify-start gap-2">
            <Button
              componentType="builderSave"
              onClick={handleSave}
              label="Save"
              enabled={flowName ? enableSave : false}
            ></Button>
            <Button
              componentType="builderPreview"
              onClick={enablePreview ? handlePreviewButtonClick : undefined}
              label="Preview"
              enabled={enablePreview}
            ></Button>
            <Button
              componentType="builderClear"
              onClick={enableClear ? handleClearButton : undefined}
              label="Clear"
              enabled={enableClear}
            ></Button>
          </div>
        </div>
      </div>
      <div className="hidden h-full rounded-md border-[1px] border-[#323232] bg-[#232323] min-[850px]:block">
        <div className=" flex h-full w-full  flex-col  items-start justify-center gap-1 p-5">
          <div className=" grid w-full grid-cols-[1fr_2fr] gap-2">
            <p className=" text-start text-[#a0a0a0]">Duration</p>
            <p className="text-start text-[#a0a0a0]">
              {hours > 0 ? <span>{hours} hours, </span> : null}
              {minutes > 0 ? <span>{minutes} minutes, </span> : null}
              {seconds > 0 ? <span>{seconds} seconds.</span> : null}
            </p>
          </div>
          <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
            <p className="  text-start text-[#a0a0a0]">Poses</p>
            <p className="text-start text-[#a0a0a0]">
              {flow ? flow.units.length : 0}
            </p>
          </div>
          <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
            <p className="text-start text-[#a0a0a0]">Unique poses</p>
            <p className="text-start text-[#a0a0a0]">
              {flow ? flow.uniqueAspects.length : 0}
            </p>
          </div>
        </div>
      </div>
      <Flow
        aspectGroups={aspectGroups}
        setEnableSave={setEnableSave}
        isMobile={isMobile}
      ></Flow>
      <AspectCollection
        aspectGroups={aspectGroups}
        setEnableSave={setEnableSave}
      ></AspectCollection>
    </>
  );
}

export default Builder;
