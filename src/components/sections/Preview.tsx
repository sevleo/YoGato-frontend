import { Dispatch, SetStateAction } from "react";
import { useState, useEffect, useRef } from "react";
import mp3Provider from "../../assets/mp3Provider";
import { FlowType } from "./Flow";
import "./Preview.css";
import Wheel from "../buildingBlocks/Wheel";
import CircularProgressBar from "../buildingBlocks/CircularProgressBar/CircularProgressBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LinearProgress, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ProgressBar } from "react-bootstrap";

interface PreviewProps {
  flow: FlowType;
  setFlowState: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function Preview({ flow, setFlowState }: PreviewProps) {
  // Theme for linear progress bar
  const linearProgressBarTheme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: "10px",
            borderRadius: "10px",
          },
          bar: {
            height: "10px",
            borderRadius: "10px",
          },
        },
      },
    },
  });

  const [startFlow, setStartFlow] = useState<boolean>(false);
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
  const [flowCount, setFlowCount] = useState<number>(0);
  const [flowPercent, setFlowPercent] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [unitPercent, setUnitPercent] = useState<number>(0);

  const [updateWheel, setUpdateWheel] = useState(false);

  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  // Slider settings
  const settings = {
    // centerPadding: "50px",
    // centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
  };

  const sliderRef = useRef<Slider>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Flowing :)
  useEffect(() => {
    let secondCounter: number;
    let percentCounter: number;
    if (startFlow) {
      secondCounter = setInterval(() => {
        setUnitCount((unitCount: number) => {
          // console.log(`Unit count: ${unitCount + 1}`);
          let newUnitCount: number;

          if (unitCount + 1 === flow.units[currentUnitIndex].duration) {
            if (flow.units[currentUnitIndex + 1]) {
              const audio = new Audio(
                mp3Provider(flow.units[currentUnitIndex + 1].url_svg_alt_local)
              );
              // setTimeout(() => {
              //   audio.play();
              // }, 1000);
              audio.play();
              console.log(flow.units[currentUnitIndex + 1].announcement);
              next();
            }
            setCurrentUnitIndex(currentUnitIndex + 1);
            setUpdateWheel(true);
            setUnitPercent(0);
            newUnitCount = 0;
          } else {
            newUnitCount = unitCount + 1;
          }
          return newUnitCount;
        });

        setFlowCount((flowCount: number) => {
          console.log(`Total count: ${flowCount + 1}`);
          let newFlowCount: number;

          if (flowCount + 1 === flow.duration) {
            newFlowCount = 0;
            setStartFlow(false);

            console.log(`End of flow.`);
            next();
          } else {
            newFlowCount = flowCount + 1;
          }
          return newFlowCount;
        });
      }, 1000);

      percentCounter = setInterval(() => {
        setFlowPercent((flowPercent) => {
          const increment = 100 / (flow.duration * 100);
          const newFlowPercent: number = Math.min(flowPercent + increment, 100);
          //   console.log(newFlowPercent);
          return newFlowPercent;
        });

        setUnitPercent((unitPercent) => {
          const increment = 100 / (flow.units[currentUnitIndex].duration * 100);
          const newUnitPercent: number = Math.min(unitPercent + increment, 100);
          console.log(newUnitPercent);
          return newUnitPercent;
        });
      }, 10);
    }

    return () => {
      clearInterval(secondCounter);
      clearInterval(percentCounter);
    };
  }, [startFlow, flow, currentUnitIndex, updateWheel]);

  function handleStartButtonClick() {
    setStartFlow(!startFlow);
    setCurrentUnitIndex(0);
    setFlowPercent(0);
    console.log(`Count active: ${!startFlow}`);
    const audio = new Audio(mp3Provider(flow.units[0].url_svg_alt_local));
    audio.play();
    console.log(flow.units[0].announcement);
  }

  function handleCancelButtonClick() {
    setFlowState("setup");
  }

  return (
    <div
      className=" preview ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px]"
      // style={{ minHeight: "calc(100% - 60px)" }}
    >
      <div className="w-3/4">
        <div className="ml-auto mr-auto grid w-full grid-cols-[1fr_1fr] items-start justify-center  bg-[#ffffff18] text-black transition-colors hover:bg-[#ffffff38]">
          <div className="flex w-full flex-col items-start justify-center  gap-1 p-5 ">
            <div className=" grid w-full grid-cols-[1fr_2fr] gap-2">
              <p className=" text-start text-white">Duration</p>
              <p className="text-start text-white">
                {hours > 0 ? <span>{hours} hours, </span> : null}
                {minutes > 0 ? <span>{minutes} minutes, </span> : null}
                {seconds > 0 ? <span>{seconds} seconds.</span> : null}
              </p>
            </div>
            <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
              <p className="  text-start text-white">Poses</p>
              <p className="text-start text-white">{flow.units.length}</p>
            </div>
            <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
              <p className="text-start text-white">Unique poses</p>
              <p className="text-start text-white">
                {flow.uniqueAspects.length}
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-row items-center justify-end gap-2 p-5">
            <button
              className={`over:border-[1px] h-full w-[100px] rounded-none border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] focus:outline-none active:bg-[#9b9b9b2a]`}
              onClick={handleStartButtonClick}
            >
              Start
            </button>
            <button
              className={`over:border-[1px] h-full w-[100px] rounded-none border-[1px] bg-[#143a1e] text-white hover:border-white hover:bg-[#143a1e] focus:outline-none active:bg-[#9b9b9b2a]`}
              onClick={handleCancelButtonClick}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="canvas flex h-full w-full flex-col items-center justify-center pt-2">
          <div className="flex h-full w-full flex-row items-center justify-center">
            <div className="image-track m-auto mr-[4px] h-full w-1/2 bg-[#ffffff18] p-5 transition-colors hover:bg-[#ffffff38]">
              <div className=" ml-auto mr-auto flex h-full max-w-[400px] flex-col">
                <Slider {...settings} ref={sliderRef}>
                  {flow.units.map((unit, index) => {
                    return (
                      <div
                        key={unit.id}
                        className=" image h-full w-[200px] bg-[transparent] text-black"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <CircularProgressBar
                            percentValue={Math.round(unitPercent)}
                            value={
                              <>
                                {/* {<p className=" text-[2vw]"> {unit.name}</p>} */}
                                {
                                  <img
                                    className="w-2/3"
                                    src={unit.image}
                                    alt=""
                                  />
                                }
                              </>
                            }
                          ></CircularProgressBar>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
                {/* <div className="p-[10px]">
                <CircularProgressBar
                  percentValue={Math.round(unitPercent)}
                ></CircularProgressBar>
              </div> */}

                {/* <div className="mt-2 flex flex-col items-start justify-center">
                <div className="grid w-full grid-cols-[1fr_1fr]">
                  <p className="ltr text-start ">Unit:</p>
                  {currentUnitIndex + 1 > flow.units.length ? (
                    <p className="text-start">0 / {flow.units.length}</p>
                  ) : (
                    <p className="text-start">
                      {currentUnitIndex + 1} / {flow.units.length}
                    </p>
                  )}
                </div>
                <div className="grid w-full grid-cols-[1fr_1fr]">
                  <p className="ltr text-start ">Duration:</p>
                  <p className="text-start">
                    {unitCount} /{" "}
                    {flow.units[currentUnitIndex]
                      ? flow.units[currentUnitIndex].duration
                      : flow.units[0].duration}{" "}
                    seconds
                  </p>
                </div>
                <div className="grid w-full grid-cols-[1fr_1fr]">
                  <p className="text-start">Percent: </p>
                  <p className="text-start">{Math.round(unitPercent)}%</p>
                </div>
              </div> */}
              </div>
            </div>
            <div className=" ml-[4px] flex h-full w-1/2 flex-col bg-[#ffffff18] p-2 transition-colors hover:bg-[#ffffff38]">
              {/* <div className="">
              <CircularProgressBar
                percentValue={Math.round(flowPercent)}
              ></CircularProgressBar>
            </div>

            <div>
              <p className="ltr flex h-full items-center justify-center p-2">
                Total flow: {flowCount} / {flow.duration} seconds
              </p>
            </div> */}
              <div className="mt-2 flex flex-col items-start justify-center">
                <div className="flex w-full items-start justify-start">
                  {currentUnitIndex + 1 > flow.units.length ? (
                    <p className="text-start text-[20px]">
                      1 / {flow.units.length}
                    </p>
                  ) : (
                    <p className="text-start text-[20px]">
                      {currentUnitIndex + 1} / {flow.units.length}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-start text-[20px]">
                    {flow.units[currentUnitIndex]
                      ? flow.units[currentUnitIndex].name
                      : flow.units[0].name}
                  </p>
                </div>
                <div className="grid w-full grid-cols-[1fr_1fr]">
                  <p className="ltr text-start text-[20px] ">Duration:</p>
                  <p className="text-start text-[20px]">
                    {unitCount} /{" "}
                    {flow.units[currentUnitIndex]
                      ? flow.units[currentUnitIndex].duration
                      : flow.units[0].duration}{" "}
                    seconds
                  </p>
                </div>
                <div className="grid w-full grid-cols-[1fr_1fr]">
                  <p className="text-start text-[20px]">Percent: </p>
                  <p className="text-start text-[20px]">
                    {Math.round(unitPercent)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[8px] flex h-full w-full items-center justify-center bg-[#ffffff18] transition-colors hover:bg-[#ffffff38]">
            {/* <div className="">
              <CircularProgressBar
                percentValue={Math.round(flowPercent)}
              ></CircularProgressBar>
            </div>

            <div>
              <p className="ltr flex h-full items-center justify-center p-2">
                Total flow: {flowCount} / {flow.duration} seconds
              </p>
            </div> */}
            <div className="w-1/2">
              <ThemeProvider theme={linearProgressBarTheme}>
                <LinearProgress
                  key={flowPercent}
                  color="inherit"
                  variant="determinate"
                  value={flowPercent}
                  sx={{
                    "& .MuiLinearProgress-bar1Determinate": {
                      // backgroundColor: "red",
                      // height: "10px",
                    },
                  }}
                />
              </ThemeProvider>
              <p>{Math.round(flowPercent)}%</p>
              <p className="ltr flex h-full items-center justify-center p-2">
                Total flow: {flowCount} / {flow.duration} seconds
              </p>
            </div>
          </div>
          {/* 
          <div>
            {flow.units[currentUnitIndex]
              ? flow.units[currentUnitIndex].name
              : null}
          </div>
          <div>
            {flow.units[currentUnitIndex + 1]
              ? flow.units[currentUnitIndex + 1].name
              : null}
          </div> */}
          {/* <Wheel
            units={flow.units}
            updateWheel={updateWheel}
            setUpdateWheel={setUpdateWheel}
          ></Wheel> */}
        </div>
      </div>
    </div>
  );
}

export default Preview;
