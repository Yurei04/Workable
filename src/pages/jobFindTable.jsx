"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


const ITEMS_PER_PAGE = 5;

export default function JobFindTableBack() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/database/job-database.json")
      .then((res) => res.json())
      .then((result) => {
        console.log("Database JOB running");
        setData(result);
        setFilteredData(result);
      })
      .catch((error) => console.error("Failed to load job database:", error));
  }, []);

  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.job.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedType) {
      filtered = filtered.filter((job) => job.job.type === selectedType);
    }

    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [searchTerm, selectedType, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full p-10 items-center justify-center">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search by job title or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedType || "Filter by Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedType(null)}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("Full-time")}>
              Full-time
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("Remote")}>
              Remote
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Tool</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.job.title}</TableCell>
              <TableCell>{job.job.type}</TableCell>
              <TableCell>{job.job.des}</TableCell>
              <TableCell>
                <a
                  href={job.job.resources.tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {job.job.resources.tool.title}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={job.job.resources.information.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {job.job.resources.information.title}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
