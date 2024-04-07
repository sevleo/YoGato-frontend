import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../utilities/FlowContext";

export default function FlowTableCustom({ flows, showAllFlows }) {
  const navigate = useNavigate();
  const { setFlow } = useFlow();

  async function handleDeleteFlow(flowId) {
    try {
      const response = await axios.get("http://localhost:3001/delete-flow", {
        params: {
          flowId: flowId,
        },
      });
      showAllFlows();
    } catch (error) {
      console.log("Error deleting flow:", error);
    }
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
              handleDeleteFlow={handleDeleteFlow}
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

function TableRow({ flow, handleDeleteFlow, showAllFlows, navigate, setFlow }) {
  const [editable, setEditable] = useState(false);
  const [editedFlowName, setEditedFlowName] = useState(flow.flowName);

  function handleEditClick() {
    setEditable(true);
  }

  function handleBlur() {
    setEditable(false);
    saveFlowNameUpdate();
  }

  function handleBuilderClick() {
    console.log(flow);
    navigate("/builder");
    setFlow(flow.flowData);
  }

  async function saveFlowNameUpdate() {
    try {
      const response = await axios.put(`http://localhost:3001/update-flow`, {
        flowId: flow._id,
        flowName: editedFlowName,
      });
      setEditable(false);
      showAllFlows();
    } catch (error) {
      console.log("Error updating flow:", error);
    }
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
      <TableData>length</TableData>
      <TableData>poses</TableData>
      <TableData>
        {" "}
        <button>edit</button>
      </TableData>
      <TableData>
        {" "}
        <button onClick={handleBuilderClick}>Builder</button>
        {/* <Link to="/builder" onClick={handleBuilderClick}>
          Builder
        </Link> */}
      </TableData>

      <TableData>
        {" "}
        <button onClick={() => handleDeleteFlow(flow._id)}>delete</button>
      </TableData>
    </tr>
  );
}

function TableData({ children }) {
  return <td className="text-start">{children}</td>;
}
