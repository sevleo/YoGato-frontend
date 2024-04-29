import { ReactNode, useState } from "react";
import { useFlow } from "../utilities/FlowContext";
import { deleteFlow } from "../utilities/api";
import { updateFlowName } from "../utilities/api";
import { parseISO, format } from "date-fns";
import { FlowType } from "../sections/MyFlows";
import { FlowDataType } from "../sections/Flow";
import Button from "./Button";

interface FlowTableCustom {
  flows: FlowType[];
  showAllFlows: () => void;
  handleDesigningClick: () => void;
  handleMovingClick: () => void;
}

export default function FlowTableCustom({
  flows,
  showAllFlows,
  handleDesigningClick,
  handleMovingClick,
}: FlowTableCustom) {
  const { setFlow } = useFlow();

  // Delete flow from DB
  function handleDelete(flowId: string) {
    deleteFlow(flowId, showAllFlows);
  }

  return (
    <>
      <table className=" max-w-[800px] border-separate border-spacing-0  rounded-t-md bg-[#232323]">
        <thead className="">
          <tr className=" bg-[#282828]">
            <th className="rounded-tl-md border-b-[1px] border-l-[1px] border-t-[1px] border-[#323232] p-3 text-start text-base font-medium text-[#a0a0a0]">
              Flow Name
            </th>
            <th className="border-b-[1px] border-t-[1px] border-[#323232] p-3 text-start text-base  font-medium text-[#a0a0a0]">
              Duration
            </th>
            <th className="border-b-[1px] border-t-[1px] border-[#323232] p-3 text-start text-base font-medium text-[#a0a0a0]">
              Poses
            </th>
            <th className="border-b-[1px]  border-t-[1px] border-[#323232] p-3 text-start text-base font-medium text-[#a0a0a0]">
              Created
            </th>
            <th className="rounded-tr-md border-b-[1px] border-r-[1px] border-t-[1px] border-[#323232] p-3"></th>
          </tr>
        </thead>
        <tbody>
          {flows.map((flow) => {
            return (
              <TableRow
                key={flow._id}
                flow={flow}
                handleDelete={handleDelete}
                showAllFlows={showAllFlows}
                setFlow={setFlow}
                handleDesigningClick={handleDesigningClick}
                handleMovingClick={handleMovingClick}
              ></TableRow>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

interface TableRow {
  flow: FlowType;
  handleDelete: (flowId: string) => void;
  showAllFlows: () => void;
  setFlow: React.Dispatch<React.SetStateAction<FlowDataType>>;
  handleDesigningClick: () => void;
  handleMovingClick: () => void;
}

function TableRow({
  flow,
  handleDelete,
  showAllFlows,
  setFlow,
  handleDesigningClick,
  handleMovingClick,
}: TableRow) {
  const duration = flow.flowData.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const [editable, setEditable] = useState(false);
  const [editedFlowName, setEditedFlowName] = useState(flow.flowName);

  // function handleEditClick() {
  //   setEditable(true);
  // }

  function handleBlur() {
    setEditable(false);

    // Update flow name in DB
    updateFlowName(flow, editedFlowName, setEditable, showAllFlows);
  }

  function handleBuilderClick(flowId: string) {
    setFlow({ ...flow.flowData, flowId: flowId, flowName: flow.flowName });
    handleDesigningClick();
  }

  function handlePreviewClick(flowId: string) {
    setFlow({ ...flow.flowData, flowId: flowId });
    handleMovingClick();
  }

  return (
    <tr key={flow._id} className="">
      <TableData style="border-l-[1px] w-fit">
        {editable ? (
          <input
            type="text"
            value={editedFlowName}
            autoFocus
            onChange={(e) => setEditedFlowName(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <p
            // onClick={handleEditClick}
            className=" outline outline-transparent "
          >
            {editedFlowName ? editedFlowName : flow.flowName}
          </p>
        )}
      </TableData>
      <TableData style=" w-fit">
        <p className="">
          {hours > 0 ? <span className=" font-medium">{hours}h, </span> : null}
          {minutes > 0 ? (
            <span className="font-medium">{minutes}m, </span>
          ) : null}
          {seconds > 0 ? <span className="font-medium">{seconds}s</span> : null}
        </p>
      </TableData>
      <TableData style=" w-fit">
        {flow.flowData.units ? flow.flowData.units.length : 0}
      </TableData>

      <TableData style=" w-fit">
        {format(parseISO(flow.creationDate).toString(), "d LLL yyyy")}
      </TableData>

      <TableData style="border-r-[1px] w-fit">
        <div className="flex items-center justify-center gap-2">
          <Button
            componentType="myFlowsPreview"
            onClick={() => handlePreviewClick(flow._id)}
            enabled={
              flow.flowData.units ? flow.flowData.units.length > 0 : false
            }
          >
            <span
              className={`material-symbols-outlined ${flow.flowData.units.length > 0 ? "text-[#6ccc93]" : ""}`}
            >
              person_celebrate
            </span>
          </Button>
          <Button
            componentType="myFlowsEdit"
            onClick={() => handleBuilderClick(flow._id)}
            enabled={true}
          >
            <span className="material-symbols-outlined text-[18px] ">tune</span>
          </Button>
          <Button
            componentType="myFlowsDelete"
            onClick={() => handleDelete(flow._id)}
            enabled={true}
          >
            <span className="material-symbols-outlined text-[18px] ">
              delete
            </span>
          </Button>
        </div>
      </TableData>
    </tr>
  );
}

function TableData({
  children,
  style,
}: {
  children: ReactNode;
  style?: string;
}) {
  return (
    <td
      className={`border-b-[1px] border-[#323232] p-3 text-start text-sm font-medium text-[#a0a0a0] ${style || ""}`}
    >
      {children}
    </td>
  );
}
