"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

 const [toolDatabase, setToolDatabase] = useState([]);
    const [defaultTool, setDefaultTool] = useState([]);

    const [jobDatabase, setJobDatabase] = useState([]);
    const [defaultJobs, setDefaultJobs] = useState([]);

    const [portfolioDatabase, setPortfolioDatabase] = useState([]);
    const [defaultPortfolio, setDefaultPortfolio] = useState([]);

    const [libraryDatabase, setLibraryDatabase] = useState([]);
    const [defaultLibrary, setDefaultLibrary] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [basicRes, toolsRes, libraryRes, templateRes] = await Promise.all([
                    fetch("").then(res => res.json()),
                    fetch("").then(res => res.json()),
                    fetch("").then(res => res.json()),
                    fetch("").then(res => res.json())
                ]);
                
                console.log("Databases Loaded:", { basicRes, toolsRes, libraryRes, templateRes });

                setPortfolioDatabase(basicRes || []);
                setJobDatabase(basicRes || []);
                setToolDatabase(toolsRes || []);
                setLibraryDatabase(libraryRes || []);

            } catch (error) {
                console.error("Failed to load databases:", error);
            }
        };

        fetchData()
    }, []);

    function searchLibrary() {
        if (!libraryDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredLibrary = libraryDatabase.filter((item) => {
            const job = item.job;
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = job.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });
        setOpenDialog(true)
        setDefaultLibrary(filteredJobs);
    };

    function searchPortfolio() {
        if (!portfolioDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredPortfolio = portfolioDatabase.filter((item) => {
            const job = item.job;
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = job.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });

        setDefaultPortfolio(filteredPortfolio);
    };

    function searchTool() {
        if (!toolDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredTools = toolDatabase.filter((item) => {
            const job = item.job;
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = job.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });
        setOpenDialog(true)
        setDefaultTool(filteredTools);
    };

    function searchJob() {
        if (!jobDatabase.length) return;

        // Filter jobs based on title or keywords
        const filteredJobs = jobDatabase.filter((item) => {
            const job = item.job;
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const keywordMatch = job.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return titleMatch || keywordMatch;
        });
        setOpenDialog(true)
        setDefaultJobs(filteredJobs);
    };

    const queryJob = async () => {
        if (!queryJob.trim()) return;  
    }

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
