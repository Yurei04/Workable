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

export default function ResourceFindSearch() {
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
    const fetchData = async () => {
      try {
        const [JobRes, userRes, libraryRes, toolRes] = await Promise.all([
          fetch("/database/resource.json").then(res => res.json()),
          fetch("/database/job-database.json").then(res => res.json()),
          fetch("/database/library.json").then(res => res.json()),
          fetch("/database/tools.json").then(res => res.json())
        ]);

        setJobDatabase(JobRes || []);
        setPortfolioDatabase(userRes || []);
        setLibraryDatabase(libraryRes || []);
        setToolDatabase(toolRes || []);
      } catch (error) {
        console.error("Failed to load databases:", error);
      }
    };

    fetchData();
  }, []);
  
function querySearch () {
    if (!libraryDatabase.length || !toolDatabase.length || !jobDatabase.length) return;
    const searchQuery = searchTerm.toLowerCase();

    const filteredJobs = jobDatabase.filter((item) => {
      return (
        item.job.title.toLowerCase().includes(searchQuery) ||
        item.job.keywords.some((keyword) => searchQuery.includes(keyword.toLowerCase()))
    );
    });
  
    // Filter tools
    const filteredTool = toolDatabase.filter((item) => {
      return (
        item.tool.title.toLowerCase().includes(searchQuery) ||
        item.tool.keywords.some((keyword) => searchQuery.includes(keyword.toLowerCase()))
      );
    });
  
    // Filter libraries
    const filteredLibrary = libraryDatabase.filter((item) => {
      return (
        item.libraryBook.title.toLowerCase().includes(searchQuery) ||
        item.libraryBook.keywords.some((keyword) => searchQuery.includes(keyword.toLowerCase()))
      );
    });
  
    setDefaultJobs(filteredJobs);
    setDefaultLibrary(filteredLibrary);
    setDefaultTool(filteredTool);
    setOpenDialog(true);
  };

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
        querySearch();
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
    <div className="flex w-full items-center justify-start gap-3 p-4">
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
      <Button onClick={recommend}>Recommend</Button>


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
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
                  <TableHead>Tool Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultJobs.map((jobItem, index) => {
                  const job = jobItem.job;
                  return (
                    <TableRow key={index}>
                      <TableCell>{job.title || "#"}</TableCell>
                      <TableCell>{job.specifics?.type || "#"}</TableCell>
                      <TableCell>
                        <a href={job.specifics?.resources?.tutorials?.links || "#"} target="_blank" className="text-blue-500">
                          Tutorials
                        </a>,{" "}
                        <a href={job.specifics?.resources?.videos?.links || "#"} target="_blank" className="text-blue-500">
                          Videos
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={job.specifics?.Tools?.web?.links || "#"} target="_blank" className="text-blue-500">
                          Web Tools
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
                          Web Tools
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
                  const libraryBook = libraryItem.libraryBook;
                  return (
                    <TableRow key={index}>
                      <TableCell>{libraryBook.title || "#"}</TableCell>
                      <TableCell>{libraryBook.type || "#"}</TableCell>
                      <TableCell>{libraryBook.des || "#"}</TableCell>
                      <TableCell>
                        <a href={libraryBook.link || "#"} target="_blank" className="text-blue-500">
                          Web Information
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
                <h2>No Library Data</h2>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
