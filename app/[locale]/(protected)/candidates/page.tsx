"use client";

import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import debounce from "just-debounce-it";

import TablePagination, {
  PaginationButtonProps,
} from "./components/candidates-table-pagination";
import { useCandidates } from "./hooks/use-candidates";
import { Loader2 } from "lucide-react";
import { useCandidatesStore } from "@/store/candidate.store";
import { CandidatesRequisitionFilter } from "./components/candidates-requisition-filter";
import { useRequisitionsFilter } from "./hooks/use-requisitions-filter";
import { CandidatesStatusFilter } from "./components/candidates-status-filter";
import { statusCandidates } from "@/lib/constants/candidates.constants";
import CandidateList from "./components/candidates-list";

const CandidateSection = () => {
  const [selectedRequisitionId, setSelectedRequisitionId] = React.useState<
    string | null
  >(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
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

  const handleRequisitionChange = (value: string | null) => {
    setSelectedRequisitionId(value);
    setParams({ requisition_position_id: value, page: 1 }); // o el nombre del filtro que uses en tu backend
  };

  const handleStatusChange = (value: string[]) => {
    setSelectedStatus(value);
    setParams({ status: value, page: 1 }); // o el nombre del filtro que uses en tu backend
  };

  const {
    candidates,
    pagination: servicePagination,
    isLoading,
    error,
  } = useCandidates();

  const { requisitions } = useRequisitionsFilter();

  const paginationState = {
    pageIndex: page - 1,
    pageSize: page_size,
  };

  const table: PaginationButtonProps = {
    currentPage: paginationState.pageIndex + 1,
    totalPages: servicePagination?.totalPages ?? 1,
    previousPage: () => setParams({ page: paginationState.pageIndex }),
    nextPage: () => setParams({ page: paginationState.pageIndex + 2 }),
    getCanPreviousPage: () => paginationState.pageIndex > 0,
    getCanNextPage: () =>
      paginationState.pageIndex < (servicePagination?.totalPages ?? 1) - 1,
    setPageIndex: (pageIndex: number) => setParams({ page: pageIndex + 1 }),
    pagination: paginationState,
  };

  return (
    <div className="w-full">
      <div className="py-4">
        <div className="text-2xl font-medium text-default-900 mb-4">
          Candidates
        </div>

        <div className="flex items-center gap-3 w-full mt-7">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch className="h-5 w-5" />
            </span>
            <Input
              placeholder="Search by Name and Position..."
              value={search}
              onChange={handleSearchBar}
              className="w-[350px] h-[40px] text-xs text-gray-900 placeholder:text-gray-400 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
            />
          </div>
          <CandidatesRequisitionFilter
            requisitions={requisitions}
            selected_requisition_id={selectedRequisitionId}
            onChange={handleRequisitionChange}
          />
          <CandidatesStatusFilter
            statuses={statusCandidates}
            selected_status_ids={selectedStatus}
            onChange={handleStatusChange}
          />
          <button
            onClick={() => {
              setSearch("");
              setParams({
                search_criteria: "",
                requisition_position_id: null,
                status: [],
              });
              setSelectedRequisitionId(null);
              setSelectedStatus([]);
            }}
            className="text-sm px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200"
          >
            Clear
          </button>
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
