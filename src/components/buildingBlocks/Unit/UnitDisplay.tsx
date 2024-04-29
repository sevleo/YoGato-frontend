import Input from "../Input";
import Button from "../Button";
import { forwardRef } from "react";
import { CSSProperties } from "react";

const UnitDisplay = forwardRef(
  (
    {
      id,
      style,
      enableUnitClose,
      disableUnitClose,
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
      isDragging,
      withOpacity,
      lastUnit,
      ...props
    },
    ref
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
          onMouseEnter={enableUnitClose}
          onMouseLeave={disableUnitClose}
          ref={ref}
          style={inlineStyles}
          className={`  unit step relative grid  h-[60px] select-none grid-cols-[0.5fr_1fr_2fr_2fr_1.5fr_0.5fr] items-center  justify-between gap-1 text-black `}
          {...(dragAllowed ? { ...props } : null)}
          {...(dragAllowed ? { ...props } : null)}
        >
          <div className=" flex h-[60px] min-w-[50px] items-center justify-center text-sm font-medium text-[#a0a0a0]">
            {index != null ? Number(index + 1) : null}
          </div>

          <div className="flex h-[60px] w-full items-center justify-center">
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
          </div>
          <div className=" flex h-[60px] min-w-[100px] flex-col items-center justify-center text-sm font-medium text-[#a0a0a0]">
            <p className="text-xsm w-full pl-4 text-left font-semibold">
              {sanskritName}
            </p>
          </div>
          <div className="main-element flex h-[60px] justify-between">
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
            className="flex max-h-[30px] w-full items-center justify-center "
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
      </>
    );
  }
);

export default UnitDisplay;