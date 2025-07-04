import NavBar from "@/components/global/navbar";
import Footer from "@/pages/footer";

export default function SignInLayout({ children }) {
  return (
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>

  );
}
