import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import NavBarBanner from "../components/NavBar/NavBarBanner";

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <NavBarBanner />
      <main className="flex-grow overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
