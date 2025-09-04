"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

type DivisionFilter = {
  id: string;
  label: string;
  value: string;
};

type DivisionsFilterProps = {
  onChange: (id: string) => void;
};

const statusStyles: Record<string, string> = {
  Presented: "bg-blue-100 text-blue-600",
  Interview: "bg-blue-100 text-blue-600",
  Accepted: "bg-green-100 text-green-600",
  Rejected: "bg-red-100 text-red-600",
  Activated: "bg-success/20 text-success",
  Billed: "bg-purple-100 text-purple-600",
};

export const DivisionFilter = ({ onChange }: DivisionsFilterProps) => {
  const { divisions, selectedDivision: selectedDivisionId } =
    useAuthStore.getState();
  const [open, setOpen] = React.useState(false);

  const toggleValue = (id: string) => {
    onChange(id);
  };

  const selectedDivision = divisions?.find(
    (div) => div.id === selectedDivisionId
  );

  return (
    <div className="flex justify-center py-3">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={`w-[200px] h-[40px] pl-3 pr-4 py-2 border rounded-lg shadow-sm 
              flex items-center justify-between text-left transition-colors 
              overflow-hidden focus:outline-none text-sm
              ${
                open
                  ? "border-transparent ring-2 ring-primary"
                  : "border-gray-300"
              }`}
          >
            <div className="flex flex-wrap gap-1 items-center max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedDivision?.id ? (
                <span
                  key={selectedDivision?.id}
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    statusStyles[selectedDivision?.label] ??
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selectedDivision?.label}
                </span>
              ) : (
                <span className="text-gray-400 text-xs">
                  Select Division...
                </span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[250px] max-h-[300px] overflow-y-auto border rounded-md bg-white shadow-md z-50 p-2"
        >
          {divisions?.map((division) => (
            <label
              key={division.id}
              className="flex items-center space-x-2 cursor-pointer px-2 py-2 hover:bg-blue-50 rounded-md"
            >
              <Checkbox
                checked={selectedDivisionId === division.id}
                onCheckedChange={() => toggleValue(division.id)}
              />
              <span className="text-sm text-gray-800">{division.label}</span>
            </label>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
