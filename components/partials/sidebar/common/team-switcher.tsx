"use client";

import { useAuthStore } from "@/store/auth.store";

import { useConfig } from "@/hooks/use-config";
import { useCandidatesStore } from "@/store/candidate.store";
import { DivisionCustomer } from "./division-customer-container";

export default function TeamSwitcher() {
  const [config] = useConfig();

  const { setSelectedCustomer } = useAuthStore();

  const { setParams: setCandidatesStore } = useCandidatesStore();

  const onDivisionCustomerChange = (selectedCustomer: any) => {
    if (selectedCustomer) {
      setSelectedCustomer(selectedCustomer);
      setCandidatesStore({
        selected_customer: selectedCustomer,
      });
    }
  };

  if (config.showSwitcher === false || config.sidebar === "compact") {
    return null;
  }

  return (
    <div>
      <DivisionCustomer onDivisionCustomerChange={onDivisionCustomerChange} />
    </div>
  );
}
