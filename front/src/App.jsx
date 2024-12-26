import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import MyAppointments from "./views/MyAppointments";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with conditional rendering */}
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <NavBar />
      )}

      {/* Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
