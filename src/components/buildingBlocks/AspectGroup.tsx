// Components
import AspectController from "./Aspect/AspectController";

// Types & Interfaces
import { AspectControllerType } from "./Aspect/AspectController";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Dispatch, SetStateAction } from "react";
import _ from "lodash";

export interface AspectGroupType {
  category_name: string;
  poses: AspectControllerType[];
}

interface AspectGroupProps {
  category_name: string;
  poses: AspectControllerType[];
  uniqueAspects: {
    id: number;
    count: number;
  }[];
  aspectGroupCount: number | undefined;
  aspectGroups: AspectGroupType[];
  setEnableSave: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
}

function AspectGroup({
  category_name,
  poses,
  uniqueAspects,
  aspectGroupCount,
  aspectGroups,
  setEnableSave,
  searchValue,
}: AspectGroupProps) {
  return (
    <>
      <Accordion
        sx={{
          borderRadius: "0.375rem !important",
          border: "1px solid #323232",
          backgroundColor: "#232323",
          color: "#a0a0a0",
          marginBottom: "3px",
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
              color: "white",
            },
            "&.Mui-expanded": {
              backgroundColor: "",
            },
          }}
        >
          <Typography>
            {category_name}{" "}
            <span className="text-[#6ccc93]">{aspectGroupCount}</span>
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

                if (
                  _.startsWith(
                    pose.english_name.toLowerCase(),
                    searchValue.toLowerCase()
                  )
                ) {
                  return (
                    <AspectController
                      key={pose.english_name + pose.category_name}
                      aspect={pose}
                      count={count}
                      aspectGroups={aspectGroups}
                      setEnableSave={setEnableSave}
                    ></AspectController>
                  );
                }
              })}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AspectGroup;
