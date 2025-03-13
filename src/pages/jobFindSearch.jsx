"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function JobFindSearch() {
  const [toolDatabase, setToolDatabase] = useState([]);
  const [jobDatabase, setJobDatabase] = useState([]);
  const [portfolioDatabase, setPortfolioDatabase] = useState([]);
  const [libraryDatabase, setLibraryDatabase] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // Connect to MongoDB and fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();

        setPortfolioDatabase(data.portfolio || []);
        setJobDatabase(data.jobs || []);
        setToolDatabase(data.tools || []);
        setLibraryDatabase(data.library || []);
      } catch (error) {
        console.error("Failed to load databases:", error);
      }
    };

    fetchData();
  }, []);

  const querySearch = async () => {
    if (!query.trim()) return;

    const lowerQuery = query.toLowerCase();

    const filteredJobs = jobDatabase.filter((item) => {
      const job = item.job;
      return (
        job.title.toLowerCase().includes(lowerQuery) ||
        job.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery)
        )
      );
    });

    const filteredPortfolio = portfolioDatabase.filter((item) => {
      const userData = item.userData;
      return (
        userData.disability.toLowerCase().includes(lowerQuery) ||
        userData.specifics.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery)
        )
      );
    });

    const filteredLibrary = libraryDatabase.filter((item) => {
      const library = item.library;
      return (
        library.title.toLowerCase().includes(lowerQuery) ||
        library.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery)
        )
      );
    });

    const filteredTool = toolDatabase.filter((item) => {
      const tool = item.tool;
      return (
        tool.title.toLowerCase().includes(lowerQuery) ||
        tool.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery)
        )
      );
    });

    setFilteredResults([
      ...filteredJobs,
      ...filteredPortfolio,
      ...filteredLibrary,
      ...filteredTool,
    ]);
    setOpenDialog(true);
  };

  return (
    <div className="items-center w-full max-h-lvh">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-2xl">
        Job Find
      </h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search Jobs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" onClick={querySearch}>
          Search
        </Button>
      </div>

      {/* Search Results Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Results</DialogTitle>
            <DialogDescription>
              {filteredResults.length > 0 ? (
                <ul>
                  {filteredResults.map((result, index) => (
                    <li key={index} className="p-2 border-b">
                      <strong>{result.job?.title || result.tool?.title}</strong>
                      <p>
                        {result.job?.des || result.tool?.des || "No description"}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No results found.</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
