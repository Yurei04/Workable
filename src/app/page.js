import Homepage from "@/pages/homepage";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/navbar";
import JobFind from "@/pages/jobFind"


export default function Home() {
  return (
   <div className="justify-items-center items-center h-lvh w-lvh p-3.5"> 
      <Homepage />
      <JobFind />
   </div>
  );
}
