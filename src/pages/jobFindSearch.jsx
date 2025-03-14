"use client";

import { useEffect, useState, useRef } from "react";
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
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const shouldKeepListening = useRef(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/database/job-database.json");
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

  const querySearch = () => {
    if (!query.trim()) return;

    const lowerQuery = query.toLowerCase();

    const filteredJobs = jobDatabase.filter((item) =>
      item.job?.title.toLowerCase().includes(lowerQuery) ||
      item.job?.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      )
    );

    const filteredPortfolio = portfolioDatabase.filter((item) =>
      item.userData?.disability.toLowerCase().includes(lowerQuery) ||
      item.userData?.specifics.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      )
    );

    const filteredLibrary = libraryDatabase.filter((item) =>
      item.library?.title.toLowerCase().includes(lowerQuery) ||
      item.library?.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      )
    );

    const filteredTool = toolDatabase.filter((item) =>
      item.tool?.title.toLowerCase().includes(lowerQuery) ||
      item.tool?.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredResults([
      ...filteredJobs,
      ...filteredPortfolio,
      ...filteredLibrary,
      ...filteredTool,
    ]);
    setOpenDialog(true);
  };

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
      setQuery(transcript);
    };

    recognition.onend = () => {
      if (shouldKeepListening.current) {
        recognition.start(); 
      } else {
        setListening(false);
        recognitionRef.current = null;
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      recognitionRef.current = null;
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
      querySearch();
    }
  };
  return (
    <div className="items-center justify-center w-full max-h-lvh">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-2xl">
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
        <Button onClick={startListening} disabled={listening}>
          🎙️ {listening ? "Listening..." : "Speak"}
        </Button>
        <Button onClick={stopListening} disabled={!listening}>
          ⏹️ Stop
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
                      <strong>
                        {result.job?.title ||
                          result.tool?.title ||
                          result.userData?.disability ||
                          result.library?.title}
                      </strong>
                      <p>
                        {result.job?.des ||
                          result.tool?.des ||
                          result.userData?.specifics?.join(", ") ||
                          result.library?.keywords?.join(", ") ||
                          "No description"}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <DialogContent>
                  <p>No Results Found.</p>
                </DialogContent>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
