import { useUser } from "../utilities/UserContext";
import Input from "../buildingBlocks/Input";
import { useEffect, useState } from "react";
import Button from "../buildingBlocks/Button";
import { updatePassword } from "../utilities/api";

export default function Preferences() {
  const { authState } = useUser();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword2, setNewPassword2] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [updatePassEnabled, setUpdatePassEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      newPassword !== newPassword2 &&
      newPassword !== "" &&
      newPassword2 !== ""
    ) {
      setErrorMessage("Password do not match");
    } else {
      setErrorMessage("");
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

  function handlePasswordUpdate(event: React.FormEvent<HTMLFormElement>) {
    console.log("api call to update password");
    console.log(authState.userId);
    updatePassword(
      event,
      authState.userId,
      currentPassword,
      newPassword,
      setErrorMessage,
      setCurrentPassword,
      setNewPassword,
      setNewPassword2
    );
  }

  return (
    <>
      {" "}
      {!authState.dataLoading ? (
        <>
          <div className="w-full">
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
                  {errorMessage ? errorMessage : null}
                </p>
                <Button
                  componentType="passwordUpdate"
                  type="submit"
                  label="Save"
                  enabled={updatePassEnabled}
                ></Button>
              </form>
            ) : (
              <div>
                <p>google user</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
