import JobFindLayout from "@/layoutPage/jobFindLayout";
import ResourceHubLayout from "@/layoutPage/resourceHubLayout";
import NavigationMenuDemo from "@/components/global/navbar";


export default function Home() {
  return (
   <div className="justify-items-center items-center w-full p-3.5"> 
      <NavigationMenuDemo />
      <JobFindLayout />
      <ResourceHubLayout />
   </div>
  );
}
