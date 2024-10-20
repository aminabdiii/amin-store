import { useFrequentlyAskedQuestions } from "./useFrequentlyAskedQuestions";
import { Skeleton } from "@mui/material";

import HeadingSection from "./HeadingSection";
import QuestionAccordion from "../../ui/QuestionAccordion";

function FrequentlyAskedQuestions() {
  const { questions, isLoading } = useFrequentlyAskedQuestions();

  return (
    <div className="flex flex-col gap-6">
      <HeadingSection title="frequently asked questions" />
      {isLoading && (
        <div className="flex flex-col gap-6">
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-12 xs:!h-[52px] sm:!h-[68px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-12 xs:!h-[52px] sm:!h-[68px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-12 xs:!h-[52px] sm:!h-[68px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-12 xs:!h-[52px] sm:!h-[68px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-12 xs:!h-[52px] sm:!h-[68px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-12 xs:!h-[52px] sm:!h-[68px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-12 xs:!h-[52px] sm:!h-[68px]"
          />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col gap-6 !font-montserrat">
          {questions.length > 0 &&
            questions.map((question) => {
              return (
                <QuestionAccordion key={question.id} question={question} />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default FrequentlyAskedQuestions;
