import { useUser } from "../utilities/UserContext";
import Input from "../buildingBlocks/Input";
import { useEffect, useState } from "react";
import Button from "../buildingBlocks/Button";
import { updatePassword, updateDisplayName } from "../utilities/api";
import Notification from "../buildingBlocks/Notification";
import { checkLoggedIn } from "../utilities/api";

export default function Preferences() {
  const { authState, dispatch } = useUser();
  console.log(authState);

  // Password states
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword2, setNewPassword2] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [updatePassEnabled, setUpdatePassEnabled] = useState<boolean>(true);

  // Display Name states
  const [displayName, setDisplayName] = useState<string>("");
  const [errorMessageDisplayName, setErrorMessageDisplayName] =
    useState<string>("");
  const [updateDisplayNameEnabled, setUpdateDispalyNameEnabled] =
    useState<boolean>(true);

  useEffect(() => {
    if (!authState.dataLoading) {
      setDisplayName(authState.displayName);
    }
  }, [authState.dataLoading, authState.displayName]);

  // Enable/disable save button for password
  useEffect(() => {
    if (
      newPassword !== newPassword2 &&
      newPassword !== "" &&
      newPassword2 !== ""
    ) {
      setErrorMessagePassword("Password do not match");
    } else {
      setErrorMessagePassword("");
    }

    if (
      currentPassword.length >= 8 &&
      newPassword.length >= 8 &&
      newPassword2.length >= 8 &&
      newPassword === newPassword2
    ) {
      setUpdatePassEnabled(false);
    } else {
      setUpdatePassEnabled(true);
    }
  }, [newPassword, newPassword2, currentPassword]);

  // Enable/disable save button for display name
  useEffect(() => {
    if (displayName === "") {
      setErrorMessageDisplayName("Display name cannot be empty");
    } else {
      setErrorMessageDisplayName("");
    }

    if (displayName === "" || displayName === authState.displayName) {
      setUpdateDispalyNameEnabled(true);
    } else {
      setUpdateDispalyNameEnabled(false);
    }
  }, [displayName, authState.displayName]);

  function handlePasswordUpdate(event: React.FormEvent<HTMLFormElement>) {
    updatePassword(
      event,
      authState.userId,
      currentPassword,
      newPassword,
      setErrorMessagePassword,
      setCurrentPassword,
      setNewPassword,
      setNewPassword2,
      setOpen,
      setNotificationMessage,
      setSeverity
    );
  }

  function handleDisplayNameUpdate(event: React.FormEvent<HTMLFormElement>) {
    updateDisplayName(
      event,
      authState.userId,
      displayName,
      setErrorMessageDisplayName,
      setOpen,
      setNotificationMessage,
      setSeverity
    ).then(() => {
      checkLoggedIn(dispatch);
    });
  }

  // Notification settings
  const [isOpen, setOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
  function handleNotificationClose() {
    setOpen(false);
  }

  return (
    <>
      <Notification
        open={isOpen}
        message={notificationMessage}
        handleClose={handleNotificationClose}
        severity={severity}
      />
      {!authState.dataLoading ? (
        <>
          <div className="flex w-full flex-col">
            <form
              method="POST"
              onSubmit={handleDisplayNameUpdate}
              className="flex w-[400px] flex-col"
            >
              <p className=" pb-4 text-start text-2xl text-[#a0a0a0]">
                Update display name
              </p>
              <div className="">
                <Input
                  inputType="authTextInput"
                  type="displayName"
                  labelFor="displayName"
                  labelValue="Display name"
                  inputValue={displayName}
                  inputPlaceholder=""
                  inputId="displayName"
                  inputName="displayName"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDisplayName(e.target.value)
                  }
                  required={true}
                  minLength={5}
                ></Input>
              </div>

              <p className="mb-2 mt-2 h-[20px] w-full text-start text-sm font-medium text-[red]">
                {errorMessageDisplayName ? errorMessageDisplayName : null}
              </p>
              <Button
                componentType="passwordUpdate"
                type="submit"
                label="Save"
                enabled={updateDisplayNameEnabled}
              ></Button>
            </form>
            <div className="mb-5 mt-5 h-[1px] w-[400px] min-w-[400px] bg-[#323232]"></div>

            {authState.type === "password" ? (
              <form
                method="POST"
                onSubmit={handlePasswordUpdate}
                className="flex w-[400px] flex-col"
              >
                <p className=" pb-4 text-start text-2xl text-[#a0a0a0]">
                  Change password
                </p>
                <div className="pb-4">
                  <Input
                    inputType="authTextInput"
                    type="password"
                    labelFor="current-password"
                    labelValue="Current password"
                    inputValue={currentPassword}
                    inputPlaceholder="••••••••"
                    inputId="current-password"
                    inputName="current-password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurrentPassword(e.target.value)
                    }
                    required={true}
                    minLength={8}
                  ></Input>
                </div>
                <div className="pb-4">
                  <Input
                    inputType="authTextInput"
                    type="password"
                    labelFor="new-password"
                    labelValue="New password"
                    inputValue={newPassword}
                    inputPlaceholder="••••••••"
                    inputId="new-password"
                    inputName="new-password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPassword(e.target.value)
                    }
                    required={true}
                    minLength={8}
                  ></Input>
                </div>
                <div className="">
                  <Input
                    inputType="authTextInput"
                    type="password"
                    labelFor="new-password-2"
                    labelValue="Confirm password"
                    inputValue={newPassword2}
                    inputPlaceholder="••••••••"
                    inputId="new-password-2"
                    inputName="new-password-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPassword2(e.target.value)
                    }
                    required={true}
                    minLength={8}
                  ></Input>
                </div>

                <p className="mb-2 mt-2 h-[20px] w-full text-start text-sm font-medium text-[red]">
                  {errorMessagePassword ? errorMessagePassword : null}
                </p>
                <Button
                  componentType="passwordUpdate"
                  type="submit"
                  label="Save"
                  enabled={updatePassEnabled}
                ></Button>
              </form>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
