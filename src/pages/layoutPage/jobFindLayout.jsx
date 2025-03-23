import JobFindSearch from "@/pages/jobFindSearch";
import JobFindTableBack from "@/pages/jobFindTable";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/app-sidebar";
import SiteHeader from "@/components/global/site-header";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function JobLayoutRoute () {
    return (
        <div className="flex flex-col items-center py-5 px-4 md:px-8 lg:px-16">
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem>
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />

                <JobFindSearch />
                <JobFindTableBack />
                
            </SidebarInset>
            </SidebarProvider>
            </ThemeProvider>
        </div>
    )
}