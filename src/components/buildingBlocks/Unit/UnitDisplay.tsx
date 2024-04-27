import Input from "../Input";
import Button from "../Button";

function UnitDisplay(props) {
  return (
    <>
      <div
        onMouseEnter={props.enableUnitClose}
        onMouseLeave={props.disableUnitClose}
        ref={props.setNodeRef}
        style={props.style}
        className="unit step relative grid  h-[60px] cursor-default select-none grid-cols-[0.5fr_1fr_2fr_2fr_1.5fr_0.5fr] items-center  justify-between gap-1 text-black  hover:cursor-pointer"
        {...(props.dragAllowed ? { ...props.attributes } : null)}
        {...(props.dragAllowed ? { ...props.listeners } : null)}
      >
        <div className=" flex h-[60px] min-w-[50px] items-center justify-center text-sm font-medium text-[#a0a0a0]">
          {props.index != null ? Number(props.index + 1) : null}
        </div>

        <div className="flex h-[60px] w-full items-center justify-center">
          <img
            className="  h-3/4 w-3/4  "
            src={props.image}
            alt=""
            draggable="false"
          />
        </div>
        <div className=" flex h-[60px] min-w-[100px] flex-col items-center justify-center text-sm font-medium text-[#a0a0a0]">
          <p className="text-xsm w-full pl-4 text-left font-semibold">
            {props.name}
          </p>
        </div>
        <div className=" flex h-[60px] min-w-[100px] flex-col items-center justify-center text-sm font-medium text-[#a0a0a0]">
          <p className="text-xsm w-full pl-4 text-left font-semibold">
            {props.sanskritName}
          </p>
        </div>
        <div className="main-element flex h-[60px] justify-between">
          <div className="mb-auto mt-auto flex  flex-col gap-2 ">
            <Input
              inputType="unitDurationInput"
              labelValue=""
              labelFor={props.id}
              defaultValue={props.duration}
              onChange={props.handleLengthChange}
              inputId={props.id}
              setDragAllowed={props.setDragAllowed}
            />
          </div>
        </div>
        <div
          className="flex max-h-[30px] w-full items-center justify-center "
          onMouseLeave={props.enableDrag}
        >
          <div
            className=" hover:cursor-pointer"
            onClick={props.onUnitCloseClick}
            onMouseEnter={props.disableDrag}
            onMouseLeave={props.enableDrag}
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

export default UnitDisplay;
