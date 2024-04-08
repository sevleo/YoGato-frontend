import axios from "axios";

// Check if user is logged in
export async function checkLoggedIn(dispatch) {
  try {
    const response = await axios.get("http://localhost:3001/check-login", {
      withCredentials: true,
    });
    if (response.data.isLoggedIn) {
      console.log(response.data);
      dispatch({
        type: "CHECK_LOGIN_SUCCESS",
        action: response,
      });
    } else {
      console.log(response.data);
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
export async function logout(dispatch, setAnchorEl) {
  try {
    const response = await axios.get("http://localhost:3001/log-out", {
      withCredentials: true,
    });
    console.log(response);
    dispatch({
      type: "LOGOUT",
    });
    setAnchorEl(null);
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

// Handle user signup event
export async function signup(
  event,
  usernameSignup,
  passwordSignup,
  setPopupState,
  setErrorMessage
) {
  event.preventDefault();
  console.log(event);
  try {
    const response = await axios.post("http://localhost:3001/sign-up", {
      username: usernameSignup,
      password: passwordSignup,
    });
    setPopupState("signin");
  } catch (error) {
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
  event,
  usernameLogin,
  passwordLogin,
  dispatch,
  setErrorMessage
) {
  event.preventDefault();
  console.log(event);
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
  } catch (error) {
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
export async function createOrUpdateFlow(event, flow, setFlow, authState) {
  event.preventDefault();
  // Create new one
  if (!flow.flowId) {
    try {
      const response = await axios.post("http://localhost:3001/new-flow", {
        userId: authState.userId,
        flowName: "flow from builder",
        flowDifficulty: "hard",
        flowData: flow,
      });
      setFlow({ ...flow, flowId: response.data.message._id });
    } catch (error) {
      console.error("Error adding flow:", error);
    }
  } else {
    // Update existing one
    try {
      const response = await axios.put("http://localhost:3001/update-flow", {
        flowId: flow.flowId,
        flowData: flow,
      });
    } catch (error) {
      console.error("Error updating flow:", error);
    }
  }
}

// Fetch flows
export async function showAllFlowsAPI(authState, setFlows) {
  try {
    const response = await axios.get("http://localhost:3001/flows", {
      params: {
        userId: authState.userId,
      },
    });
    setFlows(response.data.message);
  } catch (error) {
    console.error("Error adding flow:", error);
  }
}

// Save flow to DB
export async function createFlow(
  event,
  authState,
  flowName,
  flowDifficulty,
  flow,
  showAllFlows
) {
  event.preventDefault();
  try {
    const response = await axios.post("http://localhost:3001/new-flow", {
      userId: authState.userId,
      flowName: flowName,
      flowDifficulty: flowDifficulty,
      flowData: flow,
    });
    showAllFlows();
  } catch (error) {
    console.error("Error adding flow:", error);
  }
}

// Delete flow from DB
export async function deleteFlow(flowId, showAllFlows) {
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

// Update flow name in DB
export async function updateFlowName(
  flow,
  editedFlowName,
  setEditable,
  showAllFlows
) {
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
