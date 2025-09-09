"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { Link } from "@/i18n/routing";
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
import { useSearchParams } from 'next/navigation';
import { RequisitionCandidates } from "../components/requisition-candidate";

const RequisionGrid = () => {
  const router = useRouter();
  const {
    selected_customer: selectedCustomer,
    selected_division: selectedDivision,
  } = useCandidatesStore();

  // Use the filter context if available, otherwise use local state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const searchParams = useSearchParams();


  // Get values from the URL
  const searchKey = searchParams.get('search_key') || undefined;
  const statusFilter = searchParams.get('status') || undefined;
  const currentPageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    // Reset page when customer or division changes
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', '1');
    router.push(`?${newSearchParams.toString()}`);
  }, [selectedCustomer, selectedDivision, router]);


  const { data, isLoading, error, refetch } = useQuery({
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



  const progress = 90;

  const requisitionLogo = "/images/project/p-2.png";

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const requisitions = data || { requisitions: [] };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

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

      console.log('⬅️ previousPage - newPage:', newPage);
      console.log('⬅️ previousPage - newSearchParams:', newSearchParams.toString());

      try {
        router.push(`?${newSearchParams.toString()}`);
        console.log('✅ router.push completed successfully');
      } catch (error) {
        console.error('❌ Error in router.push:', error);
      }
    },
    nextPage: () => {
      const newPage = Math.min(data?.total_pages || 1, currentPageFromUrl + 1);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());

      console.log('➡️ nextPage - newPage:', newPage);
      console.log('➡️ nextPage - newSearchParams:', newSearchParams.toString());

      try {
        router.push(`?${newSearchParams.toString()}`);
        console.log('✅ router.push completed successfully');
      } catch (error) {
        console.error('❌ Error in router.push:', error);
      }
    },
    getCanPreviousPage: () => paginationState.pageIndex > 0,
    getCanNextPage: () =>
      paginationState.pageIndex < (data?.total_pages ?? 1) - 1,
    setPageIndex: (pageIndex: number) => {
      const newPage = pageIndex + 1; // Convertir de 0-based a 1-based
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());

      console.log('🔍 setPageIndex - pageIndex:', pageIndex);
      console.log('�� setPageIndex - newPage:', newPage);
      console.log('�� setPageIndex - newSearchParams:', newSearchParams.toString());
      console.log('🔍 setPageIndex - router:', router);

      try {
        router.push(`?${newSearchParams.toString()}`);
        console.log('✅ router.push completed successfully');
      } catch (error) {
        console.error('❌ Error in router.push:', error);
      }
    },
    pagination: paginationState,
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
            <Link href={`/requisitions/${id}`} key={index}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
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
                <RequisitionAction requisitionId={id} />
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
                    <RequisitionCandidates positionId={id} maxVisible={3} />
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
            </Link>
          )
        )}
      </div>
      {data && data.total_pages > 1 && (
        <>
          <div className="w-full flex justify-end mt-6">
            <Pagination table={table} />
          </div>
        </>
      )}
    </>
  );
};

export default RequisionGrid;
