import NavBar from "@/components/global/navbar";
import Footer from "@/pages/footer";

export const metadata = {
  title: "Homepage",
  description: "Welcome to the homepage",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function HomepageLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}