// Components
import AspectController from "./Aspect/AspectController";

// Types & Interfaces
import { AspectType } from "./Aspect/AspectController";

import { Dispatch, SetStateAction } from "react";
import { UnitType } from "./Unit";

import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { useState } from "react";

export interface AspectGroupType {
  category_name: string;
  poses: AspectType[];
}

interface AspectGroupProps {
  category_name: string;
  poses: AspectType[];
  uniqueAspects: {
    id: number;
    count: number;
  }[];
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitType[];
      duration: number;
      uniqueAspects: {
        id: number;
        count: number;
      }[];
    }>
  >;
}

function AspectGroup({
  category_name,
  poses,
  uniqueAspects,
  setFlow,
}: AspectGroupProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots["transition"] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": {
            display: expanded ? "block" : "none",
          },
          borderRadius: "0px !important",
          border: "none",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{category_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className=" flex flex-col justify-center text-black">
            {/* <div className="grid grid-cols-aspects justify-center gap-5"> */}
            <div className="auto-rows grid grid-cols-aspects grid-rows-aspects justify-center gap-5">
              {poses.map((pose) => {
                let count = 0;
                uniqueAspects.some((uniqueAspect) => {
                  if (uniqueAspect.id === pose.id) {
                    count = uniqueAspect.count;
                  }
                });
                return (
                  <AspectController
                    key={pose.english_name + pose.category_name}
                    aspect={pose}
                    count={count}
                    setFlow={setFlow}
                  ></AspectController>
                );
              })}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AspectGroup;
