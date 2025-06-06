import Hero from "@/pages/homePageComponents/hero";
import NavBar from "./navbar";
import Footer from "@/pages/footer";
import About from "@/pages/homePageComponents/about";
import Goals from "@/pages/homePageComponents/goals";
import Initiatives from "@/pages/homePageComponents/initiatives";


export default function HomeSection() {
  return (
   <div className="justify-center items-center"> 
        <NavBar />
        <Hero />
        <About />
        <Initiatives />
        <Goals />
        <Footer />
   </div>
  );
}
