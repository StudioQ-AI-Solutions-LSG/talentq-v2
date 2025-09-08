"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { List, Plus } from "lucide-react";
import CreateRequisition from "./create-requisition";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/components/navigation";
import { getRequisitionNav } from "../services/data";
import { RequisitionFilter } from "./requisition-filter";
import { useRouter, useSearchParams } from "next/navigation";

const RequisitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const menus = getRequisitionNav(pathname);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [params, setParams] = useState<any>({
    search_key: "",
    status: [],
  });
  const [selectedRequisitionId, setSelectedRequisitionId] = useState<
    string | null
  >(null);

  const statusRequisitions = [
    { id: "1", label: "Active", value: "Active" },
    { id: "2", label: "In Progress", value: "In Progress" },
    { id: "3", label: "Pending", value: "Pending" },
    { id: "4", label: "Closed", value: "Closed" },
    { id: "5", label: "Closed By Customer", value: "Closed By Customer" },
    { id: "6", label: "New", value: "New" },
  ];

  const refreshData = () => {
    console.log(
      "Recargando datos con filtros:",
      params,
      "página:",
      currentPage
    );
  };

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setCurrentPage(1);

    // Create new URL params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search_key", searchValue);
    newSearchParams.set("page", "1");

    //URL Update
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);

    const newSearchParams = new URLSearchParams(searchParams);

    if (status) {
      newSearchParams.set("status", status);
    } else {
      newSearchParams.delete("status");
    }

    newSearchParams.set("page", "1");
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedStatus("");
    setCurrentPage(1);
    setParams({
      search_key: "",
      status: "",
    });
    setSelectedRequisitionId(null);

    // Clean all of the URL params
    router.push(window.location.pathname);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());

    router.push(`?${newSearchParams.toString()}`);
  };

  // Create object with all of the filters and functions
  const filterContext = {
    filters: params,
    search: search,
    selectedStatus: selectedStatus,
    currentPage: currentPage,
    pageSize: pageSize,
    refreshData: refreshData,
    clearFilters: handleClearFilters,
    onPageChange: handlePageChange,
  };

  useEffect(() => {
    const urlSearch = searchParams.get("search_key") || "";
    const urlStatus = searchParams.get("status") || "";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);

    setSearch(urlSearch);
    setSelectedStatus(urlStatus);
    setCurrentPage(urlPage);
  }, [searchParams]);

  return (
    <div>
      <CreateRequisition open={open} setOpen={setOpen} />
      <div className="flex w-full flex-wrap items-center gap-4 mb-6">
        <h4 className="flex-1 font-medium lg:text-2xl text-xl capitalize text-default-900">
          Requisitions
        </h4>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <RequisitionFilter
              search={search}
              handleSearchBar={handleSearchBar}
              statusRequisitions={statusRequisitions}
              selectedStatus={selectedStatus}
              handleStatusChange={handleStatusChange}
              handleClearFilters={handleClearFilters}
            />
          </div>

          {/* Nav Buttons and Actions */}
          <div className="flex items-center gap-4">
            {menus?.map(({ label, href, active }, index) => (
              <Button
                key={index}
                asChild
                className={cn(
                  "flex-none capitalize bg-card text-default-600 hover:bg-card hover:text-default-600  hover:ring-0 hover:ring-transparent",
                  {
                    "bg-default text-default-foreground hover:bg-default hover:text-default-foreground":
                      active,
                  }
                )}
              >
                <Link href={href}>
                  <List className="w-3.5 h-3.5 me-1" />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
            <Button className="flex-none" onClick={() => setOpen(true)}>
              <Plus className="w-4 h-4 me-1" />
              <span>Add Requisition</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Pass filters as props to children */}
      {React.cloneElement(children as React.ReactElement, { filterContext })}
    </div>
  );
};

export default RequisitionWrapper;
