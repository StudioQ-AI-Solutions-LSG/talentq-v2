"use client";
import { Button } from "@/components/ui/button";
import { Filter, List, Plus } from "lucide-react";
import CreateRequisition from "./create-requisition";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/components/navigation";
import { getRequisitionNav } from "../services/data";
import { RequisitionFilter } from "./requisition-filter";
import { getRequisitions } from "../services/data";

const RequisitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const pathname = usePathname();
  const menus = getRequisitionNav(pathname);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [params, setParams] = useState<any>({
    search_key: "",
    status: [],
  });
  const [selectedRequisitionId, setSelectedRequisitionId] = useState<string | null>(null);

  let statusRequisitions: any[] = [];
  getRequisitions(params, 1, 8).then((res) => {
    console.log({ res })
    statusRequisitions = res.requisitions.map((item) => ({
      id: item.id,
      label: item.status,
      value: item.status,
    }));
  });
  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (status: string[]) => {
    setSelectedStatus(status);
    setParams({
      ...params,
      status: status,
    });
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
      {children}
    </div>
  );
};

export default RequisitionWrapper;
