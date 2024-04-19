import { MouseEvent } from "react";
import { MouseEventHandler } from "react";

interface ButtonProps {
  componentType: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (MouseEventHandler<HTMLButtonElement> | undefined);
  label: string;
  enabled?: boolean;
}

export default function Button(props: ButtonProps) {
  let styles;
  if (
    props.componentType === "builderSave" ||
    props.componentType === "builderPreview" ||
    props.componentType === "builderClear" ||
    props.componentType === "previewStart" ||
    props.componentType === "previewResumePause" ||
    props.componentType === "previewStop" ||
    props.componentType === "previewCancel"
  ) {
    if (props.enabled === false) {
      styles = `h-full w-[100px] rounded-none border-[1px] ${props.enabled ? "over:border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] active:bg-[#9b9b9b2a]" : " bg-[#545454]  text-[#ffffff88] hover:border-transparent hover:outline-none"}  focus:outline-none`;
    } else {
      styles = `h-full w-[100px] rounded-none border-[1px] over:border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] active:bg-[#9b9b9b2a]" focus:outline-none`;
    }
  } else if (props.componentType === "loginPopupGoogle") {
    styles =
      "w-full border-[1px] border-[#3D3D3D] bg-[#2e2e2e] text-white outline-none transition-all duration-200 hover:border-[#505050] hover:bg-[#343434] focus:outline-none";
  } else if (
    props.componentType === "loginPopupSignin" ||
    props.componentType === "loginPopupSignun"
  ) {
    styles =
      "border-box mt-4 w-full border-[1px] border-[#6ccc93] bg-[#54976f] text-white outline-none transition-all duration-200 hover:border-[#6ccc93] hover:bg-[#497f5e] focus:outline-none";
  } else if (
    props.componentType === "myFlowsPreview" ||
    props.componentType === "myFlowsEdit" ||
    props.componentType === "myFlowsDelete"
  ) {
    styles = `${props.enabled ? "pointer-events-auto" : "pointer-events-none bg-[#8080806b] text-[gray]"}`;
  } else if (
    props.componentType === "heroSignIn" ||
    props.componentType === "heroLetsGo"
  ) {
    styles =
      " w-[150px] h-[40px] border-box mt-4 border-[1px] border-[#6ccc93] bg-[#54976f] text-white outline-none transition-all duration-200 hover:border-[#6ccc93] hover:bg-[#497f5e] focus:outline-none flex justify-center items-center";
  } else if (props.componentType === "heroDemo") {
    styles =
      " w-[150px] h-[40px] border-box mt-4 border-[1px] border-[#3D3D3D] bg-[#2e2e2e] text-white outline-none transition-all duration-200 hover:border-[#505050] hover:bg-[#343434] focus:outline-none flex justify-center items-center";
  }
  return (
    <>
      <button
        type={props.type}
        className={styles}
        onClick={props.enabled ? props.onClick : undefined}
      >
        {props.label}
      </button>
    </>
  );
}
