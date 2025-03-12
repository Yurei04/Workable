"use client"

import { useEffect, useState } from "react"
import JobFindTable from "@/backend/jobFindBackend/jobFindTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function JobFind () {
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



    return (
        <div className="align-center justify-items-center w-lvh h-lvh">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 items-center justify-center text-2xl">
            Job Seeker with Vox Quae
        </h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
            
            <JobFindTable />
            <Input
                type="text"
                placeholder="Search Jobs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
            <Button type="submit" onClick={queryJob}>
                Search
            </Button>

        </div>
        </div>
    )
}