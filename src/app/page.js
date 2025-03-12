import Homepage from "@/pages/homepage";
import Navbar from "@/components/global/navbar";

export default function Home() {
  return (
   <div className="justify-items-center items-center h-lvh w-lvh p-3.5"> 
        <Navbar />
        <Homepage />
   </div>
  );
}
