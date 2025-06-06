"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";

export default function FontToggle() {
    React.useEffect(() => {
        const savedFont = localStorage.getItem("selectedFont");
        if (savedFont) {
          document.documentElement.style.setProperty("--font-sans", savedFont);
        }
      }, []);
    
      const setFont = (font) => {
        document.documentElement.style.setProperty("--font-sans", font);
        localStorage.setItem("selectedFont", font);
      };
    return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-sm border hover:border-blue-500 hover:bg-blue-900 active:border-blue-200 transition-colors cursor-pointer">
            <h2>A</h2>
            <span className="sr-only">Toggle Font</span>
        </Button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="w-[90%] max-w-sm p-4 rounded-lg">
        <h2 className="text-lg font-medium">Choose Theme</h2>
        <div className="mt-3 space-y-2">
            <button
            className="w-full text-left px-4 py-2 rounded-md hover:border-blue-500 hover:bg-blue-900 transition-colors active:border-blue-200"
            onClick={() => setFont("system-ui")}
            >
            Default
            </button>
            <button
            className="w-full text-left px-4 py-2 rounded-md hover:border-blue-500 hover:bg-blue-900 transition-colors active:border-blue-200"
            onClick={() => setFont("OpenDyslexic")}
            >
            OpenDyslexic
            </button>
            <button
            className="w-full text-left px-4 py-2 rounded-md hover:border-blue-500 hover:bg-blue-900 transition-colors active:border-blue-200"
            onClick={() => setFont("Lexend")}
            >
            High Readability (Lexend)
            </button>
        </div>
        </DialogContent>
    </Dialog>
      );
    }