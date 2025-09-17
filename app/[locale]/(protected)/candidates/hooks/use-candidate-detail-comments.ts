import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import candidateDetailCommentsService from "../services/candidate-detail-comments-service";

export const useCandidateDetailComments = (id: string) => {
  const { selectedDivision, selectedCustomer } = useAuthStore.getState();

  const queryParams = {
    selected_division: selectedDivision || "",
    selected_customer: selectedCustomer || "",
    id,
  };

  const {
    data: comments,
    isLoading: isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["candidate-detail-comments", queryParams],
    queryFn: async () => {
      return candidateDetailCommentsService.getCandidateDetailComments(id);
    },
    staleTime: 1000 * 60 * 5,
  });

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "error";
  };

  const saveComment = async (comment: string) => {
    const resp = await candidateDetailCommentsService.saveComment(id, comment);
  };

  return {
    comments,
    isLoading: isFetching,
    error: queryError ? getErrorMessage(queryError) : null,
    refetch,
    saveComment,
  };
};
