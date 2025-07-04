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
import { Separator } from "@/components/ui/separator";
import FilterSystem from "@/components/global/filterSystem";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuoteCarousel from "@/components/global/quotes";

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
    <div className="w-full p-10 items-center justify-center bg-black/40">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            Job Seek
          </span>
        </h1>
          <QuoteCarousel />
      </div>
      <FilterSystem />
        <br></br>
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
          </SelectContent>
        </Select>
              <Select onValueChange={(value) => setSelectedType(value === "all" ? null : value)}>
          <SelectTrigger className="w-[12rem]">
            <SelectValue placeholder={selectedType || "Filter by Type"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Onsite">Onsite</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-min-screen grid lg:grid-cols-2 sm-grid-cols-2 gap-6"> 
          <ScrollArea className="h-screen w-full flex flex-col items-center justify-start  p-4">
            {paginatedData.map((data, index) => (
                <div key={index} className="w-full max-h-1/4 flex lg:flex-row sm:flex-col justify-between gap-4 border bg-blue-700/30 rounded-2xl p-6 mb-4">
                    <div className="lg:w-full sm:w-full gap-2  flex flex-col bg-blue-500/20 border border-blue-500 rounded-xl p-2">
                      <div className="flex flex-row gap-2">
                        <div className="flex items-center lg:w-1/3 sm:w-1/2 justify-center h-auto border border-blue-500 rounded-lg">
                            <img src="/images/image2.jpg" alt={data.job.title} className="rounded-lg"/>
                        </div>
                        <div className="bg-blue-500/20 rounded-lg p-2">
                            <h1 className="text-lg"><b>{data.job.title}</b></h1>
                            <h2><b>Company:</b> Xyz</h2>
                            <h2><b>Type:</b> <span className="text-sm">{data.job.type}</span></h2>
                            <h2><b>Description:</b> <span className="text-sm">{data.job.des}</span></h2>
                        </div>
                      </div>
                        <div className="bg-blue-500/20 rounded-lg p-2">
                            <h2><b>CapabilityRequired:</b> <span className="text-sm">{data.job.requirements.capabilityRequired}</span></h2>
                        </div>
                        <div className="bg-blue-500/20 rounded-lg p-2">
                            <h2><b>Resources:</b> <span className="text-sm">{data.job.resources.information.title}</span></h2>
                            <h2><b>Tool:</b> <span className="text-sm">{data.job.resources.tool.title}</span></h2>
                        </div>
                        <div className="flex flex-col items-center justify-start gap-4 border bg-blue-800/50 rounded-xl p-2">
                          <Button className="w-full cursor-pointer" onClick={() => setSelectedJob(data)}>More</Button>
                          <Button className="w-full cursor-pointer" onClick={() => listen(data)}>Listen</Button>
                        </div>
                    </div>

                </div>
            ))};
            <Separator className="bg-blue-200"  />
        </ScrollArea>
        
        <div className="w-full h-auto flex flex-col gap-4 items-center justify-start p-4 bg-blue-600/20">
          {selectedJob && selectedJob.job ? (
            <div>
              <div className="my-4 space-y-2 text-2xl font-bold ">
                {selectedJob.job.title}
                <h2 className="text-sm">Company Xyz</h2>
              </div>

              <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={selectedJob.job.image || "/placeholder.png"}
                  alt="Job"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold break-words">Description:</p>
                <p className="break-words whitespace-normal">
                  {selectedJob.job.des || "No description provided."}
                </p>
              </div>

              {selectedJob.job.qualifications?.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-lg font-semibold break-words">Qualifications:</p>
                  <ul className="list-disc list-inside space-y-1 break-words">
                    {selectedJob.job.qualifications.map((q, index) => (
                      <li key={index} className="break-words">{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold break-words">Capability Requirements:</p>
                {Array.isArray(selectedJob.job.requirements?.capabilityRequired) ? (
                  <ul className="list-disc list-inside space-y-1 break-words">
                    {selectedJob.job.requirements.capabilityRequired.map((q, index) => (
                      <li key={index} className="break-words">{q}</li>
                    ))}
                  </ul>
                ) : selectedJob.job.requirements?.capabilityRequired ? (
                  <p className="text-sm">{selectedJob.job.requirements.capabilityRequired}</p>
                ) : (
                  <p className="italic text-gray-500">Not specified.</p>
                )}
              </div>

              <div className="mt-6 flex justify-between flex-wrap gap-4">
                <Button asChild>
                  <a
                    href={selectedJob.job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words cursor-pointer"
                  >
                    Apply Now
                  </a>
                </Button>

                <div className="flex gap-4 flex-wrap text-sm">
                  {selectedJob.job.resources?.tool?.link && (
                    <a
                      href={selectedJob.job.resources.tool.link}
                      target="_blank"
                      className="text-blue-100 hover:underline break-words underline border border-blue-200 p-2 rounded-lg bg-blue-400/20"
                    >
                      {selectedJob.job.resources.tool.title}
                    </a>
                  )}
                  {selectedJob.job.resources?.information?.link && (
                    <a
                      href={selectedJob.job.resources.information.link}
                      target="_blank"
                      className="text-blue-100 hover:underline break-words underline border border-blue-200 p-2 rounded-lg  bg-blue-400/20"
                    >
                      {selectedJob.job.resources.information.title}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 italic">Select a job to see details here.</div>
          )}
        </div>

      {totalPages > 1 && (
        <Pagination className="mt-2 cursor-pointer">
          <PaginationContent>
            <PaginationPrevious
              variant="outline"
              className="hover:bg-blue-900 rounded-2xl"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page} className="hover:bg-blue-500 rounded-2xl" variant="outline">
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              variant="outline"
              className="hover:bg-blue-500 rounded-2xl"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>

    </div>
  );
}

