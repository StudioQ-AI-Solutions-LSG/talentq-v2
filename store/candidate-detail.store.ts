import { CandidateDetailParams } from "@/app/[locale]/(protected)/candidates/types/candidate-detail-types";
import { CandidateListParams } from "@/app/[locale]/(protected)/candidates/types/candidates.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CandidateDetailStore extends CandidateDetailParams {
  setParams: (newParams: Partial<CandidateListParams>) => void;
  resetParams: () => void;
}

export const useCandidateDetailStore = create<CandidateDetailStore>()(
  persist(
    (set) => ({
      selected_division: "",
      selected_customer: "",
      id: "",

      setParams: (newParams) =>
        set((state) => ({
          ...state,
          ...newParams,
        })),

      resetParams: () =>
        set({
          selected_division: "",
          selected_customer: "",
          id: "",
        }),
    }),
    {
      name: "candidate-detail-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selected_customer: state.selected_customer, // only persist this field
      }),
    }
  )
);
