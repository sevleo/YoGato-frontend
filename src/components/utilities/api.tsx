import axios from "axios";
import { Action, AuthStateTypes } from "./UserContext";
import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { FlowDataType } from "../sections/Flow";
import { FlowType } from "../pages/MyFlows";

// Check if user is logged in
export async function checkLoggedIn(dispatch: React.Dispatch<Action>) {
  try {
    const response = await axios.get("http://localhost:3001/check-login", {
      withCredentials: true,
    });
    if (response.data.isLoggedIn) {
      dispatch({
        type: "CHECK_LOGIN_SUCCESS",
        action: response,
      });
    }
  } catch (error) {
    dispatch({
      type: "CHECK_LOGIN_FAILURE",
    });
  } finally {
    dispatch({
      type: "CHECK_LOGIN_FINISHED",
    });
  }
}

// Handle user logout event
export async function logout(
  dispatch: React.Dispatch<Action>,
  setAnchorEl?: React.Dispatch<React.SetStateAction<null | HTMLElement>>
) {
  try {
    await axios.get("http://localhost:3001/log-out", {
      withCredentials: true,
    });
    dispatch({
      type: "LOGOUT",
    });
    if (setAnchorEl) {
      setAnchorEl(null);
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

// Handle user signup event
export async function signup(
  event: React.FormEvent<HTMLFormElement>,
  usernameSignup: string,
  passwordSignup: string,
  setPopupState: Dispatch<SetStateAction<string>>,
  setErrorMessage: Dispatch<SetStateAction<string | null>>
) {
  event.preventDefault();
  try {
    await axios.post("http://localhost:3001/sign-up", {
      username: usernameSignup,
      password: passwordSignup,
    });
    setPopupState("signin");
  } catch (error: any) {
    console.error("Error signing up:", error);
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage(error.message);
    }
  }
}

// Handle user login event
export async function login(
  event: React.FormEvent<HTMLFormElement>,
  usernameLogin: string,
  passwordLogin: string,
  dispatch: React.Dispatch<Action>,
  setErrorMessage: Dispatch<SetStateAction<string | null>>,
  handleRedirect: () => void
) {
  event.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3001/login/password",
      { username: usernameLogin, password: passwordLogin },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "LOGIN_SUCCESS",
      action: response,
    });
    dispatch({
      type: "CLOSE_LOGIN_MODAL",
    });
    handleRedirect();
  } catch (error: any) {
    console.error("Error logging in:", error);
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage(error.message);
    }

    dispatch({
      type: "LOGIN_FAILURE",
    });
  }
}

// Save flow to DB or update flow
export async function createOrUpdateFlow(
  flow: FlowDataType,
  setFlow: Dispatch<SetStateAction<FlowDataType>>,
  authState: AuthStateTypes,
  flowName: string,
  setFlowName: Dispatch<SetStateAction<string>>,
  setNameErrorMessage: Dispatch<SetStateAction<string>>,
  event?: React.MouseEvent<HTMLButtonElement>
) {
  if (event) {
    event.preventDefault();
  }
  // Create new one
  let response;
  if (!flow.flowId) {
    console.log(flow);
    try {
      response = await axios.post("http://localhost:3001/new-flow", {
        userId: authState.userId,
        flowName: flowName || "No name",
        flowData: { ...flow, flowName: flowName },
      });
      setFlow({ ...flow, flowId: response.data.message._id });
    } catch (error: any) {
      console.error("Error adding flow:", error);
      if (error.response) {
        setNameErrorMessage(error.response.data.message);
      }
    }
  } else {
    // Update existing one
    try {
      response = await axios.put("http://localhost:3001/update-flow", {
        userId: authState.userId,
        flowId: flow.flowId,
        flowName: flowName,
        flowData: { ...flow, flowName: flowName },
      });
      setFlow({ ...flow, flowName: flowName });
    } catch (error: any) {
      console.error("Error updating flow:", error);
      if (error.response) {
        setNameErrorMessage(error.response.data.message);
      }
    }
  }

  console.log(flowName);
  setFlowName(flowName);
}

// Fetch a flow
export async function fetchFlowDataAPI(
  flow: FlowDataType,
  setFlowName: Dispatch<SetStateAction<string>>,
  setPageLoaded: Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await axios.get("http://localhost:3001/get-flow", {
      params: {
        flowId: flow.flowId,
      },
    });
    setFlowName(response.data.message.flowName);
  } catch (error) {
    console.error("Error fetching a flow:", error);
  }
  setPageLoaded(true);
}

// Fetch flows
export async function showAllFlowsAPI(
  authState: AuthStateTypes,
  setFlows: Dispatch<SetStateAction<FlowType[]>>
) {
  try {
    const response = await axios.get("http://localhost:3001/flows", {
      params: {
        userId: authState.userId,
      },
    });
    console.log(response.data.message);
    setFlows(response.data.message);
  } catch (error) {
    console.error("Error fetching flows:", error);
  }
}

// Save flow to DB
export async function createFlow(
  event: React.FormEvent<HTMLFormElement>,
  authState: AuthStateTypes,
  flowName: string,
  flow: FlowDataType,
  showAllFlows: () => void,
  setErrorMessage: Dispatch<SetStateAction<string | null>>,
  setFlowName: Dispatch<SetStateAction<string>>
) {
  event.preventDefault();
  try {
    await axios.post("http://localhost:3001/new-flow", {
      userId: authState.userId,
      flowName: flowName,
      flowData: { ...flow, flowName: flowName },
    });
    showAllFlows();
    setFlowName("");
    setErrorMessage(null);
  } catch (error: any) {
    console.error("Error adding flow:", error);
    setErrorMessage(error.response.data.message);
  }
}

// Delete flow from DB
export async function deleteFlow(flowId: string, showAllFlows: () => void) {
  try {
    await axios.get("http://localhost:3001/delete-flow", {
      params: {
        flowId: flowId,
      },
    });
    showAllFlows();
  } catch (error) {
    console.log("Error deleting flow:", error);
  }
}

// Update flow name in DB
export async function updateFlowName(
  flow: FlowType,
  editedFlowName: string,
  setEditable: Dispatch<SetStateAction<boolean>>,
  showAllFlows: () => void
) {
  try {
    await axios.put(`http://localhost:3001/update-flow`, {
      flowId: flow._id,
      flowName: editedFlowName,
      flowData: { ...flow.flowData, flowName: editedFlowName },
    });
    setEditable(false);
    showAllFlows();
  } catch (error) {
    console.log("Error updating flow:", error);
  }
}
