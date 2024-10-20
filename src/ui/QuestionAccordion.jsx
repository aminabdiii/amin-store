import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import { HiChevronDown } from "react-icons/hi2";

function QuestionAccordion({ question }) {
  const { title, description } = question;

  return (
    <Accordion className="!my-0 !divide-y !border-b-0 !shadow !shadow-violet-400">
      <AccordionSummary
        className="!bg-violet-50/50"
        expandIcon={<HiChevronDown />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography className="!font-montserrat !text-[13px] !font-semibold 360:!text-sm vxs:!text-base 450:!text-lg sm:!px-3 sm:!py-2">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="!h-auto">
        <Typography className="!font-montserrat !text-[10px] !font-medium 360:!text-xs vxs:!text-sm 450:!text-base sm:!p-2">
          {description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default QuestionAccordion;
