import { useReducer } from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import mp3Provider from "../../assets/mp3Provider";
import "./Preview.css";
import CircularProgressBar from "../buildingBlocks/CircularProgressBar/CircularProgressBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LinearProgress, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTimer } from "react-use-precision-timer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Slider as VolumeSlider } from "@mui/material";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { useUser } from "../utilities/UserContext";
import { useFlow } from "../utilities/FlowContext";
import { useNavigate } from "react-router-dom";
import Button from "../buildingBlocks/Button";

function Preview() {
  const navigate = useNavigate();

  const { flow } = useFlow();
  const { authState } = useUser();

  // Redirect from preview to builder when flow has no units
  useEffect(() => {
    if (flow.units.length === 0) {
      navigate("/builder");
    }
  }, [navigate, flow]);

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

  // FlowReducer action type
  interface TimerStateActionType {
    type: string;
  }

  // FlowReducer type
  interface TimerStateType {
    startFlow: boolean;
    pauseFlow: boolean;
    resumeFlow: boolean;
  }

  // FlowReducer initial value
  const initialTimerState: TimerStateType = {
    startFlow: false,
    pauseFlow: false,
    resumeFlow: false,
  };

  // FlowReducer types
  const START_FLOW = "START_FLOW";
  const PAUSE_FLOW = "PAUSE_FLOW";
  const RESUME_FLOW = "RESUME_FLOW";
  const STOP_FLOW = "STOP_FLOW";

  function flowReducer(
    state: TimerStateType,
    action: TimerStateActionType
  ): TimerStateType {
    switch (action.type) {
      case START_FLOW:
        return { startFlow: true, pauseFlow: false, resumeFlow: false };
      case PAUSE_FLOW:
        return { startFlow: true, pauseFlow: true, resumeFlow: false };
      case RESUME_FLOW:
        return { startFlow: true, pauseFlow: false, resumeFlow: true };
      case STOP_FLOW:
        return { startFlow: false, pauseFlow: false, resumeFlow: false };
      default:
        return state;
    }
  }

  const [timerState, dispatch] = useReducer(flowReducer, initialTimerState);

  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);

  const [flowCount, setFlowCount] = useState<number>(0);
  const [flowPercent, setFlowPercent] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [unitPercent, setUnitPercent] = useState<number>(0);

  const [flowIncrement, setFlowIncrement] = useState<number>(0);
  const [unitIncrement, setUnitIncrement] = useState<number>(0);

  const [timerCount, setTimerCount] = useState(0);

  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const volumeRef = useRef(0.5);
  const [volumeValue, setVolumeValue] = useState<number>(50);

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolumeValue(newValue as number);
    volumeRef.current = (newValue as number) / 100;
  };

  // Slider settings
  const settings = {
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

  // Flow timer
  const callback = useCallback(() => {
    setTimerCount((prevValue) => prevValue + 1);
    setUnitCount((prevValue) => +(prevValue + 0.01));
    setFlowCount((prevValue) => +(prevValue + 0.01));
    setUnitPercent((prevValue) => {
      const updatedValue = prevValue + unitIncrement;
      return updatedValue;
    });
    setFlowPercent((prevValue) => {
      const updatedValue = prevValue + flowIncrement;
      return updatedValue;
    });
  }, [unitIncrement, flowIncrement]);

  const timer = useTimer({ delay: 10, fireOnStart: true }, callback);

  // Update Flow Increment to calculate percentages for progress bar
  useEffect(() => {
    if (timerState.startFlow) {
      const newIncrement = 100 / (flow.duration * 100);
      setFlowIncrement(newIncrement);
    }
  }, [flow.duration, timerState.startFlow]);

  // Update Unit Increment to calculate percentages for progress bar
  useEffect(() => {
    if (timerState.startFlow) {
      if (flow.units[currentUnitIndex]) {
        const newIncrement =
          100 / (flow.units[currentUnitIndex].duration * 100);
        setUnitIncrement(newIncrement);
      }
    }
  }, [flow.units, currentUnitIndex, timerState.startFlow]);

  // Flow end
  useEffect(() => {
    if (timerCount === flow.duration * 100) {
      timer.stop();
      dispatch({
        type: STOP_FLOW,
      });

      setCurrentUnitIndex(0);

      setFlowCount(0);
      setFlowPercent(0);
      setUnitCount(0);
      setUnitPercent(0);

      setFlowIncrement(0);
      setUnitIncrement(0);

      setTimerCount(0);
      next();
    }
  }, [timer, timerCount, flow.duration]);

  // Unit end
  useEffect(() => {
    if (unitPercent >= 100) {
      setUnitCount(0);
      setUnitPercent(0);
      next();
      setCurrentUnitIndex((prevValue) => prevValue + 1);
    }
  }, [timerCount, unitPercent]);

  // Audio play
  useEffect(() => {
    if (timerState.startFlow) {
      const audio = new Audio(
        mp3Provider(flow.units[currentUnitIndex].url_svg_alt_local)
      );
      audio.volume = volumeRef.current;
      audio.play();
    }
  }, [currentUnitIndex, flow.units, timerState.startFlow]);

  // Start/Pause/Resume controls
  useEffect(() => {
    if (
      timerState.startFlow &&
      !timerState.pauseFlow &&
      !timerState.resumeFlow
    ) {
      timer.start();
    }
    if (
      timerState.startFlow &&
      timerState.pauseFlow &&
      !timerState.resumeFlow
    ) {
      timer.pause();
    }

    if (
      timerState.startFlow &&
      !timerState.pauseFlow &&
      timerState.resumeFlow
    ) {
      timer.resume();
    }

    if (
      !timerState.startFlow &&
      !timerState.pauseFlow &&
      !timerState.resumeFlow
    ) {
      timer.resume();
    }
  }, [timer, timerState]);

  function handleStartButtonClick() {
    dispatch({
      type: START_FLOW,
    });
    setCurrentUnitIndex(0);
    setFlowPercent(0);
  }

  function handleCancelButtonClick() {
    navigate("/builder");
  }

  function handlePauseButtonClick() {
    if (timerState.pauseFlow === false) {
      dispatch({
        type: PAUSE_FLOW,
      });
    } else if (timerState.pauseFlow === true) {
      dispatch({
        type: RESUME_FLOW,
      });
    }
  }

  function handleStopButtonClick() {
    dispatch({
      type: STOP_FLOW,
    });

    setCurrentUnitIndex(0);

    setFlowCount(0);
    setFlowPercent(0);
    setUnitCount(0);
    setUnitPercent(0);

    setFlowIncrement(0);
    setUnitIncrement(0);

    setTimerCount(0);

    timer.stop();
  }

  return flow.units.length > 0 ? (
    <>
      <div
        className={`preview ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px] ${authState.showLoginPopup ? "blur-sm" : ""}`}
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
              <Button
                componentType="previewStart"
                onClick={
                  !timerState.startFlow ? handleStartButtonClick : undefined
                }
                label="Start"
                enabled={!timerState.startFlow}
              ></Button>
              <Button
                componentType="previewResumePause"
                onClick={
                  timerState.startFlow ? handlePauseButtonClick : undefined
                }
                label={timerState.pauseFlow ? "Resume" : "Pause"}
                enabled={timerState.startFlow}
              ></Button>
              <Button
                componentType="previewStop"
                onClick={
                  timerState.startFlow ? handleStopButtonClick : undefined
                }
                label="Stop"
                enabled={timerState.startFlow}
              ></Button>
              <Button
                componentType="previewCancel"
                onClick={
                  !timerState.startFlow ? handleCancelButtonClick : undefined
                }
                label="Cancel"
                enabled={!timerState.startFlow}
              ></Button>
            </div>
          </div>
          <div className="canvas flex h-full w-full flex-col items-center justify-center pt-2">
            <div className="flex h-full w-full flex-row items-center justify-center">
              <div className="image-track m-auto mr-[4px] h-full w-1/2 bg-[#ffffff18] p-5 transition-colors hover:bg-[#ffffff38]">
                <div className=" ml-auto mr-auto flex h-full max-w-[400px] flex-col">
                  <Slider {...settings} ref={sliderRef}>
                    {flow.units.map((unit) => {
                      return (
                        <div
                          key={unit.id}
                          className=" image h-full w-[200px] bg-[transparent] text-black"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <CircularProgressBar
                              percentValue={unitPercent}
                              value={
                                <img
                                  className="w-2/3"
                                  src={unit.image}
                                  alt=""
                                />
                              }
                            ></CircularProgressBar>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                  <div className="flex flex-col items-center justify-center  gap-1 p-1">
                    {" "}
                    <Box sx={{ width: 300 }}>
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 1 }}
                        alignItems="center"
                      >
                        <VolumeDownRounded sx={{ color: "white" }} />
                        <VolumeSlider
                          aria-label="Volume"
                          value={volumeValue}
                          onChange={handleVolumeChange}
                          // marks={true}
                          // step={5}
                          valueLabelDisplay="auto"
                          sx={{
                            // backgroundColor: "red",
                            color: "white",
                          }}
                        />
                        <VolumeUpRounded sx={{ color: "white" }} />
                      </Stack>
                    </Box>
                  </div>
                </div>
              </div>
              <div className=" ml-[4px] flex h-full w-1/2 flex-col bg-[#ffffff18] p-2 transition-colors hover:bg-[#ffffff38]">
                <div className="mt-2 flex flex-col items-start justify-center">
                  <div className="flex w-full items-start justify-start">
                    {!timerState.startFlow ? (
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
                      {timerState.startFlow
                        ? flow.units[currentUnitIndex].name
                        : flow.units[0].name}
                    </p>
                  </div>
                  <div className="grid w-full grid-cols-[1fr_1fr]">
                    <p className="ltr text-start text-[20px] ">Duration:</p>
                    <p className="text-start text-[20px]">
                      {unitCount.toFixed(1)} /{" "}
                      {flow.units[currentUnitIndex]
                        ? flow.units[currentUnitIndex].duration
                        : flow.units[0].duration}{" "}
                      seconds
                    </p>
                  </div>
                  <div className="grid w-full grid-cols-[1fr_1fr]">
                    <p className="text-start text-[20px]">Percent: </p>
                    <p className="text-start text-[20px]">
                      {unitPercent.toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[8px] flex h-full w-full items-center justify-center bg-[#ffffff18] transition-colors hover:bg-[#ffffff38]">
              <div className="w-1/2">
                <ThemeProvider theme={linearProgressBarTheme}>
                  <LinearProgress
                    key={flowPercent}
                    color="inherit"
                    variant="determinate"
                    value={flowPercent}
                  />
                </ThemeProvider>
                <p>{flowPercent.toFixed(0)}%</p>
                <p className="ltr flex h-full items-center justify-center p-2">
                  Total flow: {flowCount.toFixed(1)} / {flow.duration} seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default Preview;
