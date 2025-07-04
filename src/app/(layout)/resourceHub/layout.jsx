import NavBar from "@/components/global/navbar";
import Footer from "@/pages/footer";

export default function ResourceHubLayout({ children }) {
  return (
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>

  );
}
