import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarBanner from "./components/NavBarBanner";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AppointmentSchedule from "./components/AppointmentSchedule";
import NotFound from "./views/NotFound";
import Profile from "./views/Profile";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with conditional rendering */}
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <NavBar />
      )}

      {/* Navbar Banner with conditional rendering */}
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <NavBarBanner />
      )}

      {/* Content */}
      <main className="flex-grow overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/schedule" element={<AppointmentSchedule />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer with conditional rendering */}
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Footer />
      )}
    </div>
  );
}

export default App;
