"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type CandidatesStatusFilterProps = {
  onClick: (status: string) => void;
};

const statusStyles: Record<string, string> = {
  New: "bg-blue-100 text-blue-600",
  Accepted: "bg-green-100 text-green-600",
  Interview: "bg-blue-100 text-blue-600",
  Rejected: "bg-red-100 text-red-600",
};

export const CandidatesStatusOptions = ({
  onClick,
}: CandidatesStatusFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        color="secondary"
        className="cursor-pointer"
        onClick={() => onClick("in_progress")}
      >
        New
      </Button>
      <Button
        color="success"
        className="cursor-pointer"
        onClick={() => onClick("accepted")}
      >
        Accepted
      </Button>
      <Button
        color="info"
        className="cursor-pointer"
        onClick={() => onClick("interview")}
      >
        Interview
      </Button>
      <Button
        color="destructive"
        className="cursor-pointer"
        onClick={() => onClick("rejected")}
      >
        Rejected
      </Button>
    </div>
  );
};
