"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, MessageSquare, FileText, Download } from "lucide-react";
import { RequisitionPositionCandidate } from "../../services/requisitions-positions-candidates";

interface CandidatesTableProps {
  requisitionId: string;
}

// Mock data for development
const mockCandidates: RequisitionPositionCandidate[] = [
  {
    id: "1",
    name: "John",
    last_name: "Doe",
    rate: 75000,
    role: "Senior Developer",
    photo: "/images/avatar/av-1.svg",
    resume: "resume.pdf",
    skills: ["React", "TypeScript", "Node.js"],
    location: "New York, NY",
    rate_type: "annual",
    birth_date: "1990-01-15",
    attachment_cv: "cv.pdf",
    seniority_name: "Senior",
    default_language: "English",
    assignment_status: "interview",
    is_customer_likes: true,
    candidate_assignment: "assigned",
    default_language_level: "Native",
    expected_interview_date: "2024-01-20",
    confirmed_interview_date: "2024-01-20",
    customer_interview_notes: "Strong technical background",
    is_available_for_interview: true,
    customer_wants_to_interview: true,
    interview_duration_in_minutes: 60,
  },
  {
    id: "2",
    name: "Jane",
    last_name: "Smith",
    rate: 80000,
    role: "Full Stack Developer",
    photo: "/images/avatar/av-2.svg",
    resume: "resume.pdf",
    skills: ["Vue.js", "Python", "PostgreSQL"],
    location: "San Francisco, CA",
    rate_type: "annual",
    birth_date: "1988-05-22",
    attachment_cv: "cv.pdf",
    seniority_name: "Senior",
    default_language: "English",
    assignment_status: "new",
    is_customer_likes: false,
    candidate_assignment: "pending",
    default_language_level: "Native",
    expected_interview_date: "",
    confirmed_interview_date: "",
    customer_interview_notes: "",
    is_available_for_interview: true,
    customer_wants_to_interview: false,
    interview_duration_in_minutes: 0,
  },
  {
    id: "3",
    name: "Mike",
    last_name: "Johnson",
    rate: 70000,
    role: "Frontend Developer",
    photo: "/images/avatar/av-3.svg",
    resume: "resume.pdf",
    skills: ["Angular", "JavaScript", "CSS"],
    location: "Austin, TX",
    rate_type: "annual",
    birth_date: "1992-08-10",
    attachment_cv: "cv.pdf",
    seniority_name: "Mid",
    default_language: "English",
    assignment_status: "approved",
    is_customer_likes: true,
    candidate_assignment: "approved",
    default_language_level: "Native",
    expected_interview_date: "2024-01-18",
    confirmed_interview_date: "2024-01-18",
    customer_interview_notes: "Excellent communication skills",
    is_available_for_interview: true,
    customer_wants_to_interview: true,
    interview_duration_in_minutes: 45,
  },
  {
    id: "4",
    name: "Sarah",
    last_name: "Wilson",
    rate: 90000,
    role: "Lead Developer",
    photo: "/images/avatar/av-4.svg",
    resume: "resume.pdf",
    skills: ["React", "TypeScript", "AWS", "Docker"],
    location: "Seattle, WA",
    rate_type: "annual",
    birth_date: "1985-03-12",
    attachment_cv: "cv.pdf",
    seniority_name: "Senior",
    default_language: "English",
    assignment_status: "rejected",
    is_customer_likes: false,
    candidate_assignment: "rejected",
    default_language_level: "Native",
    expected_interview_date: "2024-01-16",
    confirmed_interview_date: "2024-01-16",
    customer_interview_notes: "Overqualified for the position",
    is_available_for_interview: true,
    customer_wants_to_interview: false,
    interview_duration_in_minutes: 0,
  },
  {
    id: "5",
    name: "David",
    last_name: "Brown",
    rate: 65000,
    role: "Junior Developer",
    photo: "/images/avatar/av-5.svg",
    resume: "resume.pdf",
    skills: ["JavaScript", "HTML", "CSS"],
    location: "Chicago, IL",
    rate_type: "annual",
    birth_date: "1995-07-08",
    attachment_cv: "cv.pdf",
    seniority_name: "Junior",
    default_language: "English",
    assignment_status: "new",
    is_customer_likes: true,
    candidate_assignment: "pending",
    default_language_level: "Native",
    expected_interview_date: "",
    confirmed_interview_date: "",
    customer_interview_notes: "",
    is_available_for_interview: true,
    customer_wants_to_interview: true,
    interview_duration_in_minutes: 0,
  }
];

const CandidatesTable = ({ requisitionId }: CandidatesTableProps) => {
  // Use mock data for now
  const candidates = mockCandidates;
  const isLoading = false;
  const error = null;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-info/20 text-info border-info/30";
      case "interview":
        return "bg-warning/20 text-warning border-warning/30";
      case "approved":
        return "bg-success/20 text-success border-success/30";
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  const columns: ColumnDef<RequisitionPositionCandidate>[] = [
    {
      accessorKey: "name",
      header: "Candidate",
      cell: ({ row }) => {
        const candidate = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={candidate.photo} />
              <AvatarFallback>
                {candidate.name.charAt(0)}{candidate.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">
                {candidate.name} {candidate.last_name}
              </div>
              <div className="text-xs text-default-500">
                {candidate.role} • {candidate.location}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "rate",
      header: "Rate",
      cell: ({ row }) => {
        const candidate = row.original;
        return (
          <div className="text-sm">
            <div className="font-medium">
              ${candidate.rate.toLocaleString()}
            </div>
            <div className="text-xs text-default-500">
              {candidate.rate_type}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "seniority_name",
      header: "Seniority",
      cell: ({ row }) => {
        return (
          <Badge color="secondary" className="text-xs">
            {row.getValue("seniority_name")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "assignment_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("assignment_status") as string;
        return (
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "skills",
      header: "Skills",
      cell: ({ row }) => {
        const skills = row.getValue("skills") as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 2).map((skill, index) => (
              <Badge key={index} color="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 2 && (
              <Badge color="secondary" className="text-xs">
                +{skills.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const candidate = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="flex-none ring-offset-transparent bg-transparent hover:bg-transparent hover:ring-0 hover:ring-transparent w-6"
              >
                <MoreVertical className="h-4 w-4 text-default-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 overflow-hidden" align="end">
              <DropdownMenuItem className="py-2 border-b border-default-200 text-default-600 focus:bg-default focus:text-default-foreground rounded-none cursor-pointer">
                <Eye className="w-3.5 h-3.5 me-1" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 border-b border-default-200 text-default-600 focus:bg-default focus:text-default-foreground rounded-none cursor-pointer">
                <MessageSquare className="w-3.5 h-3.5 me-1" />
                Schedule Interview
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 border-b border-default-200 text-default-600 focus:bg-default focus:text-default-foreground rounded-none cursor-pointer">
                <FileText className="w-3.5 h-3.5 me-1" />
                View Resume
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-default-600 focus:bg-default focus:text-default-foreground rounded-none cursor-pointer">
                <Download className="w-3.5 h-3.5 me-1" />
                Download CV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: candidates,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Associated Candidates</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading candidates...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Associated Candidates</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="text-destructive">
            Error loading candidates: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Associated Candidates</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="px-3 bg-default-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows && table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="even:bg-default-100 px-6 h-20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No candidates found for this requisition.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4 px-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidatesTable;
