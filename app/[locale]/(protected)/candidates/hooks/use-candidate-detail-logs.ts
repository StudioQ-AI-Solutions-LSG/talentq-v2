import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import candidateDetailLogsService from "../services/candidate-detail-logs-service";

export const useCandidateDetailLogs = (id: string) => {
  const { selectedDivision, selectedCustomer } = useAuthStore.getState();

  const queryParams = {
    selected_division: selectedDivision || "",
    selected_customer: selectedCustomer || "",
    id,
  };

  const {
    data: logs,
    isLoading: isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["candidate-detail-logs", queryParams],
    queryFn: async () => {
      return candidateDetailLogsService.getCandidateDetailLogs(id);
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
    logs,
    isLoading: isFetching,
    error: queryError ? getErrorMessage(queryError) : null,
    refetch,
  };
};
