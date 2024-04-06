import axios from "axios";

export default function FlowTableCustom({ flows, showAllFlows }) {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {flows.map((flow, index) => (
            <tr key={flow._id}>
              <td className=" text-start">{flow.flowName}</td>
              <td className=" text-start">{flow.difficulty}</td>
              <td className=" text-start">length</td>
              <td className=" text-start">poses</td>
              <td>
                <button>preview</button>
              </td>
              <td>
                <button>edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteFlow(flow._id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="table">
        <div className="header-row flex">
          <div className="header-col-1">Flow Name</div>
          <div className="header-col-2">Difficulty</div>
        </div>
        {flows.map((flow, index) => (
          <div className={`data-row-${index} flex`}>
            <div>{index + 1}</div>
            <div>{flow.flowName}</div>
            <div>{flow.difficulty}</div>
          </div>
        ))}
      </div> */}
    </>
  );
}
