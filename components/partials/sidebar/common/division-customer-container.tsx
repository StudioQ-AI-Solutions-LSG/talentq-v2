import React, { useEffect } from "react";

import { useCustomers } from "@/hooks/use-customers";
import { useAuthStore } from "@/store/auth.store";
import CustomerSwitcher from "./customer-switcher";
import DivisionsSwitcher from "./division-switcher";

const DEFAULT_PAGE = "1";
const DEFAULT_LIMIT = "1000";

interface DivisionCustomerProps {
  onDivisionCustomerChange: (customerId?: string) => void;
}

export const DivisionCustomer = ({
  onDivisionCustomerChange,
}: DivisionCustomerProps) => {
  const {
    selectedDivision,
    setSelectedDivision,
    selectedCustomer,
    divisions,
  } = useAuthStore();
  const [filter, setFilter] = React.useState({
    selected_division: selectedDivision || null,
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
  });
  const handleDivisionOnchange = (divisionId: string) => {
    setSelectedDivision(divisionId);
    setFilter((prev) => ({ ...prev, selected_division: divisionId }));
  };

  const handleCustomerOnchange = (customerId: string) => {
    onDivisionCustomerChange(customerId);
  };

  const { customers } = useCustomers(filter);
  useEffect(() => {
    let customer = selectedCustomer;
    const foundCustomer = customers?.find((c) => c.id === selectedCustomer);
    if (!foundCustomer) {
      customer = customers?.[0]?.id;
    }
    onDivisionCustomerChange(customer || undefined);
  }, [customers]);

  return (
    <div>
      <div>
        <CustomerSwitcher
          onFilterChange={handleCustomerOnchange}
          customers={customers}
          selectedCustomer={selectedCustomer || ""}
        />
      </div>
      <div className="py-3">
        <DivisionsSwitcher
          onFilterChange={handleDivisionOnchange}
          divisions={divisions}
          selectedDivision={selectedDivision || ""}
        />
      </div>
    </div>
  );
};
