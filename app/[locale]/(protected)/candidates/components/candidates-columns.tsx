"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreVertical, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz"; // optional for formatting dates
import { FaDotCircle } from "react-icons/fa"; // optional for timeline dots

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TimelineKey = keyof TimelineData;

type TimelineData = {
  join_to_req?: string;
  interview_date?: string;
  decision_date?: string;
  activation_date?: string;
  billing_date?: string;
};

export type DataProps = {
  id: number;
  name: string;
  email: string;
  photo: string;
  join_to_req: string;
  interview_date: string;
  decision_date: string;
  activation_date: string;
  billing_date: string;
  timeline: TimelineData;
  durations: {
    join_to_interview: string;
    interview_to_decision: string;
    decision_to_activation: string;
    activation_to_billing: string;
  };
  action: React.ReactNode;
};

const ActionsCell = ({ row }: { row: any }) => {
  const accountId = row.original.id;
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="bg-transparent ring-offset-transparent hover:bg-transparent hover:ring-0 hover:ring-transparent"
        >
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4 text-default-800" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/en/candidates/${accountId}/`)}
        >
          <Eye className="w-4 h-4 me-1.5" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 border-b text-default-700 group focus:bg-default focus:text-primary-foreground rounded-none">
          <SquarePen className="w-4 h-4 me-1.5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 border-b text-destructive bg-destructive/30  focus:bg-destructive focus:text-destructive-foreground rounded-none">
          <Trash2 className="w-4 h-4 me-1.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => <span>{row.getValue("created_at") ?? "--"}</span>,
  },
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const candidate = row.original;
      return (
        <div className="font-medium text-card-foreground/80">
          <div className="flex gap-3 items-center">
            <Avatar className="rounded-full w-8 h-8 bg-transparent hover:bg-transparent shadow-none border-none">
              {candidate?.photo ? (
                <AvatarImage src={candidate.photo} />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-medium text-primary dark:text-primary-foreground">
                    {candidate.name?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm text-default-600">
                {candidate?.name ?? "--"}
              </span>
              <span className="text-xs text-default-400 lowercase">
                {candidate?.email ?? "--"}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "requisition_custom_name",
    header: "requisition",
    cell: ({ row }) => (
      <span>{row.getValue("requisition_custom_name") ?? "--"}</span>
    ),
  },
  {
    accessorKey: "timeline",
    header: "Timeline",
    cell: ({ row }) => {
      const timeline = row.getValue("timeline") as TimelineData;

      const stages: { label: string; key: TimelineKey }[] = [
        { label: "Requisition", key: "join_to_req" },
        { label: "Interview", key: "interview_date" },
        { label: "Decision", key: "decision_date" },
        { label: "Activation", key: "activation_date" },
        { label: "Billing", key: "billing_date" },
      ];

      const completedStages = stages.map((stage) => !!timeline?.[stage.key]);
      const lastCompletedIndex = completedStages.lastIndexOf(true);

      return (
        <div className="flex items-center justify-between py-4 px-1 overflow-x-auto relative">
          {stages.map(({ label, key }, index) => {
            const date = timeline?.[key];
            const isCompleted = !!date;
            const isLastCompleted = index === lastCompletedIndex;
            const pointColor = index < lastCompletedIndex || isCompleted ? "green" : "gray";
            const lineColor = index < lastCompletedIndex ? "bg-green-500" : "bg-gray-300";

            return (
              <div
                key={key}
                className="relative flex flex-col items-center text-center min-w-[70px] flex-1"
              >
                {index < stages.length - 1 && (
                  <div
                    className={`absolute top-2 left-1/2 h-0.5 ${lineColor}`}
                    style={{
                      width: "100%",
                      transform: "translateX(0%)",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Dot */}
                <div className="relative flex h-4 w-4 items-center justify-center mb-2 z-10 bg-white rounded-full">
                  {isLastCompleted && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  )}
                  <FaDotCircle
                   className={`text-${pointColor}-500 relative z-10`}
                  />
                </div>

                {/* Tags */}
                <div className="text-xs text-gray-700 whitespace-nowrap">
                  <div className="font-semibold">{label}</div>
                  <div>
                    {date
                      ? formatInTimeZone(new Date(date), "UTC", "MMM dd")
                      : "—"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors: Record<string, string> = {
        Presented: "bg-blue-100 text-blue-600",
        Interview: "bg-blue-100 text-blue-600",
        Accepted: "bg-green-100 text-green-600",
        Rejected: "bg-red-100 text-red-600",
        Activated: "bg-success/20 text-success",
        Billed: "bg-purple-100 text-purple-600",
      };

      const status = row.getValue<string>("status");
      const statusStyles = statusColors[status] || "default";
      return (
        <Badge className={cn("rounded-full px-5", statusStyles)}>
          {status}{" "}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
