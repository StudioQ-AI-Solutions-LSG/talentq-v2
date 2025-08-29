import { httpV2 } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/lib/tools/errors.tools";
import { useCandidatesStore } from "@/store/candidate.store";
import { RequisitionFilter } from "../types/requisitions-filter.types";
import { useAuthStore } from "@/store/auth.store";

export const useRequisitionsFilter = () => {
  const { selectedDivision, selectedCustomer } = useAuthStore.getState();
  const params = {
    selected_division: selectedDivision || "",
    selected_customer: selectedCustomer || "",
  };

  const {
    data: requisitions,
    isLoading: isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["requisitions", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });

      const queryString = queryParams.toString();
      const url = `/admin-portal/filters/requisitions${
        queryString ? `?${queryString}` : ""
      }`;
      return await httpV2.get<RequisitionFilter[]>(url);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    requisitions: requisitions ?? [],
    isLoading: isFetching,
    error: queryError ? getErrorMessage(queryError) : null,
    refetch,
  };
};
