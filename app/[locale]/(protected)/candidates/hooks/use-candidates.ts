import { useQuery } from "@tanstack/react-query";
import { useCandidatesStore } from "@/store/candidate.store";
import candidateService from "../services/candidates-service";
import { useAuthStore } from "@/store/auth.store";

export const useCandidates = () => {
  const {
    selected_division,
    selected_customer,
    requisition_position_id,
    status,
    search_criteria,
    page,
    page_size,
  } = useCandidatesStore();

  const { selectedDivision } = useAuthStore.getState();

  const queryParams = {
    selected_division: selectedDivision || "",
    selected_customer,
    requisition_position_id,
    status,
    search_criteria,
    page,
    page_size,
  };

  const {
    data: candidates,
    isLoading: isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["candidates", queryParams],
    queryFn: async () => {
      return candidateService.getCandidates(queryParams);
    },
    staleTime: 1000 * 60 * 5,
  });

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "error";
  };

  const pageRemainder = (candidates?.itemsTotal || 0) % page_size;
  const totalPages = Math.trunc(candidates?.itemsTotal / page_size) || 1;
  return {
    candidates: candidates?.items ?? [],
    pagination: {
      currentPage: candidates?.currentPage,
      totalPages:
        pageRemainder > 0 && candidates?.itemsTotal > page_size
          ? totalPages + 1
          : totalPages,
      totalItems: candidates?.itemsTotal,
    },
    isLoading: isFetching,
    error: queryError ? getErrorMessage(queryError) : null,
    refetch,
  };
};
