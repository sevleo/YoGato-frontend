import { MouseEvent } from "react";
import { MouseEventHandler } from "react";

interface ButtonProps {
  type: string;
  onClick:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | (MouseEventHandler<HTMLButtonElement> | undefined);
  label: string;
  enabled?: boolean;
}

export default function Button(props: ButtonProps) {
  let styles;
  if (
    props.type === "builderSave" ||
    props.type === "builderPreview" ||
    props.type === "builderClear"
  ) {
    if (props.enabled === false) {
      styles = `h-full w-[100px] rounded-none border-[1px] ${props.enabled ? "over:border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] active:bg-[#9b9b9b2a]" : " bg-[#545454]  text-[#ffffff88] hover:border-transparent hover:outline-none"}  focus:outline-none`;
    } else {
      styles = `h-full w-[100px] rounded-none border-[1px] over:border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] active:bg-[#9b9b9b2a]" focus:outline-none`;
    }
  }

  return (
    <>
      <button className={styles} onClick={props.onClick}>
        {props.label}
      </button>
    </>
  );
}
