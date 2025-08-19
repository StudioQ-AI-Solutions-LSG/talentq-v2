"use client";

import * as React from "react";
import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiSearch } from "react-icons/fi";
import { columns } from "./components/candidates-columns";
import { Input } from "@/components/ui/input";
import debounce from "just-debounce-it";

import TablePagination from "./components/candidates-table-pagination";
import { useCandidates } from "./hooks/use-candidates";
import { Loader2 } from "lucide-react";
import { useCandidatesStore } from "@/store/candidate.store";
import { CandidatesStatusOptions } from "./components/candidates-status-options";
import CandidateList from "./components/candidates-list";
import SiteBreadcrumb from "@/components/site-breadcrumb";

const CandidateSection = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRequisitionId, setSelectedRequisitionId] = React.useState<
    string | null
  >(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");
  const { search_criteria, page, page_size, setParams } = useCandidatesStore();

  const [search, setSearch] = React.useState(search_criteria ?? "");

  const debounceSearch = React.useCallback(
    debounce((newSearch: string) => {
      setParams({ search_criteria: newSearch, page: 1 });
    }, 300),
    [setParams]
  );

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const handleStatusClick = (value: string) => {
    setSelectedStatus(value);
    setParams({ status: value, page: 1 });
  };

  const {
    candidates,
    pagination: servicePagination,
    isLoading,
    error,
  } = useCandidates();

  const paginationState = {
    pageIndex: page - 1,
    pageSize: page_size,
  };
  const table = useReactTable({
    data: candidates ?? [],
    columns,
    manualPagination: true,
    manualFiltering: true,
    pageCount: servicePagination?.totalPages ?? 1,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(paginationState) : updater;
      setParams({
        page: next.pageIndex + 1,
        page_size: next.pageSize,
      });
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
  });

  return (
    <div className="w-full">
      <SiteBreadcrumb />
      <div className="">
        <div className="text-2xl font-medium text-default-900 mb-4">
          Candidates
        </div>
        <div className="flex items-center justify-end gap-3 w-full mt-1">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch className="h-5 w-5" />
            </span>
            <Input
              placeholder="Search by Name, Position, Location..."
              value={search}
              onChange={handleSearchBar}
              className="w-[350px] h-[40px] text-xs text-gray-900 placeholder:text-gray-400 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
            />
          </div>
          <div>
            <CandidatesStatusOptions onClick={handleStatusClick} />
          </div>
        </div>
      </div>
      {candidates?.length > 0 ? (
        <CandidateList candidates={candidates} />
      ) : (
        <div className="h-24 text-center py-4">
          {isLoading ? (
            <span className="inline-flex gap-1 items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : (
            <p>No results were found...</p>
          )}
        </div>
      )}
      <TablePagination table={table} />
    </div>
  );
};

export default CandidateSection;
