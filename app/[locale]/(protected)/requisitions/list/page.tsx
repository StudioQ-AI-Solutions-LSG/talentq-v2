'use client'

import React from "react";
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import ListTable from "./components/list-table";
import { getRequisitions } from "../data";

const RequisitionList = () => {
  const selectedCustomer = useAuthStore(state => state.selectedCustomer);
  const selectedDivision = useAuthStore(state => state.selectedDivision);

  const { data, isLoading, error } = useQuery({
    queryKey: ['requisitions', selectedCustomer, selectedDivision],
    queryFn: () => getRequisitions({
      customer_id: selectedCustomer || undefined,
      division_id: selectedDivision || undefined
    }),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const requisitions = data || { requisitions: [] };

  return (
    <div>
      <ListTable requisitions={requisitions.requisitions} />
    </div>
  );
};

export default RequisitionList;