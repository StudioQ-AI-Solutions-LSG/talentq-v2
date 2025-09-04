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
import { defaultRequisitions } from "../../services/data";
import { Requisition } from "../../types/requisitions.types";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  SquarePen,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import EditRequisition from "../../components/edit-requisition";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";

interface ListTableProps {
  requisitions: Requisition[];
}
import { Input } from "@/components/ui/input";

const ListTable = ({ requisitions }: ListTableProps) => {

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [editTaskOpen, setEditTaskOpen] = React.useState<boolean>(false);
  const [deleteRequisition, setDeleteRequisition] =
    React.useState<boolean>(false);


  const columns: ColumnDef<Requisition>[] = [
    {
      accessorKey: "position_name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 shadow-none border-none bg-transparent hover:bg-transparent">
              {/* <AvatarImage src={row.original.requisitionLogo} /> */}
              <AvatarFallback> DC</AvatarFallback>
            </Avatar>
            <div className="font-medium text-sm leading-4 whitespace-nowrap">
              {row.getValue("position_name")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => {
        return (
          <span className="whitespace-nowrap">
            {row.getValue("start_date")}
          </span>
        );
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        return (
          <span className="whitespace-nowrap">{row.getValue("endDate")}</span>
        );
      },
    },
    // {
    //   accessorKey: "assignee",
    //   header: "Assignee",
    //   cell: ({
    //     row,
    //   }: {
    //     row: { getValue: (key: string) => { image: string }[] };
    //   }) => {
    //     const assignees = row.getValue("assignee");
    //     return (
    //       <div className="flex -space-x-1 rtl:space-x-reverse">
    //         <div className="flex -space-x-1 rtl:space-x-reverse">
    //           {assignees.map((item, index) => (
    //             <Avatar
    //               key={`user-${index}`}
    //               className="h-6 w-6 shadow-none border-none bg-transparent hover:bg-transparent"
    //             >
    //               <AvatarImage src={item.image} />
    //               <AvatarFallback>SC</AvatarFallback>
    //             </Avatar>
    //           ))}
    //         </div>
    //         <div className="bg-card text-default-900  text-xs ring-2 ring-default-100  rounded-full h-6 w-6 flex flex-col justify-center items-center">
    //           +2
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div>
            <Progress
              value={row.getValue("status")}
              color={getColor(row.getValue("status"))}
              size="sm"
            />
            <div className=" text-xs text-default-500  font-medium mt-3 whitespace-nowrap">
              <span className="whitespace-nowrap">
                {row.getValue("status")}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
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
              <DropdownMenuItem
                className="py-2 border-b border-default-200 text-default-600 focus:bg-default focus:text-default-foreground rounded-none cursor-pointer"
                asChild
              >
                <Link href={`/requisitions/${defaultRequisitions[0].id}`}>
                  <Eye className="w-3.5 h-3.5 me-1" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="py-2 border-b border-default-200 text-default-600 focus:bg-default focus:text-default-foreground rounded-none cursor-pointer"
                onClick={() => setEditTaskOpen(true)}
              >
                <SquarePen className="w-3.5 h-3.5 me-1" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="py-2  bg-destructive/10 text-destructive focus:bg-destructive focus:text-destructive-foreground rounded-none cursor-pointer"
                onClick={() => setDeleteRequisition(true)}
              >
                <Trash2 className="w-3.5 h-3.5  me-1" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: requisitions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Validación de seguridad para evitar errores
  if (!requisitions || !Array.isArray(requisitions)) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>No requisitions data available.</p>
        </CardContent>
      </Card>
    );
  }


  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Active":
        return "success";
      case "Closed":
        return "destructive";
    }
  };

  return (
    <>
      <EditRequisition open={editTaskOpen} setOpen={setEditTaskOpen} />
      <DeleteConfirmationDialog
        open={deleteRequisition}
        onClose={() => setDeleteRequisition(false)}
      />
      <Card>
        <CardHeader>
          <CardTitle>Requisition List</CardTitle>
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
              {table.getRowModel().rows &&
                table.getRowModel().rows.length > 0 ? (
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* <div className="flex items-center justify-end py-4 px-10">
            <div className="flex-1 flex items-center gap-3">
              <div className=" flex gap-2 items-center">
                <div className="text-sm font-medium text-default-60">Go </div>
                <Input
                  type="number"
                  className="w-16 px-2"
                  defaultValue={pagination.currentPage}
                  value={pagination.currentPage}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value)
                      : 1;
                    onPageChange(pageNumber);
                  }}
                />
              </div>
              <div className="text-sm font-medium text-default-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-none">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
                className="w-8 h-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={`page-${page}`}
                  onClick={() => onPageChange(page)}
                  size="icon"
                  className={`w-8 h-8 ${pagination.currentPage === page
                    ? "bg-default"
                    : "bg-default-300 text-default"
                    }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
                className="w-8 h-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </>
  );
};
export default ListTable;
