import { MouseEvent, ReactElement } from "react";
import { MouseEventHandler } from "react";

interface ButtonProps {
  componentType: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (MouseEventHandler<HTMLButtonElement> | undefined);
  label?: string;
  enabled?: boolean;
  children?: ReactElement;
}

export default function Button(props: ButtonProps) {
  let styles;

  switch (props.componentType) {
    case "builderSave":
    case "builderPreview":
    case "builderClear":
    case "previewStart":
    case "previewResumePause":
    case "previewStop":
    case "previewCancel":
      styles = `w-[100px] text-sm h-[36px] border-box border-[1px] flex justify-center items-center text-white outline-none transition-all p-0 duration-200 focus:outline-none ${props.enabled ? "border-[#6ccc93] hover:border-[1px] hover:border-[#6ccc93] hover:bg-[#497f5e] bg-[#54976f] white " : " bg-[#545454]  text-[#ffffff88] hover:border-transparent hover:outline-none"}  focus:outline-none`;
      break;
    case "loginPopupGoogle":
      styles =
        "w-full border-[1px] border-[#3D3D3D] bg-[#2e2e2e] text-white outline-none transition-all duration-200 hover:border-[#505050] hover:bg-[#343434] focus:outline-none";
      break;
    case "loginPopupSignin":
    case "loginPopupSignun":
      styles =
        "border-box mt-4 w-full border-[1px] border-[#6ccc93] bg-[#54976f] text-white outline-none transition-all duration-200 hover:border-[#6ccc93] hover:bg-[#497f5e] focus:outline-none";
      break;
    case "myFlowsDelete":
    case "myFlowsEdit":
      styles = ` focus:outline-none hover:border-[#525252] hover:bg-[#363636] w-[30px] h-[30px] p-0 flex justify-center items-center bg-[#2e2e2e] border-[1px] border-[#3e3e3e] ${props.enabled ? "pointer-events-auto" : "pointer-events-none bg-[#8080806b] text-[gray]"}`;
      break;
    case "myFlowsPreview":
      styles = ` focus:outline-none hover:border-[#525252] hover:bg-[#363636] w-[30px] h-[30px] p-0 flex justify-center items-center bg-[#2e2e2e] border-[1px] border-[#3e3e3e] ${props.enabled ? "pointer-events-auto" : "pointer-events-none bg-[#8080806b] text-[gray]"}`;
      break;
    case "heroSignIn":
    case "heroLetsGo":
      styles =
        " w-[150px] h-[40px] border-box mt-4 border-[1px] border-[#6ccc93] bg-[#54976f] text-white outline-none transition-all duration-200 hover:border-[#6ccc93] hover:bg-[#497f5e] focus:outline-none flex justify-center items-center";
      break;
    case "heroDemo":
      styles =
        " w-[150px] h-[40px] border-box mt-4 border-[1px] border-[#3D3D3D] bg-[#2e2e2e] text-white outline-none transition-all duration-200 hover:border-[#505050] hover:bg-[#343434] focus:outline-none flex justify-center items-center";
      break;
    case "myFlowsCreate":
      styles =
        "  min-w-[100px] max-[650px]:w-full w-[100px] text-sm h-[36px] border-box border-[1px] border-[#6ccc93] bg-[#54976f] text-white outline-none  transition-colors p-0 duration-200 hover:border-[#6ccc93] hover:bg-[#497f5e] focus:outline-none flex justify-center items-center";
      break;
    case "unitDelete":
      styles = `focus:outline-none hover:border-[#525252] hover:bg-[#363636] w-[30px] h-[30px] p-0 flex justify-center items-center bg-[#2e2e2e] border-[1px] border-[#3e3e3e] ${props.enabled ? "pointer-events-auto" : "pointer-events-none bg-[#8080806b] text-[gray]"}`;
  }

  return (
    <>
      <button
        type={props.type}
        className={styles}
        onClick={props.enabled ? props.onClick : undefined}
      >
        {props.label}
        {props.children}
      </button>
    </>
  );
}
