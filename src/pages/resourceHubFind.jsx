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
import RecommendResource from "@/components/global/recomendResource";

export default function ResourceFindSearch() {
  const [toolDatabase, setToolDatabase] = useState([]);
  const [portfolioDatabase, setPortfolioDatabase] = useState([]);
  const [libraryDatabase, setLibraryDatabase] = useState([]);

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
  }, []);
  
  function querySearch() {
    if (!libraryDatabase.length || !toolDatabase.length) return;
    if (searchTerm === "") {
      alert("Please input keywords")
      return;
    }

    const searchTerms = searchTerm.toLowerCase().split(" ")

    console.log("Tool Database:", toolDatabase);
    console.log("Library Database:", libraryDatabase);
  
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
  
    console.log("Filtered Tools:", filteredTool);
    console.log("Filtered Library:", filteredLibrary);
  
    if (filteredTool.length === 0 && filteredLibrary.length === 0) {
      console.warn("No matching results found");
    }
  
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

    const recommendedTools = toolDatabase.filter((tool) =>
      (experience && tool.tool?.keywords.some((keyword) =>
        experience.includes(keyword.toLowerCase())
      )) ||
      (wants && tool.tool?.keywords.some((keyword) =>
        wants.includes(keyword.toLowerCase())
      ))
    );

    const recommendedLibrary = libraryDatabase.filter((library) =>
      (disability && library.libraryBook?.keywords.some((keyword) =>
        disability.includes(keyword.toLowerCase())
      )) ||
      (circumstances && library.libraryBook?.keywords.some((keyword) =>
        circumstances.includes(keyword.toLowerCase())
      ))
    );
    

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
      <RecommendResource />


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
        </DialogHeader>
        <DialogContent>

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
  );
}
