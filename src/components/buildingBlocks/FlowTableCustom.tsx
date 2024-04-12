import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../utilities/FlowContext";
import { deleteFlow } from "../utilities/api";
import { updateFlowName } from "../utilities/api";
import { parseISO, format } from "date-fns";
import { FlowType } from "../pages/MyFlows";
import { FlowDataType } from "../sections/Flow";

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
      <table>
        <thead>
          <tr>
            <th className=" text-start">Flow Name</th>
            <th className=" text-start">Difficulty</th>
            <th className=" text-start">Length</th>
            <th className=" text-start">Poses</th>
            <th></th>
            <th></th>
            <th></th>
            <th className=" text-start">Created</th>
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

  function handleEditClick() {
    setEditable(true);
  }

  function handleBlur() {
    setEditable(false);

    // Update flow name in DB
    updateFlowName(flow, editedFlowName, setEditable, showAllFlows);
  }

  function handleBuilderClick(flowId: string) {
    navigate("/builder");
    setFlow({ ...flow.flowData, flowId: flowId });
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
            onClick={handleEditClick}
            className=" outline outline-transparent hover:cursor-text hover:outline-1 hover:outline-[black]"
          >
            {editedFlowName ? editedFlowName : flow.flowName}
          </p>
        )}
      </TableData>
      <TableData>{flow.difficulty}</TableData>
      <TableData>{flow.flowData.duration}</TableData>
      <TableData>{flow.flowData.units.length}</TableData>

      <TableData>
        {" "}
        <button
          onClick={() => handlePreviewClick(flow._id)}
          className={`${flow.flowData.units.length > 0 ? "pointer-events-auto" : "pointer-events-none bg-[#8080806b] text-[gray]"}`}
        >
          Preview
        </button>
      </TableData>
      <TableData>
        {" "}
        <button onClick={() => handleBuilderClick(flow._id)}>Edit</button>
        {/* <Link to="/builder" onClick={handleBuilderClick}>
          Builder
        </Link> */}
      </TableData>

      <TableData>
        {" "}
        <button onClick={() => handleDelete(flow._id)}>delete</button>
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
