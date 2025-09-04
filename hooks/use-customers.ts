import { httpV2 } from "@/lib/api/axios";
import { Account } from "@/types/accounts.types";
import { useQuery } from "@tanstack/react-query";

type CustomerListParams = {
  selected_division?: string | null;
  page?: string;
  limit?: string;
};

export const useCustomers = (params: CustomerListParams) => {
  const {
    data: customers,
    isLoading: isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["customers", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });

      const queryString = queryParams.toString();
      const url = `/users/customers${queryString ? `?${queryString}` : ""}`;
      return await httpV2.get<Account[]>(url);
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
    customers: customers ?? [],
    isLoading: isFetching,
    error: queryError ? getErrorMessage(queryError) : null,
    refetch,
  };
};
