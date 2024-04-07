// Components
import AspectController from "./Aspect/AspectController";

// Types & Interfaces
import { AspectType } from "./Aspect/AspectController";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  aspectGroupCount: number | undefined;
  aspectGroups: AspectGroupType[];
}

function AspectGroup({
  category_name,
  poses,
  uniqueAspects,
  aspectGroupCount,
  aspectGroups,
}: AspectGroupProps) {
  return (
    <>
      <Accordion
        sx={{
          borderRadius: "0px !important",
          border: "none",
          // width: "100% !important",
          backgroundColor: "#ffffff18",
          color: "white",
          marginBottom: "3px",
          "&:hover": {
            backgroundColor: "#ffffff38",
          },
          transitionProperty:
            "color, background-color, border-color, text-decoration-color, fill, stroke",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "150ms",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "",
            "&:hover": {
              // backgroundColor: "#ffffff38",
            },
            "&.Mui-expanded": {
              backgroundColor: "#ffffff38",
            },
          }}
        >
          <Typography>
            {category_name}{" "}
            <span className="text-[red]">{aspectGroupCount}</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className=" flex flex-col justify-center text-black">
            <div className="auto-rows grid grid-cols-aspects justify-center gap-5">
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
                    aspectGroups={aspectGroups}
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
