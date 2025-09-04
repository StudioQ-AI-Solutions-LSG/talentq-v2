// store/useCandidateStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CandidateListParams } from "@/app/[locale]/(protected)/candidates/types/candidates.types";

interface CandidateStore extends CandidateListParams {
  setParams: (newParams: Partial<CandidateListParams>) => void;
  resetParams: () => void;
}

// const DEFAULT_STATUS = "in_progress";
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 6;

export const useCandidatesStore = create<CandidateStore>()(
  persist(
    (set) => ({
      selected_division: "",
      selected_customer: "",
      selected_customer_name: "",
      requisition_position_id: "",
      status: [],
      search_criteria: "",
      page: DEFAULT_PAGE_NUMBER,
      page_size: DEFAULT_PAGE_SIZE,

      setParams: (newParams) =>
        set((state) => ({
          ...state,
          ...newParams,
        })),

      resetParams: () =>
        set({
          selected_division: "",
          selected_customer: "",
          requisition_position_id: "",
          status: [],
          search_criteria: "",
          page: DEFAULT_PAGE_NUMBER,
          page_size: DEFAULT_PAGE_SIZE,
        }),
    }),
    {
      name: "candidate-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selected_customer: state.selected_customer, // only persist this field
        selected_customer_name: state.selected_customer_name, // only persist this field
      }),
    }
  )
);
