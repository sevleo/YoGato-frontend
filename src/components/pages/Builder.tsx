import categories from "../../db/categories.json";
import Flow, { FlowDataType } from "../sections/Flow";
import AspectCollection from "../sections/AspectCollection";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useUser } from "../utilities/UserContext";
import { useFlow } from "../utilities/FlowContext";
import { useNavigate } from "react-router-dom";
import { createOrUpdateFlow } from "../utilities/api";
import { fetchFlowDataAPI } from "../utilities/api";
import Input from "../buildingBlocks/Input";
import Button from "../buildingBlocks/Button";

function Builder() {
  const navigate = useNavigate();

  const aspectGroups: AspectGroupType[] = categories;

  const { flow, setFlow } = useFlow();

  const [editableName, setEditableName] = useState<boolean>(false);

  type ClickHandler = MouseEventHandler<HTMLButtonElement>;

  const { authState } = useUser();

  // console.log(authState);
  // console.log(flow);
  // console.log(flow.flowId);

  const [flowName, setFlowName] = useState("");

  const [editedFlowName, setEditedFlowName] = useState("");

  const enablePreview = flow && flow.units.length > 0 ? true : false;
  const enableClear = flow && flow.units.length > 0 ? true : false;
  const [enableSave, setEnableSave] = useState(false);

  const fetchFlowData = useCallback(() => {
    fetchFlowDataAPI(flow, setFlowName, setPageLoaded);
  }, [flow]);

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (!authState.dataLoading && authState.isLoggedIn && flow.flowId) {
      fetchFlowData();
    } else if (!flow.flowId) {
      setPageLoaded(true);
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
  };

  const handlePreviewButtonClick: ClickHandler = () => {
    navigate("/preview");
  };

  const [nameErrorMessage, setNameErrorMessage] = useState("");

  // Create or update flow in DB
  function handleSave(event: React.MouseEvent<HTMLButtonElement>) {
    createOrUpdateFlow(
      flow,
      setFlow,
      authState,
      flowName,
      setFlowName,
      setNameErrorMessage,
      event
    );
    console.log(flow);
    // setFlow({ ...flow, flowName: flowName });
    setEnableSave(false);
  }

  function updateFlowContext() {
    setFlow({ ...flow, flowName: flowName });
  }

  return pageLoaded && !authState.dataLoading ? (
    <>
      {authState.isLoggedIn ? (
        <>
          {" "}
          <div
            className={`setup ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px] ${authState.showLoginPopup ? "blur-sm" : ""}`}
          >
            <div className="w-3/4">
              <div className="ml-auto mr-auto grid w-full grid-cols-[1fr_1fr] items-start justify-center  bg-[#ffffff18] text-black transition-colors hover:bg-[#ffffff38]">
                <>
                  <div className="flex w-full flex-col items-start justify-center  gap-1 p-5 ">
                    <div
                      className="flex w-full flex-col items-start justify-center hover:cursor-pointer"
                      onClick={() => {
                        console.log(flow);
                        console.log(flowName);
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
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
                            inputValue={
                              editedFlowName ? editedFlowName : flowName
                            }
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
                          <p className="text-[30px] text-[#dedede]">
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
                  </div>
                </>

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
                  {" "}
                  <Button
                    componentType="builderSave"
                    onClick={handleSave}
                    label="Save"
                    enabled={enableSave}
                  ></Button>
                  <Button
                    componentType="builderPreview"
                    onClick={
                      enablePreview ? handlePreviewButtonClick : undefined
                    }
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
              <div className="flex gap-2 pt-2">
                <Flow
                  aspectGroups={aspectGroups}
                  setEnableSave={setEnableSave}
                ></Flow>
                <AspectCollection
                  aspectGroups={aspectGroups}
                  setEnableSave={setEnableSave}
                ></AspectCollection>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`setup ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px] ${authState.showLoginPopup ? "blur-sm" : ""}`}
          >
            <div className="w-3/4">
              <div className="ml-auto mr-auto grid w-full grid-cols-[1fr_1fr_1fr] items-start justify-center  bg-[#ffffff18] text-black transition-colors hover:bg-[#ffffff38]">
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
                  <Button
                    componentType="builderPreview"
                    onClick={
                      enablePreview ? handlePreviewButtonClick : undefined
                    }
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
              <div className="flex gap-2 pt-2">
                <Flow
                  aspectGroups={aspectGroups}
                  setEnableSave={setEnableSave}
                ></Flow>
                <AspectCollection
                  aspectGroups={aspectGroups}
                  setEnableSave={setEnableSave}
                ></AspectCollection>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  ) : null;
}

export default Builder;
