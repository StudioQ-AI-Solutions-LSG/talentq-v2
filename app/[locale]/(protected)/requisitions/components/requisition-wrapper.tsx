'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, List, Plus } from "lucide-react";
import CreateRequisition from "./create-requisition";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/components/navigation";
import { getRequisitionNav } from "../services/data";
import { RequisitionFilter } from "./requisition-filter";
import React from "react";

const RequisitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const pathname = usePathname();
  const menus = getRequisitionNav(pathname);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [params, setParams] = useState<any>({
    search_key: "",
    status: [],
  });
  const [selectedRequisitionId, setSelectedRequisitionId] = useState<string | null>(null);


  const statusRequisitions = [
    { id: "1", label: "Active", value: "Active" },
    { id: "2", label: "In Progress", value: "In Progress" },
    { id: "3", label: "Pending", value: "Pending" },
    { id: "4", label: "Closed", value: "Closed" },
    { id: "5", label: "Closed By Customer", value: "Closed By Customer" },
    { id: "6", label: "New", value: "New" },
  ];


  const refreshData = () => {
    console.log('Recargando datos con filtros:', params, 'página:', currentPage);
  };

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setCurrentPage(1);

    const newParams = {
      ...params,
      search_key: searchValue,
    };
    setParams(newParams);

    setTimeout(() => refreshData(), 500);
  };

  const handleStatusChange = (status: string[]) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    const newParams = {
      ...params,
      status: status,
    };
    setParams(newParams);

    refreshData();
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedStatus([]);
    setCurrentPage(1); 
    setParams({
      search_key: "",
      status: [],
    });
    setSelectedRequisitionId(null);

    refreshData();
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refreshData();
  };

  // Crear objeto con todos los filtros y funciones
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

  return (
    <div>
      <CreateRequisition open={open} setOpen={setOpen} />
      <div className="flex w-full flex-wrap items-center gap-4 mb-6">
        <h4 className="flex-1 font-medium lg:text-2xl text-xl capitalize text-default-900">
          Requisitions
        </h4>
        <div className="flex items-center gap-4 flex-wrap">
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

          <Button
            className={cn(
              "flex-none bg-card text-default-600 hover:ring-0 hover:ring-transparent hover:bg-default hover:text-default-foreground",
              { "bg-default text-default-foreground": showFilters }
            )}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-3.5 h-3.5 me-1" />
            <span>Filters</span>
          </Button>
          <Button className="flex-none" onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4 me-1" />
            <span>Add Requisition</span>
          </Button>
        </div>
      </div>

      {/* Componente de filtro integrado */}
      {showFilters && (
        <RequisitionFilter
          search={search}
          handleSearchBar={handleSearchBar}
          statusRequisitions={statusRequisitions}
          selectedStatus={selectedStatus}
          handleStatusChange={handleStatusChange}
          setSearch={setSearch}
          setParams={setParams}
          setSelectedRequisitionId={setSelectedRequisitionId}
          setSelectedStatus={setSelectedStatus}
        />
      )}

      {/* Pasar filtros como props a children */}
      {React.cloneElement(children as React.ReactElement, { filterContext })}
    </div>
  );
};

export default RequisitionWrapper;