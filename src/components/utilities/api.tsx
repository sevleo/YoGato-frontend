import axios from "axios";
import { Action, AuthStateTypes } from "./UserContext";
import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { FlowDataType } from "../sections/Flow";
import { FlowType } from "../sections/MyFlows";

// Check if user is logged in
export async function checkLoggedIn(dispatch: React.Dispatch<Action>) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/check-login`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
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
    await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/log-out`, {
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
    await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/sign-up`, {
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
      `${import.meta.env.VITE_REACT_APP_API_URL}/login/password`,
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

// Handle password update event
export async function updatePassword(
  event: React.FormEvent<HTMLFormElement>,
  userId: string,
  currentPassword: string,
  newPassword: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setCurrentPassword: Dispatch<SetStateAction<string>>,
  setNewPassword: Dispatch<SetStateAction<string>>,
  setNewPassword2: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setNotificationMessage: Dispatch<SetStateAction<string>>,
  setSeverity: Dispatch<SetStateAction<string>>
) {
  event.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/update-password`,
      {
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }
    );
    console.log(response);
    if (response.status === 200) {
      setCurrentPassword("");
      setNewPassword("");
      setNewPassword2("");
      setOpen(true);
      setNotificationMessage("Password updated");
      setSeverity("success");
    }
  } catch (error: any) {
    console.error("Error updating password:", error);
    if (error.response) {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage(error.message);
    }
    setOpen(true);
    setNotificationMessage("Password not updated");
    setSeverity("error");
  }
}

// Handle username update event
export async function updateDisplayName(
  event: React.FormEvent<HTMLFormElement>,
  userId: string,
  displayName: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setNotificationMessage: Dispatch<SetStateAction<string>>,
  setSeverity: Dispatch<SetStateAction<string>>
) {
  event.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/update-displayname`,
      {
        userId: userId,
        displayName: displayName,
      }
    );
    console.log(response);
    if (response.status === 200) {
      setOpen(true);
      setNotificationMessage("Display Name updated");
      setSeverity("success");
    }
  } catch (error: any) {
    console.error("Error updating Display Name:", error);
    if (error.response) {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage(error.message);
    }
    setOpen(true);
    setNotificationMessage("Display Name not updated");
    setSeverity("error");
  }
}

// Save flow to DB or update flow
export async function createOrUpdateFlow(
  flow: FlowDataType,
  setFlow: Dispatch<SetStateAction<FlowDataType>>,
  authState: AuthStateTypes,
  flowName: string,
  editedFlowName: string,
  setNameErrorMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setNotificationMessage: Dispatch<SetStateAction<string>>,
  setSeverity: Dispatch<SetStateAction<string>>,
  event?: React.MouseEvent<HTMLButtonElement>
) {
  if (event) {
    event.preventDefault();
  }
  // Create new one
  let response;
  if (!flow.flowId) {
    try {
      response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/new-flow`,
        {
          userId: authState.userId,
          flowName: flowName || "No name",
          flowData: { ...flow, flowName: flowName },
        }
      );
      setFlow({
        ...flow,
        flowId: response.data.message._id,
        flowName: flowName,
      });
      setOpen(true);
      setNotificationMessage("Created flow");
      setSeverity("success");
    } catch (error: any) {
      console.error("Error adding flow:", error);
      if (error.response) {
        setNameErrorMessage(error.response.data.message);
      }
      setOpen(true);
      setNotificationMessage("Something went wrong");
      setSeverity("error");
    }
  } else {
    // Update existing one
    try {
      response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/update-flow`,
        {
          userId: authState.userId,
          flowId: flow.flowId,
          flowName: editedFlowName,
          flowData: { ...flow, flowName: editedFlowName },
        }
      );
      setFlow({ ...flow, flowName: editedFlowName });
      setOpen(true);
      setNotificationMessage("Saved flow");
      setSeverity("success");
    } catch (error: any) {
      console.error("Error updating flow:", error);
      if (error.response) {
        setNameErrorMessage(error.response.data.message);
      }
      setOpen(true);
      setNotificationMessage("Something went wrong");
      setSeverity("error");
    }
  }

  // setFlowName(flowName);
}

// Fetch a flow
export async function fetchFlowDataAPI(
  flow: FlowDataType,
  setFlowName: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/get-flow`,
      {
        params: {
          flowId: flow.flowId,
        },
      }
    );
    setFlowName(response.data.message.flowName);
  } catch (error) {
    console.error("Error fetching a flow:", error);
  }
}

// Fetch flows
export async function showAllFlowsAPI(
  authState: AuthStateTypes,
  setFlows: Dispatch<SetStateAction<FlowType[]>>
) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/flows`,
      {
        params: {
          userId: authState.userId,
        },
      }
    );
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
  setFlowName: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setNotificationMessage: Dispatch<SetStateAction<string>>,
  setSeverity: Dispatch<SetStateAction<string>>
) {
  event.preventDefault();
  try {
    await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/new-flow`, {
      userId: authState.userId,
      flowName: flowName,
      flowData: { ...flow, flowName: flowName },
    });
    showAllFlows();
    setFlowName("");
    setErrorMessage(null);
    setOpen(true);
    setNotificationMessage("New flow added");
    setSeverity("success");
  } catch (error: any) {
    console.error("Error adding flow:", error);
    setErrorMessage(error.response.data.message);
    setOpen(true);
    setNotificationMessage("Something went wrong");
    setSeverity("error");
  }
}

// Delete flow from DB
export async function deleteFlow(
  flowId: string,
  showAllFlows: () => void,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setNotificationMessage: Dispatch<SetStateAction<string>>,
  setSeverity: Dispatch<SetStateAction<string>>
) {
  try {
    await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/delete-flow`, {
      params: {
        flowId: flowId,
      },
    });
    showAllFlows();
    setOpen(true);
    setNotificationMessage("Flow deleted");
    setSeverity("success");
  } catch (error) {
    console.log("Error deleting flow:", error);
    setOpen(true);
    setNotificationMessage("Something went wrong");
    setSeverity("error");
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
    await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/update-flow`, {
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
