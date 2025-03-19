import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import NavigationMenuDemo from "./navbar";

export default function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear relative mb-5">
      <div className="absolute left-4 flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Workable</h1>
      </div>
      
      <div className="flex-grow flex justify-center">
        <NavigationMenuDemo />
      </div>
    </header>
  );
}
