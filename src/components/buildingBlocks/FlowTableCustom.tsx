import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../utilities/FlowContext";
import { handleDeleteFlow } from "../utilities/api";
import { saveFlowNameUpdate } from "../utilities/api";

export default function FlowTableCustom({ flows, showAllFlows }) {
  const navigate = useNavigate();
  const { setFlow } = useFlow();

  function handleDelete(flowId) {
    handleDeleteFlow(flowId, showAllFlows);
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

function TableRow({ flow, handleDelete, showAllFlows, navigate, setFlow }) {
  const [editable, setEditable] = useState(false);
  const [editedFlowName, setEditedFlowName] = useState(flow.flowName);

  function handleEditClick() {
    setEditable(true);
  }

  function handleBlur() {
    setEditable(false);
    saveFlowNameUpdate(flow, editedFlowName, setEditable, showAllFlows);
  }

  function handleBuilderClick(flowId) {
    navigate("/builder");
    setFlow({ ...flow.flowData, flowId: flowId });
  }

  function handlePreviewClick(flowId) {
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
    </tr>
  );
}

function TableData({ children }) {
  return <td className="text-start">{children}</td>;
}
