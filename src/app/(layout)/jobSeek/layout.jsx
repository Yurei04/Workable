import NavBar from "@/app/navbar";
import Footer from "@/pages/footer";

export default function JobSeekLayout({ children }) {
  return (
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>

  );
}
