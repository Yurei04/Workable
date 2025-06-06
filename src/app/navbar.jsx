"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { title: "Home", href: "/homepage" },
  { title: "Resource Hub", href: "/resourceHub" },
  { title: "Job Seek", href: "/jobSeek" },
  { title: "Profile", href: "/profile" },
  { title: "Blog", href: "/blog" },
]

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed z-50 w-full flex justify-center mt-4 px-6">
      <nav className="w-full max-w-6xl bg-white/5 shadow-xl backdrop-blur-lg border border-white/10 text-blue-200 rounded-2xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-blue-300">
            Workable
          </div>

          <div className="hidden md:flex gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.title}
                variant="ghost"
                size="sm"
                className="text-xs border hover:border-blue-500 hover:bg-blue-900 transition-colors active:border-blue-200"
                asChild
              >
                <Link href={link.href}>{link.title}</Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-sm border border-blue-500 hover:border-blue-300 transition-colors cursor-pointer"
            >
              <Link href="/">Search Now</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-300 hover:bg-blue-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col items-start gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.title}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm border hover:border-blue-500 hover:bg-blue-900 transition-colors"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={link.href}>{link.title}</Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm border hover:border-blue-100 hover:bg-blue-900 transition-colors cursor-pointer"
            >
              <Link href="/">Search Now</Link>
            </Button>
          </div>
        )}
      </nav>
    </div>
  )
}
