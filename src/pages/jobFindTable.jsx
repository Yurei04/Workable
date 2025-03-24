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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ITEMS_PER_PAGE = 7;

export default function JobFindTableBack() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch("/database/job-database.json")
      .then((res) => res.json())
      .then((result) => {
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

  const listen = () => {
    
  }

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  return (
    <div className="w-full p-10 items-center justify-center">
      {/* Search and Filters */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search by job title or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      <Select onValueChange={(value) => setSelectedType(value === "all" ? null : value)}>
        <SelectTrigger className="w-[12rem]">
          <SelectValue placeholder={selectedType || "Filter by Type"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Full-time">Full-time</SelectItem>
          <SelectItem value="Part-time">Part-time</SelectItem>
          <SelectItem value="Onsite">Onsite</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
        </SelectContent>
      </Select>
      </div>

      {/* Job Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tool</TableHead>
            <TableHead>Info</TableHead>
            <TableHead>More</TableHead>
            <TableHead>Listen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.job.title}</TableCell>
              <TableCell>{job.job.type}</TableCell>
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
              <TableCell>
                <Button onClick={() => handleOpenDialog(job)}>More</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => listen(job)}>Listen</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>



      {/* Modal for Job Details */}
      {selectedJob && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-full w-full h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedJob.job.title}
              </DialogTitle>
              <DialogClose />
            </DialogHeader>

            {/* Job Image */}
            <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden">
              <img
                src={selectedJob.job.image || "/placeholder.png"}
                alt="Job"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Job Description */}
            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold">Description:</p>
              <p>{selectedJob.job.des}</p>
            </div>

            {/* Qualifications */}
            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold">Qualifications:</p>
              <ul className="list-disc list-inside">
                {selectedJob.job.qualifications?.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <div className="mt-6 flex justify-between">
              <Button asChild>
                <a href={selectedJob.job.applyLink} target="_blank">
                  Apply Now
                </a>
              </Button>

              {/* External Links */}
              <div className="flex gap-2">
                <a
                  href={selectedJob.job.resources.tool.link}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {selectedJob.job.resources.tool.title}
                </a>
                <a
                  href={selectedJob.job.resources.information.link}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {selectedJob.job.resources.information.title}
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
