"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useCandidatesStore } from "@/store/candidate.store";
import ListTable from "./components/list-table";
import { getRequisitions } from "../services/data";

const RequisitionList = () => {
  const {
    selected_customer: selectedCustomer,
    selected_division: selectedDivision,
  } = useCandidatesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCustomer, selectedDivision]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "requisitions",
      selectedCustomer,
      selectedDivision,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      getRequisitions(
        {
          customer_id: selectedCustomer || undefined,
          division_id: selectedDivision || undefined,
        },
        currentPage,
        pageSize
      ),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const requisitions = data || { requisitions: [] };

  return (
    <div>
      <ListTable requisitions={requisitions.requisitions}
        pagination={{
          currentPage: currentPage || 1,
          totalPages: data?.total_pages || 1,
          totalItems: data?.total || 0,
          pageSize: pageSize || 8
        }}
        onPageChange={(newPage: number) => setCurrentPage(newPage)} />
    </div>
  );
};

export default RequisitionList;
