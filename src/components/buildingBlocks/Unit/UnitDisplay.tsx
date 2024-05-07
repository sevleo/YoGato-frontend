import Input from "../Input";
import Button from "../Button";
import { ForwardedRef, forwardRef } from "react";
import { CSSProperties } from "react";
import { Dispatch, SetStateAction } from "react";

interface UnitDisplayProps {
  id?: string;
  style?: object;
  dragAllowed?: boolean;
  index?: number | undefined;
  image?: string | undefined;
  name?: string;
  sanskritName?: string;
  duration?: number;
  handleLengthChange?: (newValue: number) => void;
  setDragAllowed?: Dispatch<SetStateAction<boolean>>;
  enableDrag?: () => void;
  onUnitCloseClick?: () => void;
  disableDrag?: () => void;
  withOpacity?: boolean;
  lastUnit?: boolean;
  isDragging?: boolean;
}

const UnitDisplay = forwardRef<HTMLDivElement, UnitDisplayProps>(
  (
    {
      id,
      style,
      dragAllowed,
      index,
      image,
      name,
      sanskritName,
      duration,
      handleLengthChange,
      setDragAllowed,
      enableDrag,
      onUnitCloseClick,
      disableDrag,
      withOpacity,
      lastUnit,
      isDragging,
      ...props
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.3" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      borderBottom: !lastUnit ? "1px solid #323232" : "",
      borderTop: isDragging ? "1px solid #323232" : "1px solid transparent",
      background: isDragging ? "#1e1e1e" : "",
      //   boxShadow: isDragging
      //     ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
      //     : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      //   transform: isDragging ? "scale(1.02)" : "scale(1)",
      ...style,
    };

    return (
      <>
        <div
          ref={ref}
          style={inlineStyles}
          {...(dragAllowed ? { ...props } : null)}
          {...(dragAllowed ? { ...props } : null)}
          className=""
        >
          {/* For desktop */}
          <div
            className={`unit step relative hidden h-[60px] touch-none select-none grid-cols-[0.2fr_1fr_2fr_2fr_1.5fr] items-center  justify-between gap-1 pl-2 pr-2 text-black sm:grid min-[1000px]:grid-cols-[0.2fr_1fr_2fr_2fr_1.5fr_0.5fr] `}
          >
            <div className=" flex h-[60px] min-w-[50px] items-center justify-center text-sm font-medium text-[#a0a0a0]">
              {index != null ? Number(index + 1) : null}
            </div>

            <div className="flex h-[60px] w-fit min-w-[50px] items-center justify-center">
              <img
                className="  h-3/4 w-3/4  "
                src={image}
                alt=""
                draggable="false"
              />
            </div>
            <div className=" flex h-[60px] min-w-[100px] flex-col items-center justify-center text-sm font-medium text-[#a0a0a0]">
              <p className="text-xsm w-full pl-4 text-left font-semibold">
                {name}
              </p>
              <p className="text-xsm block w-full pl-4 text-left font-semibold min-[1000px]:hidden">
                {sanskritName}
              </p>
            </div>
            <div className="hidden h-[60px] min-w-[60px] flex-col items-center justify-center text-sm font-medium text-[#a0a0a0] min-[1000px]:flex">
              <p className="text-xsm w-full pl-4 text-left font-semibold">
                {sanskritName}
              </p>
            </div>
            <div className="main-element flex h-[60px] w-fit justify-between pl-2 pr-2">
              <div className="mb-auto mt-auto flex  flex-col gap-2 ">
                <Input
                  inputType="unitDurationInput"
                  labelValue=""
                  labelFor={id}
                  defaultValue={duration}
                  onChange={handleLengthChange}
                  inputId={id}
                  setDragAllowed={setDragAllowed}
                />
              </div>
            </div>
            <div
              className="flex max-h-[30px] items-center justify-center"
              onMouseLeave={enableDrag}
            >
              <div
                className=" hover:cursor-pointer"
                onClick={onUnitCloseClick}
                onMouseEnter={disableDrag}
                onMouseLeave={enableDrag}
              >
                <Button componentType="unitDelete" enabled={true}>
                  <p className=" mb-0 flex select-none items-center justify-center">
                    <span className="material-symbols-outlined text-[18px] text-[#a0a0a0]">
                      delete
                    </span>
                  </p>
                </Button>
              </div>
            </div>
          </div>
          {/* For mobile */}
          <div
            className={` unit step relative flex h-full touch-none select-none items-center justify-start gap-2 pl-4 pr-10 text-black sm:hidden`}
          >
            <div className=" flex h-[60px] w-[20px] items-center justify-center text-sm font-medium text-[#a0a0a0]">
              {index != null ? Number(index + 1) : null}
            </div>

            <div className="flex h-[80px] w-[80px] min-w-[80px] items-center justify-center">
              <img
                className="  h-3/4 w-3/4  "
                src={image}
                alt=""
                draggable="false"
              />
            </div>
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-full w-full flex-col items-start justify-between">
                <p className="w-full pt-2 text-left text-lg font-semibold  text-[#a0a0a0]">
                  {name}
                </p>
                <div
                  className="absolute  right-2 top-2"
                  onMouseLeave={enableDrag}
                >
                  <div
                    className=" hover:cursor-pointer"
                    onClick={onUnitCloseClick}
                    onMouseEnter={disableDrag}
                    onMouseLeave={enableDrag}
                  >
                    <Button componentType="unitDelete" enabled={true}>
                      <p className=" mb-0 flex select-none items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-[#a0a0a0]">
                          delete
                        </span>
                      </p>
                    </Button>
                  </div>
                </div>

                <div className="main-element flex h-[60px] w-fit justify-between">
                  <div className="flex flex-col  justify-end gap-2 pb-2 ">
                    <Input
                      inputType="unitDurationInput"
                      labelValue=""
                      labelFor={id}
                      defaultValue={duration}
                      onChange={handleLengthChange}
                      inputId={id}
                      setDragAllowed={setDragAllowed}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default UnitDisplay;
