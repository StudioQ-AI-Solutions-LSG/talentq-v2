"use client";

import * as React from "react";
import { statusCandidates } from "@/lib/constants/candidates.constants";

type CandidatesStatusFilterProps = {
  selectedStatus: string;
};

export const CandidatesStatusChip = ({
  selectedStatus,
}: CandidatesStatusFilterProps) => {
  const targetStatus = statusCandidates.find(
    (status) => status.value === selectedStatus
  );
  return (
    <div className="flex py-1">
      <div className="flex flex-wrap gap-1 items-center max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
        <span
          key={targetStatus?.id}
          className={`text-xs rounded-full px-2 py-0.5 ${
            targetStatus?.style ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {targetStatus?.label}
        </span>
      </div>
    </div>
  );
};
