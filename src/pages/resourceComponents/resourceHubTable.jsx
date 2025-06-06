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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
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
  DialogClose,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 7;

export default function ResourceHubTable() {
  const [libraryData, setLibraryData] = useState([]);
  const [toolData, setToolData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("library");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  // Load library and tool data
  useEffect(() => {
    fetch("/database/info-database.json")
      .then((res) => res.json())
      .then((result) => setLibraryData(result))
      .catch((error) => console.error("Failed to load library database:", error));

    fetch("/database/tool-database.json")
      .then((res) => res.json())
      .then((result) => setToolData(result))
      .catch((error) => console.error("Failed to load tool database:", error));
  }, []);

  // Filter data based on active tab, search term, and type
  useEffect(() => {
    setSearchTerm("");
    let data = activeTab === "library" ? libraryData : toolData;

    let filtered = data.filter((item) => {
      const resource = activeTab === "library" ? item.information : item.tool;
      return (
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    if (selectedType && selectedType !== "all")  {
      filtered = filtered.filter((item) => {
        const resource = activeTab === "library" ? item.information : item.tool;
        return resource.type === selectedType;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, activeTab, libraryData, toolData]);

  // Pagination setup
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleOpenDialog = (resource) => {
    setSelectedResource(resource);
    setOpenDialog(true);
  };

  return (
    <div className="w-full p-10 items-center justify-center">
      {/* Tabs for Library and Tools */}
      <Tabs defaultValue="library" className="mb-4">
        <TabsList>
          <TabsTrigger value="library" onClick={() => setActiveTab("library")}>
            Library
          </TabsTrigger>
          <TabsTrigger value="tools" onClick={() => setActiveTab("tools")}>
            Tools
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search and Filters */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder={`Search in ${activeTab === "library" ? "Library" : "Tools"}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      <Select onValueChange={(value) => setSelectedType(value)} value={selectedType || ""}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>

          <SelectContent>
            {activeTab === "library" ? (
              <>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="App">App</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Extension">Extension</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Severity Match</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {paginatedData.map((item, index) => {
          const resource =
            activeTab === "library" ? item?.information : item?.tool;

          // Prevent rendering if resource is undefined
          if (!resource) return null;

          return (
            <TableRow key={index}>
              <TableCell>{resource.title || "N/A"}</TableCell>
              <TableCell>{resource.type || "N/A"}</TableCell>
              <TableCell>
                {resource.link ? (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Open Link
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{resource.severityMatch || "N/A"}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>

      </Table>

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
