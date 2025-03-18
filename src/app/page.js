import JobFindLayout from "@/layoutPage/jobFindLayout";
import ResourceHubLayout from "@/layoutPage/resourceHubLayout";



export default function Home() {
  return (
   <div className="justify-items-center items-center w-full p-3.5"> 
      <JobFindLayout />
      <ResourceHubLayout />
   </div>
  );
}
