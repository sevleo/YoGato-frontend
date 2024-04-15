import { useState } from "react";
import { Dispatch } from "react";

interface InputProps {
  inputType: string;
  labelValue: string;
  labelFor: string;
  defaultValue?: number;
  onChange:
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | ((newValue: number) => void);
  inputValue?: string;
  inputPlaceholder?: string;
  inputId: string;
  inputName?: string;
  setDragAllowed?: Dispatch<React.SetStateAction<boolean>>;
}

export default function Input(props: InputProps) {
  if (props.inputType === "unitDurationInput") {
    return (
      <UnitDurationInput
        labelValue={props.labelValue}
        labelFor={props.labelFor}
        defaultValue={props.defaultValue as number}
        onChange={props.onChange as (newValue: number) => void}
        inputId={props.inputId}
        setDragAllowed={
          props.setDragAllowed as Dispatch<React.SetStateAction<boolean>>
        }
      ></UnitDurationInput>
    );
  }
  if (props.inputType === "textInput") {
    return (
      <TextInput
        labelValue={props.labelValue}
        labelFor={props.labelFor}
        onChange={
          props.onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
        }
        inputValue={props.inputValue as string}
        inputPlaceholder={props.inputPlaceholder as string}
        inputId={props.inputId}
        inputName={props.inputName as string}
      ></TextInput>
    );
  }
}

interface UnitDurationInputProps {
  labelValue: string;
  labelFor: string;
  defaultValue: number;
  onChange: (newValue: number) => void;
  inputId: string;
  setDragAllowed: Dispatch<React.SetStateAction<boolean>>;
}

function UnitDurationInput(props: UnitDurationInputProps) {
  const [value, setValue] = useState(props.defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "" || event.target.value.startsWith("0")) {
      setValue(Number(1));
      props.onChange(Number(1));
    } else {
      setValue(Number(event.target.value));
      props.onChange(Number(event.target.value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && value >= 0 && value <= 10) {
      // setValue(Number(1));
      // onChange(Number(1));
      e.preventDefault();
      e.currentTarget.select();
    } else if (
      !/^\d$/.test(e.key) &&
      e.key !== "Delete" &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      e.key !== "Escape"
    ) {
      e.preventDefault();
    }
  };

  const handlePlusFiveSeconds = () => {
    if (value === 1) {
      setValue(value + 4);
      props.onChange(value + 4);
    } else {
      setValue(value + 5);
      props.onChange(value + 5);
    }
  };

  const handleMinusFiveSeconds = () => {
    const newValue = value - 5;
    if (newValue < 1) {
      setValue(1);
      props.onChange(1);
    } else {
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  const disableDrag = () => {
    props.setDragAllowed(false);
  };

  const enableDrag = () => {
    props.setDragAllowed(true);
  };

  return (
    <div className="group relative flex flex-row items-center rounded-md bg-[#50422E] ">
      <label htmlFor={props.labelFor} className=" ">
        {props.labelValue}
      </label>
      <div
        onClick={handleMinusFiveSeconds}
        className="z-10 mr-auto select-none rounded-l-md border-r border-[#22201E] pb-[2px] pl-[5px] pr-[5px] pt-[2px] text-xs font-normal hover:cursor-pointer hover:bg-[#AA954E] active:bg-[#D3C55E]"
        onMouseEnter={disableDrag}
        onMouseLeave={enableDrag}
      >
        -5
      </div>
      <input
        type="text"
        id={props.inputId}
        value={value}
        className=" z-10 w-full bg-transparent p-[2px] text-center text-xs font-normal opacity-0 outline-none focus-within:bg-[#AA954E] hover:bg-[#AA954E] hover:text-transparent  hover:opacity-100 focus:z-20 focus:text-black focus:opacity-100"
        onChange={handleChange}
        inputMode="numeric"
        pattern="[1-9]*"
        onMouseEnter={disableDrag}
        onMouseLeave={enableDrag}
        onKeyDown={handleKeyDown}
      />
      <div className=" pointer-events-none absolute z-10 ml-auto mr-auto w-full bg-transparent text-xs font-normal">
        {value + "s"}
      </div>
      <div
        onClick={handlePlusFiveSeconds}
        className="z-10 ml-auto select-none rounded-r-md border-l border-[#22201E] pb-[2px] pl-[5px] pr-[5px] pt-[2px] text-xs font-normal hover:cursor-pointer hover:bg-[#AA954E] active:bg-[#D3C55E]"
        onMouseEnter={disableDrag}
        onMouseLeave={enableDrag}
      >
        +5
      </div>
    </div>
  );
}

interface TextInputProps {
  labelValue: string;
  labelFor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  inputPlaceholder: string;
  inputId: string;
  inputName: string;
}

function TextInput(props: TextInputProps) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2">
      <label
        htmlFor={props.labelFor}
        className="text-sm font-medium text-[#A0A0A0]"
      >
        {props.labelValue}
      </label>
      <input
        id={props.inputId}
        name={props.inputName}
        placeholder={props.inputPlaceholder}
        type="text"
        value={props.inputValue}
        onChange={props.onChange}
        className=" h-9 w-full rounded-md border-[1px] border-[#3D3D3D] bg-[#212121] pb-2 pl-4 pr-4 pt-2 outline outline-[2px] outline-transparent transition-all placeholder:text-[#ededed80] focus:border-[#707070] focus:outline-[#232323]"
        required
        minLength={5}
      />
    </div>
  );
}
