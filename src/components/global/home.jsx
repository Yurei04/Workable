import Hero from "@/pages/homePageComponents/hero";
import NavBar from "./navbar";
import Footer from "@/pages/footer";
import About from "@/pages/homePageComponents/about";
import Initiatives from "@/pages/homePageComponents/initiatives";
import AccessibilityFeatures from "@/pages/homePageComponents/goals";


export default function HomeSection() {
  return (
   <div className="justify-center items-center"> 
        <NavBar />
        <Hero />
        <About />
        <Initiatives />
        <AccessibilityFeatures />
        <Footer />
   </div>
  );
}
