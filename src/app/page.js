import JobFindLayout from "@/layoutPage/jobFindLayout";
import ResourceHubLayout from "@/layoutPage/resourceHubLayout";
import NavigationMenuDemo from "@/components/global/navbar";
import Homepage from "@/pages/homepage";
import  LoginPageLayout  from "@/layoutPage/loginLayout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/app-sidebar";
import SiteHeader from "@/components/global/site-header";


export default function Home() {
  return (
   <div className="p-10 justify-center items-center w-full"> 
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <LoginPageLayout />
        </SidebarInset>
      </SidebarProvider>
   </div>
  );
}
