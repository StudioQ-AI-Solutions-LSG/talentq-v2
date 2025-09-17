import { useAuthStore } from "@/store/auth.store";
import { useCandidateDetailStore } from "@/store/candidate-detail.store";
import { useQuery } from "@tanstack/react-query";
import candidateDetailService from "../services/candidate-detail-service";

export const useCandidateDetail = (id: string) => {
  // const { selected_division, selected_customer } =
  //   useCandidateDetailStore();

  const { selectedDivision, selectedCustomer } = useAuthStore.getState();

  const queryParams = {
    selected_division: selectedDivision || "",
    selected_customer: selectedCustomer || "",
    id,
  };

  const {
    data: candidateDetail,
    isLoading: isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["candidate-detail", queryParams],
    queryFn: async () => {
      return candidateDetailService.getCandidateDetail(queryParams);
    },
    staleTime: 1000 * 60 * 5,
  });

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "error";
  };

  return {
    candidateDetail,
    isLoading: isFetching,
    error: queryError ? getErrorMessage(queryError) : null,
    refetch,
  };
};
