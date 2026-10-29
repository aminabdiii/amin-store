import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../services/frequentlyAskedQuestionsApi";

export function useFrequentlyAskedQuestions() {
  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["Frequently-Asked-Questions"],
    queryFn: getQuestions,
  });

  return { questions, isLoading, error, refetch };
}
