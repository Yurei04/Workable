"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="icon" className="text-sm border  hover:border-blue-500 hover:bg-blue-900 active:border-blue-200 transition-colors cursor-pointer">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DialogTrigger>
    <DialogTitle></DialogTitle>
    <DialogContent className="w-[90%] max-w-sm p-4 rounded-lg">
      <h2 className="text-lg font-medium">Choose Theme</h2>
      <div className="mt-3 space-y-2">
        <button
          className="w-full text-left px-4 py-2 rounded-md hover:border-blue-500 hover:bg-blue-900 transition-colors active:border-blue-200"
          onClick={() => setTheme("light")}
        >
          ☀️ Light
        </button>
        <button
          className="w-full text-left px-4 py-2 rounded-md hover:border-blue-500 hover:bg-blue-900 transition-colors active:border-blue-200"
          onClick={() => setTheme("dark")}
        >
          🌙 Dark
        </button>
        <button
          className="w-full text-left px-4 py-2 rounded-md hover:border-blue-500 hover:bg-blue-900 transition-colors active:border-blue-200"
          onClick={() => setTheme("system")}
        >
          💻 System
        </button>
      </div>
    </DialogContent>
  </Dialog>
    
  )
}
