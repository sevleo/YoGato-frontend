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
import { useFlow } from "../utilities/FlowContext";
import Button from "../buildingBlocks/Button";
import flowEndSound from "../../assets/countdown.wav";
import { useMemo } from "react";

interface PreviewProps {
  handleDesigningClick: () => void;
  handleFlowsClick: () => void;
}

function Preview({ handleDesigningClick, handleFlowsClick }: PreviewProps) {
  const { flow } = useFlow();

  const newFlow = useMemo(() => {
    const clonedFlow = structuredClone(flow);

    const secondOne = {
      id: "1",
      announcement: "",
      duration: 1,
      image: "1",
      name: "Three...",
      url_svg_alt_local: "secondCountdown",
      sanskritName: "",
      aspectId: 0,
    };
    const secondTwo = {
      id: "2",
      announcement: "",
      duration: 1,
      image: "2",
      name: "Two...",
      url_svg_alt_local: "secondCountdown",
      sanskritName: "",
      aspectId: 0,
    };
    const secondThree = {
      id: "3",
      announcement: "",
      duration: 1,
      image: "3",
      name: "One...",
      url_svg_alt_local: "secondCountdown",
      sanskritName: "",
      aspectId: 0,
    };
    clonedFlow.units.unshift(secondThree);
    clonedFlow.units.unshift(secondTwo);
    clonedFlow.units.unshift(secondOne);
    clonedFlow.duration = clonedFlow.duration + 3;
    return clonedFlow;
  }, [flow]);

  // Web Audio API
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Create an AudioContext when the component mounts
    const context = new AudioContext();
    setAudioContext(context);
    return () => {
      // Clean up the AudioContext when the component unmounts
      context.close();
    };
  }, []);

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

  // Real index
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);

  // Index excluding 3 seconds added to beginning of flow
  const [currentUnitIndexTrimmed, setCurrentUnitIndexTrimmed] =
    useState<number>(0);

  const [flowCount, setFlowCount] = useState<number>(0);
  const [flowPercent, setFlowPercent] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [unitPercent, setUnitPercent] = useState<number>(0);

  const [flowIncrement, setFlowIncrement] = useState<number>(0);
  const [unitIncrement, setUnitIncrement] = useState<number>(0);

  const [timerCount, setTimerCount] = useState(0);

  const duration = newFlow.duration - 3;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const volumeRef = useRef(0.5);
  const [volumeValue, setVolumeValue] = useState<number>(50);

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
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
    if (currentUnitIndex > 2) {
      setFlowPercent((prevValue) => {
        const updatedValue = prevValue + flowIncrement;
        return updatedValue;
      });
      setFlowCount((prevValue) => +(prevValue + 0.01));
    }
    setUnitCount((prevValue) => +(prevValue + 0.01));
    setUnitPercent((prevValue) => {
      const updatedValue = prevValue + unitIncrement;
      return updatedValue;
    });
  }, [unitIncrement, flowIncrement, currentUnitIndex]);

  const timer = useTimer({ delay: 10, fireOnStart: true }, callback);

  // Update Flow Increment to calculate percentages for progress bar
  useEffect(() => {
    if (timerState.startFlow) {
      const newIncrement = 100 / ((newFlow.duration - 3) * 100);
      setFlowIncrement(newIncrement);
    }
  }, [newFlow.duration, timerState.startFlow]);

  // Update Unit Increment to calculate percentages for progress bar
  useEffect(() => {
    if (timerState.startFlow) {
      if (newFlow.units[currentUnitIndex]) {
        const newIncrement =
          100 / (newFlow.units[currentUnitIndex].duration * 100);
        setUnitIncrement(newIncrement);
      }
    }
  }, [newFlow.units, currentUnitIndex, timerState.startFlow]);

  // Flow end
  useEffect(() => {
    if (timerCount === newFlow.duration * 100) {
      timer.stop();
      dispatch({
        type: STOP_FLOW,
      });

      setCurrentUnitIndex(0);
      setCurrentUnitIndexTrimmed(0);

      setFlowCount(0);
      setFlowPercent(0);
      setUnitCount(0);
      setUnitPercent(0);

      setFlowIncrement(0);
      setUnitIncrement(0);

      setTimerCount(0);

      if (audioContext) {
        const audioSrc = flowEndSound;
        fetch(audioSrc)
          .then((response) => response.arrayBuffer())
          .then((buffer) => {
            audioContext.decodeAudioData(buffer, (decodedData) => {
              const source = audioContext.createBufferSource();
              source.buffer = decodedData;
              const gainNode = audioContext.createGain();
              gainNode.gain.value = volumeRef.current;
              source.connect(gainNode);
              gainNode.connect(audioContext.destination);
              source.start(0);
            });
          })
          .catch((error) => {
            console.error("Error fetching or decoding audio data:", error);
          });
      }

      next();
    }
  }, [timer, timerCount, newFlow.duration, audioContext]);

  // Unit end
  useEffect(() => {
    if (unitPercent >= 100) {
      setUnitCount(0);
      setUnitPercent(0);
      next();
      setCurrentUnitIndex((prevValue) => {
        return prevValue + 1;
      });
    }
  }, [timerCount, unitPercent]);

  // Update trimmed unit index
  useEffect(() => {
    if (currentUnitIndex >= 3) {
      setCurrentUnitIndexTrimmed((prevValue) => prevValue + 1);
    }
  }, [currentUnitIndex]);

  // Audio play (added Web Audio API to support mobile browser)
  useEffect(() => {
    if (timerState.startFlow && audioContext) {
      const audioSrc = mp3Provider(
        newFlow.units[currentUnitIndex].url_svg_alt_local
      );
      fetch(audioSrc)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          audioContext.decodeAudioData(buffer, (decodedData) => {
            const source = audioContext.createBufferSource();
            source.buffer = decodedData;
            const gainNode = audioContext.createGain();
            gainNode.gain.value = volumeRef.current;
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            source.start(0);
          });
        })
        .catch((error) => {
          console.error("Error fetching or decoding audio data:", error);
        });
    }
  }, [currentUnitIndex, timerState.startFlow, audioContext, newFlow]);

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
    setCurrentUnitIndexTrimmed(0);
    setFlowPercent(0);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }

  function handleCancelButtonClick() {
    handleDesigningClick();
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
    timer.stop();
    dispatch({
      type: STOP_FLOW,
    });

    setCurrentUnitIndex(0);
    setCurrentUnitIndexTrimmed(0);

    setFlowCount(0);
    setFlowPercent(0);
    setUnitCount(0);
    setUnitPercent(0);

    setFlowIncrement(0);
    setUnitIncrement(0);

    setTimerCount(0);

    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    }, 500);
  }

  return newFlow.units.length > 0 ? (
    <>
      <div className="rounded-md border-[1px] border-[#323232] bg-[#232323]">
        <div className="flex w-full flex-col items-start justify-center  gap-1 p-5  ">
          <div className="flex w-full flex-col items-start justify-center">
            <>
              <p className="text-[30px] text-[#a0a0a0]">
                {newFlow.flowName ? newFlow.flowName : "No name"}
              </p>
            </>
          </div>
          <div className="flex h-full w-full flex-row items-center justify-start gap-2">
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
              onClick={timerState.startFlow ? handleStopButtonClick : undefined}
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
      </div>
      <div className="hidden h-full rounded-md border-[1px] border-[#323232] bg-[#232323] min-[1180px]:block">
        <div className=" flex h-full w-full flex-col items-start justify-center gap-1 p-5">
          <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
            <p className="text-start text-[#a0a0a0]">Duration</p>
            <p className="text-start text-[#a0a0a0]">
              {hours > 0 ? <span>{hours} hours, </span> : null}
              {minutes > 0 ? <span>{minutes} minutes, </span> : null}
              {seconds > 0 ? <span>{seconds} seconds.</span> : null}
            </p>
          </div>
          <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
            <p className="text-start text-[#a0a0a0]">Poses</p>
            <p className="text-start text-[#a0a0a0]">{newFlow.units.length}</p>
          </div>
          <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
            <p className="text-start text-[#a0a0a0]">Unique poses</p>
            <p className="text-start text-[#a0a0a0]">
              {newFlow.uniqueAspects.length}
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-6">
        <div className="flex w-full items-center justify-center rounded-md border-[1px] border-[#323232] bg-[#232323] p-6">
          <div className="flex w-full flex-col items-center sm:flex-row">
            <div className="flex w-full flex-col gap-1">
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="text-start text-[#a0a0a0]">Duration</p>
                <p className="text-start text-[#a0a0a0]">
                  {flowCount.toFixed(1)} / {newFlow.duration - 3} seconds
                </p>
              </div>
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="text-start text-[#a0a0a0]">Percent</p>
                <p className="text-start text-[#a0a0a0]">
                  {flowPercent.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className=" w-full pt-2 sm:p-0">
              <ThemeProvider theme={linearProgressBarTheme}>
                <LinearProgress
                  key={flowPercent}
                  color="inherit"
                  variant="determinate"
                  value={flowPercent}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
        <div className=" mb-6 w-full flex-col items-center justify-center rounded-md border-[1px] border-[#323232] bg-[#232323] p-6 sm:flex min-[820px]:flex-row">
          <div className=" flex h-full w-full flex-col items-start justify-center sm:w-1/2">
            <div className="flex h-full w-full flex-col items-start justify-center gap-1 pb-6 min-[820px]:pb-0 min-[820px]:pr-6">
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="text-start text-[#a0a0a0]">Current</p>
                {!timerState.startFlow ? (
                  <p className="text-start text-[#a0a0a0]">
                    1 / {newFlow.units.length - 3}
                  </p>
                ) : currentUnitIndexTrimmed === 0 ? (
                  <>
                    <p className="text-start text-[#a0a0a0]">
                      1 / {newFlow.units.length - 3}
                    </p>
                  </>
                ) : (
                  <p className="text-start text-[#a0a0a0]">
                    {currentUnitIndexTrimmed} / {newFlow.units.length - 3}
                  </p>
                )}
              </div>
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="text-start text-[#a0a0a0]">Name</p>

                <p className="text-start text-[#a0a0a0]">
                  {timerState.startFlow
                    ? newFlow.units[currentUnitIndex].name
                    : newFlow.units[0].name}
                </p>
              </div>
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="text-start text-[#a0a0a0] ">Duration</p>
                <p className="text-start text-[#a0a0a0]">
                  {unitCount.toFixed(1)} /{" "}
                  {newFlow.units[currentUnitIndex]
                    ? newFlow.units[currentUnitIndex].duration
                    : newFlow.units[0].duration}{" "}
                  seconds
                </p>
              </div>
              <div className="grid w-full grid-cols-[1fr_2fr] gap-2">
                <p className="text-start text-[#a0a0a0]">Percent</p>
                <p className="text-start text-[#a0a0a0]">
                  {unitPercent.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#323232] min-[820px]:h-full min-[820px]:w-[1px]"></div>
          <div className="image-track m-auto h-full w-[280px]">
            <div className=" ml-auto mr-auto flex h-full max-w-[400px] flex-col">
              <Slider {...settings} ref={sliderRef}>
                {newFlow.units.map((unit) => {
                  return (
                    <div
                      key={unit.id}
                      className=" image h-full w-[200px] bg-[transparent] text-black"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <CircularProgressBar
                          percentValue={unitPercent}
                          value={
                            unit.image === "1" ? (
                              <>
                                <p className="text-[30px] font-bold text-[#6ccc93]">
                                  1
                                </p>
                              </>
                            ) : unit.image === "2" ? (
                              <>
                                <p className="text-[30px] font-bold text-[#6ccc93]">
                                  2
                                </p>
                              </>
                            ) : unit.image === "3" ? (
                              <>
                                <p className="text-[30px] font-bold text-[#6ccc93]">
                                  3
                                </p>
                              </>
                            ) : (
                              <>
                                <img
                                  className="w-2/3"
                                  src={unit.image}
                                  alt=""
                                />
                              </>
                            )
                          }
                        ></CircularProgressBar>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#323232] min-[820px]:hidden min-[820px]:h-full min-[820px]:w-[1px]"></div>

          <div className=" flex w-full items-center justify-center pl-6 pr-6 pt-6 min-[820px]:hidden">
            <Box sx={{ width: 200 }}>
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
      <div className="hidden h-[102px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-[#323232] bg-[#232323] p-5 min-[1180px]:flex">
        <p className="text-start text-[#a0a0a0]">Volume</p>

        <Box sx={{ width: 300 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
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
    </>
  ) : (
    <div className="text-2xl text-[#a0a0a0]">
      <p className="text-start">No active flow.</p>
      <br />
      <p className="text-start ">
        To start moving,{" "}
        <span
          className="text-[#6ccc93] hover:cursor-pointer hover:underline"
          onClick={handleFlowsClick}
        >
          select
        </span>{" "}
        an existing flow or{" "}
        <span
          className="text-[#6ccc93] hover:cursor-pointer hover:underline"
          onClick={handleDesigningClick}
        >
          create
        </span>{" "}
        a new one!
      </p>
      {/* <br />
      <p className="text-start">
        You may also select a sequence shared by others!
      </p> */}
    </div>
  );
}

export default Preview;
