import NavBar from "@/components/global/navbar";
import Footer from "@/pages/footer";


export default function HomepageLayout({ children }) {
  return (
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>

  );
}
