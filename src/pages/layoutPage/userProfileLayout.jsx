import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import UserProfile from "../user";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/app-sidebar";
import SiteHeader from "@/components/global/site-header";
import "@/app/globals.css";


export default function UserProfileLayout () {
    return (
        <div className="w-full items-center justify-items-center">
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem>
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
            <SiteHeader />
                <UserProfile />

            </SidebarInset>
            </SidebarProvider>
            </ThemeProvider>
        </div>
    )
}