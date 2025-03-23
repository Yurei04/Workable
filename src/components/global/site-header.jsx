import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ModeToggle from "@/components/global/styleModes";
import NavigationMenuDemo from "./navbar";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between h-12 border-b px-4 md:px-6 relative mb-5">

      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-base font-medium whitespace-nowrap">Workable</h1>
      </div>

      <div className="flex-grow flex justify-center min-w-0">
        <NavigationMenuDemo />
      </div>

      <div className="flex items-center">
        <ModeToggle />
      </div>
      
    </header>
  );
}
