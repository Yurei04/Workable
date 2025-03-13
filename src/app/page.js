import JobFindLayout from "@/components/route/jobFindLayout";
import JobLayoutRoute from "@/layoutPage/jobFindRoute";
import Homepage from "@/pages/homepage";


export default function Home() {
  return (
   <div className="justify-items-center items-center w-full p-3.5"> 
      <Homepage />
      <JobLayoutRoute />
   </div>
  );
}
