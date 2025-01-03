import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const AdminLayout = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow overflow-x-hidden"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
