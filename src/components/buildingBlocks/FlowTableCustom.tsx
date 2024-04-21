import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../utilities/FlowContext";
import { deleteFlow } from "../utilities/api";
import { updateFlowName } from "../utilities/api";
import { parseISO, format } from "date-fns";
import { FlowType } from "../pages/MyFlows";
import { FlowDataType } from "../sections/Flow";
import Button from "./Button";

interface FlowTableCustom {
  flows: FlowType[];
  showAllFlows: () => void;
}

export default function FlowTableCustom({
  flows,
  showAllFlows,
}: FlowTableCustom) {
  const navigate = useNavigate();
  const { setFlow } = useFlow();

  // Delete flow from DB
  function handleDelete(flowId: string) {
    deleteFlow(flowId, showAllFlows);
  }

  return (
    <>
      <table className="border-separate  border-spacing-0 rounded-t-md  bg-[#232323]">
        <thead className="">
          <tr className=" bg-[#282828]">
            <th className=" rounded-tl-md border-b-[1px] border-l-[1px] border-t-[1px] border-[#323232] p-3 text-start">
              Flow Name
            </th>
            <th className=" border-b-[1px] border-t-[1px] border-[#323232]  p-3 text-start">
              Length
            </th>
            <th className="border-b-[1px] border-t-[1px] border-[#323232] p-3 text-start">
              Poses
            </th>
            <th className="border-b-[1px] border-t-[1px] border-[#323232] p-3"></th>
            <th className="border-b-[1px] border-t-[1px] border-[#323232] p-3"></th>
            <th className="border-b-[1px] border-t-[1px] border-[#323232] p-3"></th>
            <th className="rounded-tr-md border-b-[1px] border-r-[1px] border-t-[1px] border-[#323232] p-3 text-start">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {flows.map((flow) => (
            <TableRow
              key={flow._id}
              flow={flow}
              handleDelete={handleDelete}
              showAllFlows={showAllFlows}
              navigate={navigate}
              setFlow={setFlow}
            ></TableRow>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface TableRow {
  flow: FlowType;
  handleDelete: (flowId: string) => void;
  showAllFlows: () => void;
  navigate: (arg: string) => void;
  setFlow: React.Dispatch<React.SetStateAction<FlowDataType>>;
}

function TableRow({
  flow,
  handleDelete,
  showAllFlows,
  navigate,
  setFlow,
}: TableRow) {
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
    navigate("/builder");
  }

  function handlePreviewClick(flowId: string) {
    navigate("/preview");
    setFlow({ ...flow.flowData, flowId: flowId });
  }

  return (
    <tr key={flow._id}>
      <TableData>
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
            className=" outline outline-transparent"
          >
            {editedFlowName ? editedFlowName : flow.flowName}
          </p>
        )}
      </TableData>
      <TableData>
        {flow.flowData.duration ? flow.flowData.duration : 0}
      </TableData>
      <TableData>
        {flow.flowData.units ? flow.flowData.units.length : 0}
      </TableData>

      <TableData>
        {" "}
        <Button
          componentType="myFlowsPreview"
          onClick={() => handlePreviewClick(flow._id)}
          label="Preview"
          enabled={flow.flowData.units ? flow.flowData.units.length > 0 : false}
        ></Button>
      </TableData>
      <TableData>
        {" "}
        <Button
          componentType="myFlowsEdit"
          onClick={() => handleBuilderClick(flow._id)}
          label="Edit"
          enabled={true}
        ></Button>
        {/* <Link to="/builder" onClick={handleBuilderClick}>
          Builder
        </Link> */}
      </TableData>

      <TableData>
        {" "}
        <Button
          componentType="myFlowsDelete"
          onClick={() => handleDelete(flow._id)}
          label="Delete"
          enabled={true}
        ></Button>
      </TableData>
      <TableData>
        {format(parseISO(flow.creationDate).toString(), "d LLL yyyy")}
      </TableData>
    </tr>
  );
}

function TableData({ children }: { children: ReactNode }) {
  return <td className="text-start">{children}</td>;
}
