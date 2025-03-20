import  LoginPageLayout  from "@/layoutPage/loginLayout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/app-sidebar";
import SiteHeader from "@/components/global/site-header";
import Homepage from "@/pages/homepage";
import Blog from "@/pages/blog";
import SignupPage from "@/pages/signup";
import JobLayoutRoute from "@/layoutPage/jobFindLayout";
import ResourceHubLayout from "@/layoutPage/resourceHubLayout";
import LoginPage from "@/pages/loginPage";

export default function Home() {
  return (
   <div className="p-10 justify-center items-center w-full"> 
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <Homepage />
          <JobLayoutRoute />
          <ResourceHubLayout />
          <Blog />
          <LoginPage />
          <SignupPage />
        </SidebarInset>
      </SidebarProvider>
   </div>
  );
}
