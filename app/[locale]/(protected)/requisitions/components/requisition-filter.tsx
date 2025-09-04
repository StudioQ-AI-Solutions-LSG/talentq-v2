import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import React from "react";

interface RequisitionFilterProps {
    search: string;
    handleSearchBar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    statusRequisitions: any[];
    selectedStatus: string | undefined;
    handleStatusChange: (status: string) => void;
    handleClearFilters: () => void;
}

export const RequisitionFilter = ({
    search,
    handleSearchBar,
    statusRequisitions,
    selectedStatus,
    handleStatusChange,
    handleClearFilters,
}: RequisitionFilterProps) => {
    return (
        <div className="flex items-center gap-3 w-full mt-7">
            <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiSearch className="h-5 w-5" />
                </span>
                <Input
                    placeholder="Search by Customer, Status..."
                    value={search}
                    onChange={handleSearchBar}
                    className="w-[350px] h-[40px] text-xs text-gray-900 placeholder:text-gray-400 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <RequisitionsStatusFilter
                statuses={statusRequisitions}
                selected_status_ids={selectedStatus}
                onChange={handleStatusChange}
            />
            <button
                onClick={handleClearFilters}
                className="text-sm px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200"
            >
                Clear
            </button>
        </div>
    )
}

type StatusFilter = {
    id: string;
    label: string;
    value: string;
};
type RequistiionsStatusFilterProps = {
    statuses: StatusFilter[];
    selected_status_ids: string | undefined;
    onChange: (id: string) => void;
};
const statusStyles: Record<string, string> = {
    "Active": "bg-green-100 text-green-600",
    "In Progress": "bg-blue-100 text-blue-600",
    "Pending": "bg-yellow-100 text-yellow-600",
    "Closed": "bg-gray-200 text-gray-800",
    "Closed By Customer": "bg-red-100 text-red-700",
    "New": "bg-purple-100 text-purple-600",
};

const RequisitionsStatusFilter = ({
    statuses,
    selected_status_ids,
    onChange,
}: RequistiionsStatusFilterProps) => {
    const [open, setOpen] = React.useState(false);

    const selectValue = (id: string) => {
        if (selected_status_ids === id) {
            onChange("");
        } else {
            onChange(id);
        }
    };

    const selectedStatusObject = statuses.find((s) =>
        s.value === selected_status_ids
    );

    return (
        <div className="flex justify-center">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`w-[200px] h-[40px] pl-3 pr-4 py-2 border rounded-lg shadow-sm 
                flex items-center justify-between text-left transition-colors 
                overflow-hidden focus:outline-none text-sm
                ${open
                                ? "border-transparent ring-2 ring-primary"
                                : "border-gray-300"
                            }`}
                    >
                        <div className="flex flex-wrap gap-1 items-center max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {selectedStatusObject ? (
                                <span
                                    className={`text-xs rounded-full px-2 py-0.5 ${statusStyles[selectedStatusObject.label] ??
                                        "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {selectedStatusObject.label}
                                </span>
                            ) : (
                                <span className="text-gray-400 text-xs">Select Status...</span>
                            )}
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="w-[250px] max-h-[300px] overflow-y-auto border rounded-md bg-white shadow-md z-50 p-2"
                >
                    {statuses.map((item) => (
                        <label
                            key={item.id}
                            className="flex items-center space-x-2 cursor-pointer px-2 py-2 hover:bg-blue-50 rounded-md"
                        >
                            <Checkbox
                                checked={selected_status_ids === item.value}
                                onCheckedChange={() => selectValue(item.value)}
                            />
                            <span className="text-sm text-gray-800">{item.label}</span>
                        </label>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
