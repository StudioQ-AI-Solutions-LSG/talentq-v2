"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequisitions } from "../services/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@/components/ui/icon";
import EmptyRequisition from "./components/empty";
import RequisitionAction from "./components/requisition-action";
import { useCandidatesStore } from "@/store/candidate.store";
import Pagination, {
  PaginationButtonProps,
} from "../components/requisition-table-pagination";
const RequisionGrid = ({ filterContext }: { filterContext?: any }) => {
  const {
    selected_customer: selectedCustomer,
    selected_division: selectedDivision,
  } = useCandidatesStore();
  
  // Usar el contexto de filtros si está disponible, sino usar estado local
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Sincronizar con el contexto de filtros del wrapper
  useEffect(() => {
    if (filterContext?.currentPage) {
      setCurrentPage(filterContext.currentPage);
    }
    if (filterContext?.pageSize) {
      setPageSize(filterContext.pageSize);
    }
  }, [filterContext?.currentPage, filterContext?.pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCustomer, selectedDivision]);

  const filters = {
    customer_id: selectedCustomer || undefined,
    division_id: selectedDivision || undefined,
    search_criteria: filterContext?.filters?.search_key || undefined,
    status: filterContext?.selectedStatus?.[0] || undefined,
  };


  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "requisitions",
      filters,
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

  useEffect(() => {
    if (filterContext?.filters) {
      console.log('Grid - Refetch por cambio de filtros');
      refetch();
    }
  }, [filterContext?.filters, refetch]);


  useEffect(() => {
    console.log('Grid - Refetch por cambio de página:', currentPage);
    refetch();
  }, [currentPage, refetch]);

  const progress = 90;

  const requisitionLogo = "/images/project/p-2.png";

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const requisitions = data || { requisitions: [] };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (filterContext?.onPageChange) {
      filterContext.onPageChange(page);
    }
  };

  const table: PaginationButtonProps = {
    currentPage: currentPage,
    totalPages: data?.total_pages || 1,
    previousPage: () => handlePageChange(Math.max(1, currentPage - 1)),
    nextPage: () => handlePageChange(Math.min(data?.total_pages || 1, currentPage + 1)),
    getCanPreviousPage: () => currentPage > 1,
    getCanNextPage: () => currentPage < (data?.total_pages || 1),
    setPageIndex: (pageIndex: number) => handlePageChange(pageIndex + 1),
    pagination: {
      pageIndex: currentPage - 1,
    },
  };

  if (!requisitions.requisitions || requisitions.requisitions.length === 0)
    return <EmptyRequisition />;
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {requisitions.requisitions?.map(
          (
            {
              id,
              rate,
              skills,
              status,
              rate_type,
              created_at,
              start_date,
              end_date,
              custom_name,
              position_name,
              position_seniority,
              accepted_assignments_count,
              rejected_assignments_count,
              interview_assignments_count,
              in_progress_assignments_count,
              was_confirmed_by_the_customer,
              was_confirmed_by_the_organization,
            },
            index
          ) => (
            <Card key={index}>
              <CardHeader className="flex-row gap-1  items-center space-y-0">
                <div className="flex-1 flex items-center gap-4">
                  <Avatar className="flex-none h-10 w-10 rounded bg-default-200 text-default hover:bg-default-200">
                    <AvatarImage src={requisitionLogo} />
                    <AvatarFallback className="uppercase">
                      {" "}
                      {custom_name.charAt(0) + custom_name.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-default-900 text-lg font-medium max-w-[210px] truncate text-center capitalize ">
                    {custom_name}
                  </h3>
                </div>
                <RequisitionAction />
              </CardHeader>
              <CardContent>
                <div className="text-default-600 text-sm">{position_name}</div>
                <div className="flex gap-4 mt-6">
                  <div>
                    <div className="text-xs text-default-400 mb-1">
                      Start Date
                    </div>
                    <div className="text-xs text-default-600  font-medium">
                      {start_date}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-default-400 mb-1">
                      End Date
                    </div>
                    <div className="text-xs text-default-600  font-medium">
                      {end_date}
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="text-end text-xs text-default-600 mb-1.5 font-medium">
                    {progress}%
                  </div>
                  <Progress value={progress} color="primary" size="sm" />
                </div>
                <div className="flex mt-5">
                  <div className="flex-1">
                    <div className="text-default-400  text-sm font-normal mb-3">
                      Candidates
                    </div>
                    {/* <div className="flex items-center -space-x-1">
                    {assignee?.map((user, index) => (
                      <Avatar
                        key={`user-${index}`}
                        className="h-6 w-6 shadow-none border-none bg-transparent hover:bg-transparent"
                      >
                        <AvatarImage src={user.image} />
                        <AvatarFallback>
                          {" "}
                          {user.name.charAt(0) + user.name.charAt(1)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="bg-card text-default-900  text-xs ring-2 ring-default-100  rounded-full h-6 w-6 flex flex-col justify-center items-center">
                      +2
                    </div>
                  </div> */}
                  </div>
                  <div className="flex-none">
                    <div className="flex items-center gap-1 bg-primary/10 text-destructive rounded-full px-2 py-0.5 text-xs mt-1">
                      <Icon icon="heroicons-outline:clock" />
                      {status}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
      {data && data.total_pages > 1 && (
        <>
          <div className="w-full flex justify-center mt-6">
            <Pagination table={table} />
          </div>
        </>
      )}
    </>
  );
};

export default RequisionGrid;
