"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import Recommend from "@/components/global/recommend";
import FilterSystem from "@/components/global/filterSystem";

export default function JobFindSearch() {
  const [toolDatabase, setToolDatabase] = useState([]);
  const [jobDatabase, setJobDatabase] = useState([]);
  const [portfolioDatabase, setPortfolioDatabase] = useState([]);
  const [libraryDatabase, setLibraryDatabase] = useState([]);

  const [defaultJobs, setDefaultJobs] = useState([]);
  const [defaultLibrary, setDefaultLibrary] = useState([]);
  const [defaultTool, setDefaultTool] = useState([]);
  const [defaultProfile, setDefaultProfile] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const shouldKeepListening = useRef(false);

  useEffect(() => {
    fetch("/database/info-database.json")
      .then((res) => res.json())
      .then((result) => setLibraryDatabase(result))
      .catch((error) => console.error("Failed to load library database:", error));

    fetch("/database/tool-database.json")
      .then((res) => res.json())
      .then((result) => setToolDatabase(result))
      .catch((error) => console.error("Failed to load tool database:", error));

    fetch("/database/job-database.json")
    .then((res) => res.json())
    .then((result) => setJobDatabase(result))
    .catch((error) => console.error("Failed to load tool database:", error));
  }, []);
  
  function querySearch () {
    if (!libraryDatabase.length || !toolDatabase.length || !jobDatabase.length) return;
    if (searchTerm === "") {
      alert("Please input keywords");
      return;
    }
  
    const searchTerms = searchTerm.toLowerCase().split(" ");
  
    // Filter tools
    const filteredTool = toolDatabase.filter((item) => {
      const tool = item.tool;
      if (!tool || !tool.keywords) return false;

      const titleMatch = searchTerms.some(term => tool.title?.toLowerCase().includes(term));
      const keywordMatch = searchTerms.some(term =>
        tool.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(term)
        )
      );
      return titleMatch || keywordMatch;
    });
  
    // Filter library
    const filteredLibrary = libraryDatabase.filter((item) => {
      const information = item.information;
      if (!information || !information.keywords) return false;
  
      const titleMatch = searchTerms.some(term => information.title?.toLowerCase().includes(term));
      const keywordMatch = searchTerms.some(term =>
        information.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(term)
        )
      );
      return titleMatch || keywordMatch;
    });
  
    // Filter jobs
    const filteredJobs = jobDatabase.filter((item) => {
      const job = item.job;
      if (!job || !job.keywords) return false;
  
      const titleMatch = searchTerms.some(term => job.title?.toLowerCase().includes(term));
      const keywordMatch = searchTerms.some(term =>
        job.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(term)
        )
      );
      return titleMatch || keywordMatch;
    });
  
    if (filteredTool.length === 0 && filteredLibrary.length === 0 && filteredJobs.length === 0) {
      console.warn("No matching results found");
    }
  
    setDefaultJobs(filteredJobs);
    setDefaultLibrary(filteredLibrary);
    setDefaultTool(filteredTool);
    setOpenDialog(true);
  }
  

  function recommend () {
    if (portfolioDatabase.length === 0) {
      alert("No user profile found for recommendations.");
      return;
    }

    const userProfile = portfolioDatabase[0]?.userData;

    if (!userProfile) {
      alert("Incomplete profile data.");
      return;
    }

    const { experience, disability, wants, circumstances } = userProfile;

    const recommendedJobs = jobDatabase.filter((job) =>
      (experience && job.job?.keywords.some((keyword) =>
        experience.includes(keyword.toLowerCase())
      )) ||
      (wants && job.job?.keywords.some((keyword) =>
        wants.includes(keyword.toLowerCase())
      )) ||
      (circumstances && job.job?.keywords.some((keyword) =>
        circumstances.includes(keyword.toLowerCase())
      ))
    );

    const recommendedTools = toolDatabase.filter((tool) =>
      (experience && tool.tool?.keywords.some((keyword) =>
        experience.includes(keyword.toLowerCase())
      )) ||
      (wants && tool.tool?.keywords.some((keyword) =>
        wants.includes(keyword.toLowerCase())
      ))
    );

    const recommendedLibrary = libraryDatabase.filter((library) =>
      (disability && library.library?.keywords.some((keyword) =>
        disability.includes(keyword.toLowerCase())
      )) ||
      (circumstances && library.library?.keywords.some((keyword) =>
        circumstances.includes(keyword.toLowerCase())
      ))
    );

    setDefaultJobs(recommendedJobs);
    setDefaultLibrary(recommendedLibrary);
    setDefaultTool(recommendedTools);

    setOpenDialog(true);
  }
  

  const startListening = () => {
    if (recognitionRef.current) return;
  
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
  
    shouldKeepListening.current = true;
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onstart = () => setListening(true);
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };
  
    recognition.onend = () => {
      if (shouldKeepListening.current) {
        recognition.start();
      } else {
        setListening(false);
      }
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };
  
    recognition.start();
    recognitionRef.current = recognition;
  };
  
  const stopListening = () => {
    shouldKeepListening.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
    }
  };
  

  return (
    <div className="flex flex-col w-full mt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            Job Seek
          </span>
        </h1>
        <p className="text-blue-200 max-w-2xl mx-auto text-lg">
          Incididunt id anim occaecat nostrud non amet ullamco laborum incididunt nostrud fugiat.
        </p>
      </div>
      <div className="flex w-full items-center justify-start gap-3 p-4 bg-black/30">
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-12 px-4 w-full text-sm"
      />
      <Button onClick={querySearch}>Search</Button>
      <Button onClick={startListening} disabled={listening}>
        🎙️ {listening ? "Listening..." : "Speak"}
      </Button>
      <Button onClick={stopListening} disabled={!listening}>
        ⏹️ Stop
      </Button>
      <Recommend />
      <FilterSystem />


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent>
          {/* Jobs Section */}
          {defaultJobs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Tools</TableHead>
                  <TableHead>Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultJobs.map((jobItem, index) => {
                  const job = jobItem.job;
                  return (
                    <TableRow key={index}>
                      <TableCell>{job.title || "#"}</TableCell>
                      <TableCell>{job.type || "#"}</TableCell>
                      <TableCell>
                        <a href={job.resources?.tool?.link || "#"} target="_blank" className="text-blue-500">
                          Recommend Tool
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={job.resources?.information?.link || "#"} target="_blank" className="text-blue-500">
                          Recommended Info
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Card>
              <CardContent>
                <h2>No Job Data</h2>
              </CardContent>
            </Card>
          )}

          {/* Tools Section */}
          {defaultTool.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultTool.map((toolItem, index) => {
                  const tool = toolItem.tool;
                  return (
                    <TableRow key={index}>
                      <TableCell>{tool.title || "#"}</TableCell>
                      <TableCell>{tool.type || "#"}</TableCell>
                      <TableCell>{tool.des || "#"}</TableCell>
                      <TableCell>
                        <a href={tool.link || "#"} target="_blank" className="text-blue-500">
                          Link
                        </a>
                      </TableCell>
                      <TableCell> {tool.severityMatch} </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Card>
              <CardContent>
                <h2>No Tool Data</h2>
              </CardContent>
            </Card>
          )}

          {/* Library Section */}
          {defaultLibrary.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Information Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultLibrary.map((libraryItem, index) => {
                  const information = libraryItem.information;
                  return (
                    <TableRow key={index}>
                      <TableCell>{information.title || "#"}</TableCell>
                      <TableCell>{information.type || "#"}</TableCell>
                      <TableCell>{information.des || "#"}</TableCell>
                      <TableCell>
                        <a href={information.link || "#"} target="_blank" className="text-blue-500">
                          Link
                        </a>
                      </TableCell>
                      <TableCell> {information.severityMatch} </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Card>
              <CardContent>
                <h2>No Library Data</h2>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

    </div>
    </div>
    
  );
}
