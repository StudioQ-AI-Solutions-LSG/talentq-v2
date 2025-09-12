"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useCandidatesStore } from "@/store/candidate.store";
import ListTable from "./components/list-table";
import { getRequisitions } from "../services/data";
import { useSearchParams, useRouter } from 'next/navigation';
import Pagination, { PaginationButtonProps } from "../components/requisition-table-pagination";

const RequisitionList = () => {
  const {
    selected_customer: selectedCustomer,
    selected_division: selectedDivision,
  } = useCandidatesStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sincronizar cambios de customer y división con la URL

  const searchKey = searchParams.get('search_key') || undefined;
  const statusFilter = searchParams.get('status') || undefined;
  const currentPageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const [pageSize, setPageSize] = useState(8);


  useEffect(() => {
    // Reset page when customer or division changes
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', '1');
    router.push(`?${newSearchParams.toString()}`);
  }, [selectedCustomer, selectedDivision, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "requisitions",
      selectedCustomer,
      selectedDivision,
      searchKey,
      statusFilter,
      currentPageFromUrl,
      pageSize,
    ],
    queryFn: () =>
      getRequisitions(
        {
          customer_id: selectedCustomer || undefined,
          division_id: selectedDivision || undefined,
          search_criteria: searchKey,
          status: statusFilter,
        },
        currentPageFromUrl,
        pageSize
      ),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const requisitions = data || { requisitions: [] };

  const paginationState = {
    pageIndex: currentPageFromUrl - 1,
    pageSize: pageSize,
  };

  const table: PaginationButtonProps = {
    currentPage: paginationState.pageIndex + 1,
    totalPages: data?.total_pages ?? 1,
    previousPage: () => {
      const newPage = Math.max(1, currentPageFromUrl - 1);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());
      router.push(`?${newSearchParams.toString()}`);
    },
    nextPage: () => {
      const newPage = Math.min(data?.total_pages || 1, currentPageFromUrl + 1);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());
      router.push(`?${newSearchParams.toString()}`);
    },
    getCanPreviousPage: () => paginationState.pageIndex > 0,
    getCanNextPage: () =>
      paginationState.pageIndex < (data?.total_pages ?? 1) - 1,
    setPageIndex: (pageIndex: number) => {
      const newPage = pageIndex + 1; // Convertir de 0-based a 1-based
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());
      router.push(`?${newSearchParams.toString()}`);
    },
    pagination: paginationState,
  };

  console.log('List - Data:', data);

  return (
    <div>
      <ListTable requisitions={requisitions.requisitions} />
      {data && data.total_pages > 1 && (
        <div className="w-full flex justify-end mt-6">
          <Pagination table={table} />
        </div>
      )}
    </div>
  );
};

export default RequisitionList;
