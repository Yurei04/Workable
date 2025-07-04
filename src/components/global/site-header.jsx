import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import NavBar from "@/components/global/navbar"
import { Button } from "@/components/ui/button"
import "@/app/globals.css";

export default function SiteHeader() {
  return (
    <header
      className="w-full top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-md rounded-2xl shadow-lg px-4 py-1 border hover:border-purple-500"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xs font-medium text-purple-200">Hack United</h1>
        <NavBar />
        <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
          <a
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            className="text-purple-200 text-xs"
          >
            LinkedIn
          </a>
        </Button>
      </div>
    </header>
  );
}

