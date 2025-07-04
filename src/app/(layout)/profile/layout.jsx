import NavBar from "@/components/global/navbar";
import Footer from "@/pages/footer";

export default function ProfileLayout({ children }) {
  return (
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>

  );
}
